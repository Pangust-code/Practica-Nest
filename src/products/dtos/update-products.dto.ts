import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class UpdateProductsDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
