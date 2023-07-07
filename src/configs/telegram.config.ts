import { ITelegramOptions } from '../telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const res: ITelegramOptions = {
		token: configService.get('TELEGRAM_TOKEN'), chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
	};
	if (!res.token) throw new Error('TELEGRAM_TOKEN не задан');
	return res;
};