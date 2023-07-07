import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
	@IsString() @ApiProperty() login: string;
	@IsString()   password: string;
}