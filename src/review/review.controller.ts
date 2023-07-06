import {
	BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { Types } from 'mongoose';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService, private readonly telegramService: TelegramService) {}

	@UsePipes(new ValidationPipe()) @Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UsePipes(new ValidationPipe()) @Post('notify')
	async notify(@Body() dto: CreateReviewDto) {
		const message = [
			`Title: ${dto.title}`,
			`Desc: ${dto.description}`,
			`Rating: ${dto.rating}`,
			`ID product: ${dto.productId}`,
		];
		return this.telegramService.sendMessage(message.join('\n'));
	}

	@UseGuards(JwtAuthGuard) @Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: Types.ObjectId, @UserEmail() userEmail: string) {
		const deleteDoc = await this.reviewService.delete(id);
		if (!deleteDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

	}

	@UseGuards(JwtAuthGuard) @Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId', IdValidationPipe) productId: Types.ObjectId) {
		return this.reviewService.deleteByProductId(productId);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: Types.ObjectId) {
		return this.reviewService.findByProductId(productId);
	}

}
