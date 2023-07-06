import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TelegramModule } from '../telegram/telegram.module';



@Module({
	providers: [HhService], imports: [ConfigModule,HttpModule,TelegramModule], exports:[HhService]
})
export class HhModule {}
