import { Request, Response } from "express";
import { sendJsonBadResponse, sendJsonResponse } from "@core/handlers/responses";
import { HttpStatus } from "@core/enums";

export namespace TestController {
	export const getMessage = (req: Request, res: Response) => {
		sendJsonResponse(
			{
				status: HttpStatus.Success.OK,
				msg: "This is a message.",
			},
			res
		);
	};

	export const sendResponse = (req: Request, res: Response) => {
		const data = req.body;

		if (!data.msg)
			return sendJsonBadResponse(
				{
					status: HttpStatus.Client.BAD_REQUEST,
					msg: '"msg" property invalid or not found',
				},
				res
			);

		sendJsonResponse(
			{
				status: HttpStatus.Success.CREATED,
				msg: "Message sent.",
				data: {
					messageSent: data.msg,
				},
			},
			res
		);
	};
}
