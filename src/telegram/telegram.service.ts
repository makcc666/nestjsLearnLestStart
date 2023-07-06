import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;

	constructor() {
		this.options = { token: '6225772169:AAEEtGIssA9O-UF3ylMFKY05DWmqzxXN1uc', chatId: '-995650915' };
		this.bot = new Telegraf(this.options.token);
	}

	async sendMessage(message: string, chatId: string = this.options.chatId){
		await this.bot.telegram.sendMessage(chatId,message);
	}
}
