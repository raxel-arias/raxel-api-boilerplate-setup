import { IRouteDeclaration } from "@core/routing/RoutingManager";
import TestRoutes from "./test.routes";

/**
 * Add your routers here.
 */
export const ApiRoutes: IRouteDeclaration = {
	path: "/api",
	children: [
		TestRoutes, // 'TestRoutes' Express.Router
	],
};

/**
 * Additionally, you can create a new IRouteDeclaration and add it to Main.ts -> _run() method -> myWebService constructor params.
 *
 * export const MyCustomRoutes: IRouteDeclaration = {
 * 		path: '/custom',
 * 		children: [
 * 			MyRoutes1,
 * 			MyRoutes2,
 * 			Router().get('/direct-route', (req, res) => res.status(200).json({msg: 'Hello'}))
 * 		]
 * }
 */
