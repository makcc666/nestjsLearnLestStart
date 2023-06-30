import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export class HhData {
	@prop() count: number;
	@prop() juniorSalary: number;
	@prop() middleSalary: number;
	@prop() seniorSalary: number;
}

export class TopPageAdvantages {
	@prop() title: string;
	@prop() description: string;
}


export enum TopLevelCategory {
	Courses, Services, Books, Products,
}

export interface TopPageModel extends Base, TimeStamps {}

export class TopPageModel {
	@prop({ enum: TopLevelCategory }) firstCategory: TopLevelCategory;
	@prop() secondCategory: string;
	@prop({ unique: true }) alias: string;
	@prop() title: string;
	@prop() category: string;
	@prop({ type: () => HhData }) hh?: HhData;
	@prop({ type: () => [TopPageAdvantages] }) advantages: TopPageAdvantages[];
	@prop() seoText: string;

	@prop() tagsTitle: string;
	@prop({ type: () => [String] }) tags: string[];
}
