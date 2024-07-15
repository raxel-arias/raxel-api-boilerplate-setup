import nodemailer, { createTransport } from "nodemailer";
import { nodemailerConfig, NodemailerConfig } from "@config";

import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailOptions } from "nodemailer/lib/smtp-pool";
import { Logger } from "@core/classes";

export class NodemailerProvider {
	private readonly config: NodemailerConfig;

	private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
	constructor(config = nodemailerConfig) {
		this.config = config;
		this.verifyConfiguration();
	}

	sendEmail(mailOptions: MailOptions, customProvider = false) {
		if (!customProvider) mailOptions.from = this.config.provider;

		return new Promise<string>((resolve, reject) => {
			this.transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					Logger.error(
						"NodemailerProvider",
						"An error occurred while sending the message!",
						err
					);
					reject(err);
				}

				Logger.info(
					"NodemailerProvider",
					`Email sent from ${mailOptions.from} to ${mailOptions.to}.`
				);
				Logger.verbose("NodemailerProvider", info.response);

				resolve(info.response);
			});
		});
	}

	private verifyConfiguration() {
		Object.entries(this.config).forEach((entry) => {
			const [key, value] = entry;

			if (!value)
				throw new Error(
					`Nodemailer Config. error: Missing value in ${key} property.`
				);
		});

		this.transporter = createTransport(this.config);
	}
}
