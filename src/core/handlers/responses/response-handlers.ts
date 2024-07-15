import { Response } from "express";
import { IReject, IResolve, Reject, Resolve } from "@core/handlers/responses/_classes";

export const sendJsonResponse = <T>(
	responseData: IResolve<T> | Resolve<T> | IReject | Reject,
	expressResponse: Response
) => {
	const response = <IResolve<T>>responseData;

	return expressResponse.status(response.status).json(response);
};

export const sendJsonBadResponse = (
	responseError: IReject | Reject,
	expressResponse: Response
) => {
	const response = <IReject>responseError;

	return expressResponse.status(response.status).json(response);
};
