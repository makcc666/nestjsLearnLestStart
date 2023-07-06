import {
	Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { Types } from 'mongoose';
import { SLEEP_MS_EACH_HH_UPDATE, TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HhService } from '../hh/hh.service';
import { ObjectId } from 'mongodb';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService, private readonly hhService: HhService) {}

	@UseGuards(JwtAuthGuard) @Post('create') @UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: Types.ObjectId) {
		const topPage: TopPageModel | undefined = await this.topPageService.findById(id);
		if (!topPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return topPage;
	}

	@Get('byAlias/:alias') @UsePipes(new ValidationPipe())
	async getByAlias(@Param('alias') alias: CreateTopPageDto['alias']) {
		const topPage: TopPageModel | undefined = await this.topPageService.findByAlias(alias);
		if (!topPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return topPage;
	}

	@UseGuards(JwtAuthGuard) @Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: Types.ObjectId): Promise<void> {
		const deleteTopPage = await this.topPageService.deleteById(id);
		if (!deleteTopPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
	}

	@UseGuards(JwtAuthGuard) @Patch(':id')
	async path(@Param('id', IdValidationPipe) id: Types.ObjectId, @Body() dto: CreateTopPageDto) {
		const updateTopPage = await this.topPageService.updateById(id, dto);
		if (!updateTopPage) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
	}

	@HttpCode(200) @Post('find') @UsePipes(new ValidationPipe())
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text') @UsePipes(new ValidationPipe())
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}

	@Post('testHh')
	async testHh() {
		const data = await this.topPageService.findForHhUpdate(new Date());
		for (const page of data) {
			const hhData = await this.hhService.getData(page.category);
			page.hh = hhData;
			Logger.log(hhData);
			this.topPageService.updateById(page._id, page);
			await this.asleep(SLEEP_MS_EACH_HH_UPDATE);
		}
	}

	private async asleep(ms: number) {
		return new Promise((g) => setTimeout(g, ms, true));
	}
}
