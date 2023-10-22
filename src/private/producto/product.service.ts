import { ProductDto } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'common/generique/message.dto';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: ProductRepository
    ) { }

    async getAll(): Promise<ProductEntity[]> {
        const list = await this.productRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductEntity> {
        const producto = await this.productRepository.findOne(id);
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductEntity> {
        const producto = await this.productRepository.findOne({ nombre: nombre });
        return producto;
    }

    async create(dto: ProductDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const producto = this.productRepository.create(dto);
        await this.productRepository.save(producto);
        return new MessageDto(`producto ${producto.nombre} creado`);
    }

    async update(id: number, dto: ProductDto): Promise<any> {
        const producto = await this.findById(+id);
        if (!producto)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese producto ya existe'));
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productRepository.save(producto);
        return new MessageDto(`producto ${producto.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productRepository.delete(producto);
        return new MessageDto(`producto ${producto.nombre} eliminado`);
    }
}
