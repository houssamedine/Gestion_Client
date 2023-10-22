import { ProductoService } from './product.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from './../../common/guards/jwt.guards';

import { RolesDecorator } from './../../common/decorators/role.decorator';
import { RoleNombre } from '../role/entities/role.enum';
import { RolesGuard } from './../../common/guards/role.guard';
import { GetPrincipal } from 'common/decorators/get-principal';
import { MessageDto } from 'common/generique/message.dto';

@Controller('product')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) {}

    @RolesDecorator(RoleNombre.ADMIN,RoleNombre.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    async getAll(@GetPrincipal() user:any) {
        if(user.roles.indexOf('admin')<0) throw new UnauthorizedException( new MessageDto("tu n'es pas administrateur"))
        
        return await this.productoService.getAll();
    }

    @RolesDecorator(RoleNombre.ADMIN,RoleNombre.USER)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.productoService.findById(id);
    }

    @RolesDecorator(RoleNombre.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ProductDto) {
        return await this.productoService.create(dto);
    }
    
    @RolesDecorator(RoleNombre.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto) {
        return await this.productoService.update(id, dto);
    }

    @RolesDecorator(RoleNombre.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.delete(id)
    }
}
