import dotenv from "dotenv";
dotenv.config();

export const nodemailerConfig: NodemailerConfig = {
	provider: process.env.NODEMAILER_PROVIDER_ADDRESS!,
	service: process.env.NODEMAILER_SERVICE_NAME!,
	user: process.env.NODEMAILER_USER!,
	pass: process.env.NODEMAILER_PASSWORD!,
};

export interface NodemailerConfig {
	provider: string;
	service: string;
	user: string;
	pass: string;
}
