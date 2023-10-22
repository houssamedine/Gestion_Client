import { ProductEntity } from './product.entity';
import { Module } from '@nestjs/common';
import { ProductoService } from './product.service';
import { ProductoController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductoService],
    controllers: [ProductoController]
})
export class ProductoModule { }
