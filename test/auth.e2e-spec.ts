import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, USER_WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	login: '2some@email.com', password: '123456',
};

describe('Auth AppController (e2e)', () => {
	let app: INestApplication;


	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});


	it('/auth/login (POST)', async () => {
		return request(app.getHttpServer())
			.post(`/auth/login`)
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - WRONG ARGS', async () => {
		return request(app.getHttpServer())
			.post(`/auth/login`)
			.send({})
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.error).toBe('Bad Request');
				expect(body.message.length).toBe(2);
			});
	});

	it('/auth/login (POST) - USER NOT FOUND', async () => {
		return request(app.getHttpServer())
			.post(`/auth/login`)
			.send({ ...loginDto, login: '' })
			.expect(401,{
				error: 'Unauthorized', message: USER_NOT_FOUND_ERROR, statusCode: 401,
			})
	});

	it('/auth/login (POST) - WRONG PASSWORD', async () => {
		return request(app.getHttpServer())
			.post(`/auth/login`)
			.send({ ...loginDto, password: '' })
			.expect(401, {
				error: 'Unauthorized', message: USER_WRONG_PASSWORD_ERROR, statusCode: 401,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
