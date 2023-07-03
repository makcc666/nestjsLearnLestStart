import {
	BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { Types } from 'mongoose';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe()) @Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard) @Delete(':id')
	async delete(@Param('id') id: Types.ObjectId, @UserEmail() userEmail: string) {
		if (Types.ObjectId.isValid(id) === false) throw new BadRequestException();

		const deleteDoc = await this.reviewService.delete(id);
		if (!deleteDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

	}

	@UseGuards(JwtAuthGuard) @Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId') productId: Types.ObjectId) {
		if (Types.ObjectId.isValid(productId) === false) throw new BadRequestException();

		return this.reviewService.deleteByProductId(productId);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: Types.ObjectId) {
		if (Types.ObjectId.isValid(productId) === false) throw new BadRequestException();

		return this.reviewService.findByProductId(productId);
	}

}
