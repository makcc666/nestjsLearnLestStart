import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { HhData, TopLevelCategory, TopPageAdvantages } from '../top-page.model';

export class HhDataDto {
	@IsNumber() count: number;
	@IsNumber() juniorSalary: number;
	@IsNumber() middleSalary: number;
	@IsNumber() seniorSalary: number;
	@IsDate() updatedAt: Date;
}

export class TopPageAdvantagesDto {
	@IsString() title: string;
	@IsString() description: string;
}

export class CreateTopPageDto extends TimeStamps {
	// @IsEnum({ enum: TopLevelCategory }) firstCategory: TopLevelCategory;
	@IsEnum(TopLevelCategory) firstCategory: TopLevelCategory;
	@IsString() secondCategory: string;
	@IsString() alias: string;
	@IsString() title: string;
	@IsString() category: string;
	@IsOptional() @ValidateNested() @Type(() => HhDataDto) hh?: HhDataDto;
	@IsArray() @ValidateNested() @Type(() => TopPageAdvantagesDto) advantages: TopPageAdvantagesDto[];
	@IsString() seoText: string;

	@IsString() tagsTitle: string;
	@IsArray() @IsString({ each: true }) tags: string[];
}
