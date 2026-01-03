import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsEntity } from '../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsResponseDto } from '../dtos/products-response.dto';
import { UpdateProductsDto } from '../dtos/update-products.dto';
import { CreateProductsDto } from '../dtos/create-products.dto';
import { Products } from '../models/products.model';
import { PartialUpdateProductsDto } from '../dtos/partial-update-products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>,
    ) {}
    /**
   * Obtener todos los productos (enfoque funcional)
   */
  async findAll(): Promise<ProductsResponseDto[]> {
    // 1. Repository → Entities
    const entities = await this.productsRepository.find();

    // 2. Entities → Domain Models → DTOs (programación funcional)
    return entities
      .map(Products.fromEntity)           // Entity → Products
      .map(products => products.toResponseDto()); // Products → DTO
  }

  /**
   * Obtener un producto por ID (enfoque funcional con manejo de errores)
   */
  async findOne(id: number): Promise<ProductsResponseDto> {
    const entity = await this.productsRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return Products.fromEntity(entity).toResponseDto();
  }

  /**
   * Crear producto (flujo funcional)
   */
  async create(dto: CreateProductsDto): Promise<ProductsResponseDto> {

  if (await this.productsRepository.exist({ where: { name: dto.name } })) {
  throw new BadRequestException("El nombre ya está registrado");
  }
    // Flujo funcional: DTO → Model → Entity → Save → Model → DTO
    const products = Products.fromDto(dto);           // DTO → Domain
    const entity = products.toEntity();            // Domain → Entity
    const saved = await this.productsRepository.save(entity); // Persistir

    return Products.fromEntity(saved).toResponseDto(); // Entity → Domain → DTO
  }

  /**
   * Actualizar producto completo (PUT)
   */
  async update(id: number, dto: UpdateProductsDto): Promise<ProductsResponseDto> {
    const entity = await this.productsRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Flujo funcional con transformaciones
    const updated = Products.fromEntity(entity)  // Entity → Domain
      .update(dto)                           // Aplicar cambios
      .toEntity();                           // Domain → Entity

    const saved = await this.productsRepository.save(updated);
    
    return Products.fromEntity(saved).toResponseDto();
  }

  /**
   * Actualizar parcialmente (PATCH)
   */
  async partialUpdate(id: number, dto: PartialUpdateProductsDto): Promise<ProductsResponseDto> {
    const entity = await this.productsRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updated = Products.fromEntity(entity)
      .partialUpdate(dto)
      .toEntity();

    const saved = await this.productsRepository.save(updated);
    
    return Products.fromEntity(saved).toResponseDto();
  }

  /**
   * Eliminar producto
   */
  async delete(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

}
