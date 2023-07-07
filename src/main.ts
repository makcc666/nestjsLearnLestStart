import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('TopApi')
		.setDescription('Тестовый проект на NestJS')
		.setVersion('1.0')
		.addTag('nestjs')
		.addTag('learn')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

bootstrap();
