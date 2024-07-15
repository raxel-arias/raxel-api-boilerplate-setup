import dotenv from "dotenv";
dotenv.config();

export const databaseConfig = {
	main: {
		name: process.env.MAINDB_NAME!,
		mongoUri: process.env.MAINDB_MONGO_URI!,
	},
};
