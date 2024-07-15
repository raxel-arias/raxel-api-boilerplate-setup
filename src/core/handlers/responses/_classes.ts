export class Resolve<T> {
	constructor(data: IResolve<T>) {
		return Promise.resolve<IResolve<T>>(data);
	}
}

export class Reject {
	constructor(data: IReject) {
		return Promise.reject<IReject>(data);
	}
}

interface IResponse {
	status: number;
	msg: string;
}

export interface IResolve<T> extends IResponse {
	data: T;
}

export interface IReject extends IResponse {
	error: unknown;
}
