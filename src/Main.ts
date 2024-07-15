import { MainDB } from "@databases/main-db/MainDB";

import WebService from "@server/WebService";
import { serverConfig } from "@config";
import { Logger } from "@core/classes";

import { ApiRoutes } from "@api/routes";
import { MiscUtils } from "@core/utils";

/**
 * Singleton class to create and execute the Web Service
 */
export class Main {
	private static _instance: Main;

	static run() {
		if (!this._instance) {
			this._instance = new Main();
		}

		return this._instance;
	}

	private constructor() {
		this._run();
	}

	private async _run() {
		const myWebService = new WebService(
			{
				...serverConfig,
			},
			[ApiRoutes]
		);

		MiscUtils.executeSuperImportantCoreFunction();

		try {
			// Establish connection with your databases here.
			// await MainDB.connect();

			await myWebService.start();
		} catch (error) {
			Logger.error("MAIN", "There's an error initializing the server.", error);
		}
	}
}
