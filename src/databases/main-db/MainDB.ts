import { databaseConfig } from "@config/databaseConfig";
import MultipleMongoDBConnection from "../engines/MultipleMongoDBConnection";

const config = { ...databaseConfig.main };

export const MainDB = new MultipleMongoDBConnection(config.name, {
	uri: databaseConfig.main.mongoUri,
	options: {},
});
