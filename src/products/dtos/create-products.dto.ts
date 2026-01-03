import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductsDto {

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @Min(0, { message: 'El precio debe ser un valor positivo' })
  precio: number;

  @IsNotEmpty({ message: 'La cantidad es obligatorio' })
  @IsNumber({}, { message: 'La cantidad debe ser un número válido' })
  @Min(0, { message: 'La cantidad debe ser un valor positivo' })
  stock: number;

}

