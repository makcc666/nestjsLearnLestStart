import { ReviewController } from './review.controller';
import { Module } from '@nestjs/common';

@Module({
	controllers: [ReviewController],
})
export class ReviewModule {
	email: string;
	passwordHash: string;
}
