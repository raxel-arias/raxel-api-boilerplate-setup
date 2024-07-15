import { Router } from "express";
import { TestMiddlewares } from "@api/middlewares/test.middlewares";
import { TestController } from "@api/controllers/test.controller";

const TestRoutes = Router();

/**
 * You can use middlewares like that (check for TestMiddlewares.checkEndpointAccessPermission).
 */
TestRoutes.get(
	"/get-message",
	TestMiddlewares.checkEndpointAccessPermission,
	TestController.getMessage
);
TestRoutes.post(
	"/send-message",
	TestMiddlewares.checkEndpointAccessPermission,
	TestController.sendResponse
);

export default TestRoutes;
