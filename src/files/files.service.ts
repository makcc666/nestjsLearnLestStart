import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid';

@Injectable()
export class FilesService {
	async saveFiles(files: Express.Multer.File[], usePrefixUUID: boolean = false): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);

		const res: FileElementResponse[] = [];
		const waitWriteFiles: Promise<any>[] = [];
		for (const file of files) {
			const prefix = usePrefixUUID ? `${nanoid()}-` : ``;

			const req = writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
				.then(resFile => res.push({
					url: `${dateFolder}/${prefix}${file.originalname}`, name: file.originalname,
				}));

			waitWriteFiles.push(req);
		}
		await Promise.allSettled(waitWriteFiles);
		return res;

	}
}
