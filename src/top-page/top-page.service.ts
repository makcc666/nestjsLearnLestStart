import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from '../product/product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { Types } from 'mongoose';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { PartialAnotherType } from '../customTyps/common';
import { subDays } from 'date-fns';


@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

	async create(dto: CreateTopPageDto):Promise<TopPageModel> {
		return this.topPageModel.create(dto);
	}

	async findById(id: Types.ObjectId):Promise<TopPageModel> {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: CreateTopPageDto['alias']):Promise<TopPageModel> {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: FindTopPageDto['firstCategory']) {

		const pushToPages: PartialAnotherType<TopPageModel, string> = { alias: '$alias', title: '$title' };

		/** Аналог
		return this.topPageModel.aggregate([
			{
				$match: {
					firstCategory,
				},
			},
			{
				$group: {
					_id: { secondCategory: '$secondCategory' }, pages: { $push: pushToPages },
				},
			},
		]).exec();
		 */

		return this.topPageModel.aggregate()
			.match({
				firstCategory,
			})
			.group({
				_id: { secondCategory: '$secondCategory' }, pages: { $push: pushToPages },
			})
			.exec();
	}

	async findAll(): Promise<TopPageModel[]> {
		return this.topPageModel.find({}).exec();
	}

	async deleteById(id: Types.ObjectId) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: Types.ObjectId, dto: CreateProductDto):Promise<TopPageModel> {

		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByText(text: string) {
		try {
			return await this.topPageModel.find({
				$text: {
					$search: text, $caseSensitive: false,
				},
			});
		}
		catch (e) {
			console.log('E::', e);
			throw new Error('Asf');
		}
	}

	async findForHhUpdate(date: Date): Promise<TopPageModel[]> {
		return await this.topPageModel.find({
			firstCategory: TopLevelCategory.Courses, 'hh.updatedAt': { $lt: subDays(date, 1) },
		}).exec();
	}
}
