import * as fs from "fs";
import * as path from "path";

import dotenv from "dotenv";
dotenv.config();

import colors from "colors";

import { FormatUtils } from "@core/utils";

/**
 * Class containing static methods for logging Server-related information.
 * @author Brando Raxel Arias Moreno
 */
export class Logger {
	private static _date: string;

	/**
	 * Determines if the log file is already created (for development purposes)
	 * @private
	 */
	private static isInitialized: boolean = false;

	private constructor() {}

	/**
	 * Gets the current formatted date and time.
	 * @private
	 * @returns {string} The current formatted date and time.
	 */
	private static getCurrentDateTime(): string {
		return FormatUtils.formatDateTime(new Date());
	}

	/**
	 * Gets the log file path based on the server's startup status.
	 * @private
	 * @returns {string} The log file path.
	 */
	private static getLogFileDir(): string {
		const fileName = this.determineLogFileName();
		const rootPath = path.join(__dirname, "../../..");
		const logsPath = path.join(rootPath, "logs");

		if (!fs.existsSync(logsPath)) {
			try {
				fs.mkdirSync(logsPath, { recursive: true });
			} catch (err) {
				console.log("=".repeat(20));
				console.log("An error occurred while creating the logs folder.", err);
				console.log("=".repeat(20));
				return "";
			}
		}

		return path.join(rootPath, "logs", fileName);
	}

	/**
	 * Logs an information message to the log.
	 * @param {string} source - The source of the message.
	 * @param {string} description - The description of the message.
	 */
	static info(source: string, description: string) {
		const datetime = this.getCurrentDateTime();

		let rawText = `[${datetime}] ${LogTypes.INFO} [${source}] - ${description}`;
		this.append(rawText);

		console.log(
			`[${datetime}] ${colors.cyan(LogTypes.INFO)} [${colors.yellow(
				source
			)}] - ${description}`
		);
	}

	/**
	 * Logs a verbose message to the log.
	 * @param {string} source - The source of the message.
	 * @param {string} description - The description of the message.
	 */
	static verbose(source: string, description: string) {
		const datetime = this.getCurrentDateTime();

		let rawText = `[${datetime}] ${LogTypes.VERBOSE} [${source}] - ${description}`;
		this.append(rawText);

		console.log(
			`[${datetime}] ${colors.blue(LogTypes.VERBOSE)} [${colors.yellow(
				source
			)}] - ${description}`
		);
	}

	/**
	 * Logs a warning message to the log.
	 * @param {string} source - The source of the message.
	 * @param {string} description - The description of the message.
	 */
	static warning(source: string, description: string) {
		const datetime = this.getCurrentDateTime();

		let rawText = `[${datetime}] ${LogTypes.WARNING} [${source}] - ${description}`;
		this.append(rawText);

		console.log(
			`[${datetime}] ${colors.yellow(LogTypes.WARNING)} [${colors.yellow(
				source
			)}] - ${description}`
		);
	}

	/**
	 * Logs an error message to the log.
	 * @param {string} source - The source of the message.
	 * @param {string} description - The description of the message.
	 * @param {any} errorOutput - Additional error output.
	 */
	static error(source: string, description: string, errorOutput: any = null) {
		const datetime = this.getCurrentDateTime();

		let rawText = `[${datetime}] ${LogTypes.ERROR} [${source}] - ${description} ${
			errorOutput ? `\n\nDetails:\n${errorOutput}` : ""
		}`;
		this.append("-".repeat(45));
		this.append(rawText);
		this.append("-".repeat(45));

		console.log("-".repeat(45));
		console.log(
			`[${datetime}] ${colors.red(LogTypes.ERROR)} [${colors.yellow(
				source
			)}] - ${description} ${errorOutput ? `\n\nDetails:\n${errorOutput}` : ""}`
		);
		console.log("-".repeat(45));
	}

	static devInfo(source: string, description: string, data?: any) {
		const datetime = this.getCurrentDateTime();

		if (
			process.env.NODE_ENV === "PRODUCTION" ||
			process.env.NODE_ENV === "production"
		)
			return;

		let text = `[${datetime}] ${colors.green(LogTypes.DEV)} [${colors.yellow(
			source
		)}] - ${description}`;

		console.log("+".repeat(45));
		console.log(text);
		console.log("Data:");
		console.log(data);
		console.log("+".repeat(45));
	}

	/**
	 * Appends text to the log file.
	 * @private
	 * @param {string} text - The text to append.
	 */
	static append(text: string) {
		const logFileDir = this.getLogFileDir();

		if (!fs.existsSync(logFileDir)) {
			try {
				fs.writeFileSync(logFileDir, "");
			} catch (e) {
				console.log("=".repeat(20));
				console.log("An error occurred while creating the log.", e);
				console.log("=".repeat(20));
			}
		}

		if (process.env.NODE_ENV !== "PRODUCTION" && !this.isInitialized) {
			try {
				fs.writeFileSync(logFileDir, "");
				this.isInitialized = true;
			} catch (e) {
				console.log("=".repeat(20));
				console.log("An error occurred while clearing the log.", e);
				console.log("=".repeat(20));
			}
		}

		try {
			fs.appendFileSync(this.getLogFileDir(), `\n${text}`);
		} catch (e) {
			console.log("=".repeat(20));
			console.log("An error occurred while saving the log.", e);
			console.log("=".repeat(20));
		}
	}

	private static determineLogFileName() {
		if (process.env.NODE_ENV !== "PRODUCTION") return "test.log";

		if (!this._date) this._date = FormatUtils.formatDateTime(new Date());

		return this._date + ".log";
	}
}

/**
 * Enumeration of log message types.
 * @enum {string}
 */
enum LogTypes {
	INFO = "INFO   ",
	VERBOSE = "VERBOSE",
	WARNING = "WARNING",
	ERROR = "ERROR  ",
	DEV = "DEV-LOG",
}
