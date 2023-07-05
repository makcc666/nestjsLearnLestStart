export type PartialAnotherType<T,ReqType=any> = {
	[P in keyof T]?: ReqType;
};
