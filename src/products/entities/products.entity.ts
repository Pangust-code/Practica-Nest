import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity('products')
export class ProductsEntity extends BaseEntity {

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  precio: number;

  @Column({ type: 'numeric', precision: 10, scale: 0, nullable: false })
  stock: number;

}




