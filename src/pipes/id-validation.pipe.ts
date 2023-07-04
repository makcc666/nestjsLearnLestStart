import { ArgumentMetadata, BadRequestException, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import { ID_VALIDATION_FORMAT_ERROR, ID_VALIDATION_TYPE_ERROR } from './id-validation.constants';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata): Types.ObjectId | never {
		if (metadata.type !== 'param') throw new InternalServerErrorException(ID_VALIDATION_TYPE_ERROR);
		if (Types.ObjectId.isValid(value) === false) throw new BadRequestException(ID_VALIDATION_FORMAT_ERROR);
		return value;
	}
}