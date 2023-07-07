import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_PROVIDER } from './telegram.constants';

@Global()
// @Module({
// 	providers: [TelegramService], exports: [TelegramService],
// })
export class TelegramModule {
	static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);
		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [
				TelegramService,
				asyncOptions,
			],
			exports: [TelegramService],
		};
	}

	private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
		return {
			provide: TELEGRAM_PROVIDER, useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			}, inject: options.inject || [],
		};
	}
}
