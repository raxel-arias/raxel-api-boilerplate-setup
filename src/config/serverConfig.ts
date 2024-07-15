import dotenv from "dotenv";
dotenv.config();

import { ServerUtils } from "@core/utils";

export const serverConfig: IWebServerConfig = {
	environment: process.env.NODE_ENV ?? "DEVELOPMENT",
	name: process.env.NAME ?? "HCD PWA Backend",
	host: process.env.HOST ?? ServerUtils.getLocalIP(),
	port: Number(process.env.PORT) ?? 3000,
};

export interface IWebServerConfig {
	environment: string;
	name: string;
	host: string;
	port: number;
}
