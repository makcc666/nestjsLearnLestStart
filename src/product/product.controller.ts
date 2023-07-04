import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create') @UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const product: ProductModel | undefined = await this.productService.findById(id);
		if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		return product;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedProduct = await this.productService.deleteById(id);
		if (!deletedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
	}

	@Patch(':id') @UsePipes(new ValidationPipe())
	async path(@Param('id') id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);
		if (!updatedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		return updatedProduct;
	}

	@Post('find') @HttpCode(200) @UsePipes(new ValidationPipe())
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReview(dto);
	}

}
