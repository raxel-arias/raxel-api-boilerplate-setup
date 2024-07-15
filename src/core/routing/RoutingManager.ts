import { Application, NextFunction, Request, Response, Router } from "express";

import { Logger } from "@core/classes";

export interface IRouteDeclaration {
	path: string;
	children: Router[];
}

export default class RoutingManager {
	private app: Application;
	private routes: IRouteDeclaration[];

	constructor(
		app: Application,
		routes: IRouteDeclaration[] = [],
		private readonly name = "App"
	) {
		this.app = app;

		this.routes = routes;

		Logger.info(`RoutingManager (${this.name})`, "Starting building process.");

		this.setCors();
		this.buildRouting();
		this.setNotFoundRoute();
	}

	private setCors() {
		this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
			res.header(
				"Access-Control-Allow-Headers",
				"X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
			);
			res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

			next();
		});

		Logger.verbose(`RoutingManager (${this.name})`, "Cors set.");
	}

	private buildRouting() {
		this.routes.forEach((declaration) => {
			const { children, path } = declaration;

			children.forEach((router: Router) => {
				this.app.use(path, router);
			});

			Logger.verbose(
				`RoutingManager (${this.name})`,
				`Route declaration ${path} loaded.`
			);
		});
	}

	private setNotFoundRoute() {
		this.app.use("*", (req: Request, res: Response) =>
			res.status(404).json({
				msg: "Resource not found",
				data: {
					resourceRequested: req.url,
					method: req.method,
				},
			})
		);

		Logger.verbose(`RoutingManager (${this.name})`, '"Not Found" route set.');
	}
}
