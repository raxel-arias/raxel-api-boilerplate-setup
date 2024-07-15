import bp from "body-parser";
import cookies from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import requestIp from "request-ip";
import useragent from "express-useragent";

/**
 * Middlewares Core para la aplicación de express
 */
export const WEB_SERVICE_MIDDLEWARES = [
	cors(),
	bp.urlencoded({ extended: true }),
	bp.json(),
	cookies(),
	helmet(),
	requestIp.mw(),
	useragent.express(),
];

/**
 * ServerInfo class to represent server information for logging purposes.
 * @author Brando Raxel Arias Moreno
 */
export class WebServiceInfo {
	/** Name of the web service */
	"Name": string;

	/** Host on which the web service is running */
	"Host": string;

	/** Port on which the web service is running */
	"Port": number;

	/** Environment in which the web service is running */
	"Environment": string;

	/** Start-up date and time of the web service */
	"Start-up Date": string;

	/** Host device */
	"Host Device Name": string;

	/**
	 * Constructor for the ServerInfo class.
	 * @param name Name of the web service.
	 * @param host Host on which the web service is running.
	 * @param port Port on which the web service is running.
	 * @param environment Environment in which the web service is running.
	 * @param startupDate Start-up date and time of the web service.
	 * @param hostDeviceName name of the device.
	 */
	constructor(
		name: string,
		host: string,
		port: number,
		environment: string,
		startupDate: string,
		hostDeviceName: string
	) {
		this.Name = name;
		this.Host = host;
		this.Port = port;
		this.Environment = environment;
		this["Start-up Date"] = startupDate;
		this["Host Device Name"] = hostDeviceName;
	}
}
