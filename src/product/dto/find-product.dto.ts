import { IsNumber, IsString, Max, Min } from 'class-validator';

export class FindProductDto {
	@IsString() category: string;
	@IsNumber() @Max(50) @Min(1) limit: number;
}