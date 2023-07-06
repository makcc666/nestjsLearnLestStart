import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { API_URL, CLUSTER_NOT_FOUND_ERROR, CLUSTER_REQUIRED_ID } from './hh.constants';
import { IHhResponse } from './hh.interfaces';
import { TelegramService } from '../telegram/telegram.service';
import { HhData } from '../top-page/top-page.model';

@Injectable()
export class HhService {
	private token: string;

	constructor(private readonly configService: ConfigService, private readonly httpService: HttpService, private readonly telegramService: TelegramService) {
		this.token = this.configService.get('HH_TOKEN');
		if (!this.token) throw new Error('HH_TOKEN не задан');
	}

	async getData(text: string) {
		try {
			const { data } = await this.httpService.get<IHhResponse>(API_URL.vacancies, {
				params: {
					text, clusters: true,
				}, headers: {
					'User-Agent': 'HelloFromNest',
					// Authorization: 'Bearer ' + this.token,
				},
			}).toPromise();
			;
			return this.parseData(data);
		}
		catch (e) {
			Logger.log(e);
			if (e?.toString()) {
				await this.telegramService.sendMessage(typeof e === 'string' ? e : e.toString());
			}
			throw e;
		}
	}

	private parseData(data: IHhResponse): HhData {
		const salaryCluster = data.clusters.find(record => record.id === CLUSTER_REQUIRED_ID);
		if (!salaryCluster) throw new Error(CLUSTER_NOT_FOUND_ERROR);

		const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
		const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name);
		const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name);
		return {
			juniorSalary, middleSalary, seniorSalary, count: data.found, updatedAt: new Date(),
		};

	}

	private getSalaryFromString(dataString: string): number {
		const numberRegExp = /(\d+)/g;
		const res = dataString.match(numberRegExp);
		if (!res) return 0;
		return Number(res[0]);
	}


}
