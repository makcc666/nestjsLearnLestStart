import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { Types } from 'mongoose';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { CreateProductDto } from '../product/dto/create-product.dto';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@Post('create') @UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		const topPage: TopPageModel | undefined = await this.topPageService.findById(id);
		if (!topPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return topPage;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: Types.ObjectId): Promise<void> {
		const deleteTopPage = await this.topPageService.deleteById(id);
		if (!deleteTopPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
	}

	@Patch(':id')
	async path(@Param('id', IdValidationPipe) id: Types.ObjectId, @Body() dto: CreateProductDto) {
		const updateTopPage = await this.topPageService.updateById(id, dto);
		if (!updateTopPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
	}

	@HttpCode(200) @Post() @UsePipes(new ValidationPipe())
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto);
	}
}
