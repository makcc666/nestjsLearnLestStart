import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[], usePrefixUUID: boolean = false): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);

		const res: FileElementResponse[] = [];
		const waitWriteFiles: Promise<any>[] = [];
		for (const file of files) {
			const fileNameWithPrefix = (usePrefixUUID ? `${nanoid()}-` : ``) + file.originalname;

			const req = writeFile(`${uploadFolder}/${fileNameWithPrefix}`, file.buffer)
				.then(resFile => res.push({
					url: `${dateFolder}/${fileNameWithPrefix}`, name: file.originalname,
				}));

			waitWriteFiles.push(req);
		}
		await Promise.allSettled(waitWriteFiles);
		return res;
	}

	async convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp()
			.toBuffer();
	}
}
