import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';


@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		const res = await this.reviewModel.create(dto);
		console.log('ReviewService::create::', res);
		return res;
	}

	async delete(id: Types.ObjectId): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async deleteByProductId(productId: Types.ObjectId): Promise<number> {
		const res = await this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
		console.log('ReviewService::deleteByProductId', res);
		return res.deletedCount;
	}

	async findByProductId(productId: Types.ObjectId): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel
			.find({
				productId: new Types.ObjectId(productId),
			})
			.exec();
	}
}
