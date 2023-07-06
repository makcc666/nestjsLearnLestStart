import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;

	constructor() {
		const configService = new ConfigService();

		this.options = {
			token: configService.get('TELEGRAM_TOKEN'), chatId: configService.get('TELEGRAM_CHAT_ID'),
		};
		this.bot = new Telegraf(this.options.token);
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}
