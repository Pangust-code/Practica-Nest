import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductsDto } from '../dtos/create-products.dto';
import { PartialUpdateProductsDto } from '../dtos/partial-update-products.dto';
import { ProductsService } from '../services/products.service';

@Controller('productos')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}


  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateProductsDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: PartialUpdateProductsDto) {
    return this.productsService.partialUpdate(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
