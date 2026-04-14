import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  

  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    return this.productsService.create(createProductDto);

  }

  @Get()
  findAll() {

    return this.productsService.findAll();

  }

  // MUST BE ABOVE :id! Uses @Query to grab ?keyword=phone
  @Get('search')
    
  search(@Query('keyword') keyword: string) {

    return this.productsService.search(keyword);


  }


  // MUST BE ABOVE :id

  @Get('category/:cat')
    
  findByCategory(@Param('cat') category: string) {


    return this.productsService.findByCategory(category);

  }


  // ParseIntPipe converts URL string "5" into the number 5
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {

    return this.productsService.findOne(id);

  }



  @Patch(':id')
  update(

    @Param('id', ParseIntPipe) id: number,

    @Body() updateProductDto: PartialUpdateProductDto,

  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put(':id')
    
  replace(
    @Param('id', ParseIntPipe) id: number,

    @Body() updateProductDto: UpdateProductDto,

  ) {

    return this.productsService.replace(id, updateProductDto);
  }


  @Delete(':id')
    
  remove(@Param('id', ParseIntPipe) id: number) {

    return this.productsService.remove(id);

  }

  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number) {


    return this.productsService.toggleActive(id);
  }


}
