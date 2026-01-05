import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateProductsDto } from '../dtos/create-products.dto';
import { PartialUpdateProductsDto } from '../dtos/partial-update-products.dto';
import { ProductsService } from '../services/products.service';
import { ProductsResponseDto } from '../dtos/products-response.dto';
import { UpdateProductsDto } from '../dtos/update-products.dto';

@Controller('productos')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async findAll(): Promise<ProductsResponseDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductsResponseDto> {
    return this.productsService.findOne(id);
    // ← Si no existe, el servicio lanza NotFoundException
    // ← El filter se encarga del resto
  }

  @Post()
  async create(@Body() createUserDto: CreateProductsDto): Promise<ProductsResponseDto> {
    const created = await this.productsService.create(createUserDto);
    return created;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductsDto,
  ) {
    return this.productsService.update(Number(id), dto);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() dto: PartialUpdateProductsDto,
  ) {
    return this.productsService.partialUpdate(Number(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
