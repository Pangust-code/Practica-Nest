import { IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";

export class PartialUpdateProductsDto {
  
  @IsOptional()
  @MinLength(3)
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
