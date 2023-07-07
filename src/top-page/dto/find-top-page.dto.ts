import { TopLevelCategory } from '../top-page.model';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory) @ApiProperty({ enum: TopLevelCategory }) firstCategory: TopLevelCategory;
}