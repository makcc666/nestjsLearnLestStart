import { BadRequestException, Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
import path from 'node:path';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload') @HttpCode(200) @UseGuards(JwtAuthGuard) @UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const filesToSave: MFile[] = [file];

		if (file.mimetype.includes('image') && !file.originalname.toLowerCase().endsWith('webp')) {
			const WebpBuffer = await this.filesService.convertToWebP(file.buffer);
			const WebpName = [
				...file.originalname.split('.').slice(0, -1),
				'webp',
			].join('.');

			filesToSave.push(new MFile({
				buffer: WebpBuffer, originalname: WebpName,
			}));
		}

		return this.filesService.saveFiles(filesToSave, true);
	}
}
