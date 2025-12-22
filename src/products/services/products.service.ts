import { Injectable } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { ProductsMapper } from '../mappers/products.mappers';
import { CreateProductsDto } from '../dtos/create-products.dto';
import { UpdateProductsDto } from '../dtos/update-products.dto';
import { PartialUpdateProductsDto } from '../dtos/partial-update-products.dto';

@Injectable()
export class ProductsService {
    private Products: Products[] = [];
    private currentId = 1;

    findAll() {
        return this.Products.map(u => ProductsMapper.toResponseDto(u));
    }

    findOne(id: number) {
        const products = this.Products.find(u => u.id === id);
        if (!products) return { error: 'User not found' };
        return ProductsMapper.toResponseDto(products);
    }

    create(dto: CreateProductsDto) {
        const entity = ProductsMapper.toEntity(this.currentId++, dto);
        this.Products.push(entity);
        return ProductsMapper.toResponseDto(entity);
    }

    update(id: number, dto: UpdateProductsDto) {
        const products = this.Products.find(u => u.id === id);
        if (!products) return { error: 'User not found' };

        if (dto.name !== undefined) products.name = dto.name;
        if (dto.precio !== undefined) products.precio = dto.precio;
        if (dto.stock !== undefined) products.stock = dto.stock;
        return ProductsMapper.toResponseDto(products);
    }

    partialUpdate(id: number, dto: PartialUpdateProductsDto) {
        const products = this.Products.find(u => u.id === id);
        if (!products) return { error: 'User not found' };

        if (dto.name !== undefined) products.name = dto.name;
        if (dto.precio !== undefined) products.precio = dto.precio;
        if (dto.stock !== undefined) products.stock = dto.stock;
        return ProductsMapper.toResponseDto(products);
    }

    delete(id: number) {
        const exists = this.Products.some(u => u.id === id);
        if (!exists) return { error: 'User not found' };

        this.Products = this.Products.filter(u => u.id !== id);
        return { message: 'Deleted successfully' };
    }
}
