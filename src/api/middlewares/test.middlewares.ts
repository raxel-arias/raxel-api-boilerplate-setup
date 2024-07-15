import { HttpStatus } from "@core/enums";
import { sendJsonBadResponse } from "@core/handlers/responses";
import { NextFunction, Request, Response } from "express";

export namespace TestMiddlewares {
	export const checkEndpointAccessPermission = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		// Getting random boolean value for test purposes.
		let allow: boolean = Math.random() >= 0.5;

		if (!allow)
			/**
			 * Block request process and send 403 Response.
			 */
			return sendJsonBadResponse(
				{
					status: HttpStatus.Client.FORBIDDEN,
					msg: "Resource access not allowed",
					data: {
						url: req.originalUrl,
					},
				},
				res
			);

		/**
		 * Continue request process.
		 */
		next();
	};
}
