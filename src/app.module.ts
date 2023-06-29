import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { getMongoConfig } from './configs/mongo.config';

@Module({
	imports: [
		// MongooseModule.forRoot('mongodb://localhost/test'),
		MongooseModule.forRootAsync({
			imports:[ConfigModule],
			inject:[ConfigService],
			useFactory:getMongoConfig,
		}),

		UsersModule,
		ConfigModule.forRoot(),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule
	], controllers: [AppController], providers: [AppService],
})
export class AppModule {}
