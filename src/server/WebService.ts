import express, { Application } from "express";
import os from "os";

import { WEB_SERVICE_MIDDLEWARES, WebServiceInfo } from "@server/web-service-config";

import RoutingManager from "@core/routing/RoutingManager";
import { Logger } from "@core/classes";
import { FormatUtils } from "@core/utils";
import { IRouteDeclaration } from "@core/routing/RoutingManager";
import { IWebServerConfig } from "../config";

export default class WebService {
	private readonly _name: string;
	private readonly _config: IWebServerConfig;

	private readonly _app: Application;
	private readonly _routes: IRouteDeclaration[];

	private startTime: number;
	private endTime: number;

	constructor(config: IWebServerConfig, routeDeclarations: IRouteDeclaration[]) {
		this._config = config;
		this.startTime = Date.now();

		this._app = express();

		this._name = this._config.name;
		this._routes = [...routeDeclarations];
	}

	async start() {
		Logger.info(`WebService (${this._name})`, "Starting building process");
		Logger.verbose(`WebService (${this._name})`, "Express app created");

		try {
			this.setMiddlewares();
			this.setRoutes();

			return Promise.resolve().then(() => {
				this.run();
			});
		} catch (e) {
			Logger.error(
				`WebService (${this._name})`,
				"An error occurred while starting the Web Service.",
				e
			);
			return Promise.reject();
		}
	}

	private setMiddlewares() {
		this._app.use(WEB_SERVICE_MIDDLEWARES);

		Logger.verbose(`WebService (${this._name})`, "Middlewares set.");
	}

	private setRoutes() {
		const routing = new RoutingManager(this._app, this._routes);

		Logger.verbose(`WebService (${this._name})`, "Routing set.");
	}

	private run() {
		const name = this._config.name;
		const host = this._config.host;
		const port = this._config.port;

		this._app.listen(port, host, () => {
			this.endTime = Date.now();

			let info = {
				"Web Service": new WebServiceInfo(
					name,
					host,
					port,
					this._config.environment,
					FormatUtils.formatDateTime(new Date()),
					os.hostname()
				),
			};

			Logger.devInfo(`WebService (${this._name})`, "Showing server info", info);

			Logger.info(
				`WebService (${this._name})`,
				`Server running in the ${port} port.`
			);
			Logger.verbose(`WebService (${this._name})`, "Info:");
			Logger.append(JSON.stringify(info, null, 2));
			console.table(info);
			Logger.verbose(
				`WebService (${this._name})`,
				`Initialization completed in ${this.endTime - this.startTime} ms.`
			);
		});
	}
}
