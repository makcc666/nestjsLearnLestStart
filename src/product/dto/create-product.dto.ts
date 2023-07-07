import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCharacteristicsDto {
	@IsString() @ApiProperty() name: string;
	@IsString() @ApiProperty() value: string;
}

export class CreateProductDto extends TimeStamps {
	@IsString() @ApiProperty() image: string;
	@IsString() @ApiProperty() title: string;
	@IsNumber() @ApiProperty() price: number;
	@IsNumber() @IsOptional() @ApiProperty({ required: false }) oldPrice?: number;
	@IsNumber() @ApiProperty() credit: number;
	@IsString() @ApiProperty() description: string;
	@IsString() @ApiProperty() advantages: string;
	@IsString() @ApiProperty() disAdvantages: string;

	@IsArray() @IsString({ each: true }) @ApiProperty() categories: string[];

	@IsString({ each: true }) @ApiProperty() tags: string[];
	@IsArray() @ValidateNested() @Type(() => ProductCharacteristicsDto) @ApiProperty({type:[ProductCharacteristicsDto]}) characteristics: ProductCharacteristicsDto[];

}
