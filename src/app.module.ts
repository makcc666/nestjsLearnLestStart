import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import {TypegooseModule} from 'nestjs-typegoose'
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
@Module({
	imports: [
		TypegooseModule.forRootAsync({
			imports:[ConfigModule],
			inject:[ConfigService],
			useFactory:getMongoConfig,
		}),
		ConfigModule.forRoot(),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		FilesModule,
		SitemapModule
	], controllers: [AppController, FilesController], providers: [AppService, FilesService],
})
export class AppModule {}
