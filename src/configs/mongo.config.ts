import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
	uri: getMongoUri(configService), ...getMongoOptions(),
});

const getMongoOptions = (): Record<string, string | boolean> => ({
	// useNewUrlParser: true,
	// useCreateIndex:true,
	// useUnifiedTopology:true,
});

const getMongoUri = (configService: ConfigService): string => `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_AUTH_DB')}`;
