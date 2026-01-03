import { CreateProductsDto } from "../dtos/create-products.dto";
import { ProductsEntity } from "../entities/products.entity";
import { ProductsResponseDto } from "../dtos/products-response.dto";
import { UpdateProductsDto } from "../dtos/update-products.dto";
import { PartialUpdateProductsDto } from "../dtos/partial-update-products.dto";

export class Products {
    constructor(
        public id: number,
        public name: string,
        public precio: number | null,
        public stock: number,
        public createdAt: Date,
    ) {
      if (!name || name.trim().length < 3) {
        throw new Error("Nombre inválido");
      }
      if (precio !== null && precio < 0) {
        throw new Error("Precio inválido");
      }
      if (stock < 0) {
        throw new Error("Stock inválido");
      }
    }

    // ==================== FACTORY METHODS ====================

  /**
   * Crea un Product desde un DTO de creación
   */
  static fromDto(dto: CreateProductsDto): Products {
    return new Products(
      0, // El ID se asigna en BD
      dto.name,
      dto.precio,
      dto.stock,
      new Date(),
    );
  }

  /**
   * Crea un Product desde una entidad persistente
   */
  static fromEntity(entity: ProductsEntity): Products {
    return new Products(
        entity.id,
        entity.name,
        entity.precio,
        entity.stock,
        entity.createdAt,
    );
  }

  // ==================== CONVERSION METHODS ====================

  /**
   * Convierte este Product a una entidad persistente
   */
  toEntity(): ProductsEntity {
    const entity = new ProductsEntity();
    if (this.id > 0) {
      entity.id = this.id;
    }
    entity.name = this.name;
    entity.precio = this.precio || 0;
    entity.stock = this.stock;
    return entity;
  }

  /**
   * Convierte este Product a un DTO de respuesta
   */
  toResponseDto(): ProductsResponseDto {
    return {
      id: this.id,
      name: this.name,
      precio: this.precio || 0,
      stock: this.stock,
      createdAt: this.createdAt.toISOString(),
    };
    // NO incluye password
  }

  /**
   * Aplica actualización completa
   */
  update(dto: UpdateProductsDto): Products {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.precio !== undefined) {
      this.precio = dto.precio;
    }
    if (dto.stock !== undefined) {
      this.stock = dto.stock;
    }
    return this;
  }

  /**
   * Aplica actualización parcial
   */
  partialUpdate(dto: PartialUpdateProductsDto): Products {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }
    if (dto.precio !== undefined) {
      this.precio = dto.precio;
    }
    if (dto.stock !== undefined) {
      this.stock = dto.stock;
    }
    return this;
  }

}