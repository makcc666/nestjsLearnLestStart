import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCharacteristicsDto {
	@IsString() name: string;
	@IsString() value: string;
}

export class CreateProductDto extends TimeStamps {
	@IsString() image: string;
	@IsString() title: string;
	@IsNumber() price: number;
	@IsNumber() @IsOptional() oldPrice?: number;
	@IsNumber() credit: number;
	@IsString() description: string;
	@IsString() advantages: string;
	@IsString() disAdvantages: string;

	@IsArray() @IsString({ each: true }) categories: string[];

	@IsString({ each: true }) tags: string[];
	@IsArray() @ValidateNested() @Type(() => ProductCharacteristicsDto) characteristics: ProductCharacteristicsDto[];

}
