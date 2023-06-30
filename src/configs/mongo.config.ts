import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => ({
	uri: getMongoUri(configService),
	...getMongoOptions(),
	// uri:`mongodb://admin:admin@localhost:27017/admin`,
});

const getMongoOptions = (): Record<string, string | boolean> => ({
	// useNewUrlParser: true,
	// useCreateIndex:true,
	// useUnifiedTopology:true,
});

const getMongoUri = (configService: ConfigService): string => `mongodb://${configService.get('MONGO_AUTH_LOGIN')}:${configService.get('MONGO_AUTH_PASS')}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_AUTH_DB')}`;

