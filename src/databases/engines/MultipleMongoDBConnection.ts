import * as mongoose from "mongoose";
import { Logger } from "@core/classes";

/**
 * Clase Connection para establecer múltiples conecciones de MongoDB
 * @author Brando Raxel Arias Moreno
 */
export default class MultipleMongoDBConnection {
	private readonly _connectionName: string;

	private readonly config: {
		uri: string;
		options?: mongoose.ConnectOptions;
	};

	private _connected: boolean = false;
	private _connection: mongoose.Connection;

	private collections: Array<IModel> = [];

	constructor(
		connectionName: string,
		config: { uri: string; options?: mongoose.ConnectOptions },
		collections: Array<IModel> = []
	) {
		this._connectionName = connectionName;

		this.config = config;
		this.collections = collections;
	}

	async connect(): Promise<void> {
		if (this._connected) {
			Logger.warning(
				`MultipleMongoDBConnection [${this._connectionName}]`,
				"Database connection is already open."
			);
			return Promise.resolve();
		}

		return mongoose
			.createConnection(this.config.uri, this.config.options ?? {})
			.asPromise()
			.then((connection) => {
				this._connection = connection;
				this._connected = true;

				Logger.info(
					`MultipleMongoDBConnection [${this._connectionName}]`,
					"Connection established and ready to use."
				);

				if (this.collections.length > 0) {
					this.loadCollections();
				}

				return Promise.resolve();
			})
			.catch((e) => {
				Logger.error(
					`MultipleMongoDBConnection [${this._connectionName}]`,
					"Error while connecting to the database.",
					e
				);
				return Promise.reject();
			});
	}

	private loadCollections() {
		if (!this._connected) {
			Logger.error(
				`MultipleMongoDBConnection [${this._connectionName}]`,
				"Connection is not ready to execute the loadCollections() method."
			);
			return;
		}

		this.collections.forEach(({ name, schema }) => {
			this._connection.model(name, schema, name);
			Logger.verbose(
				`MultipleMongoDBConnection [${this._connectionName}]`,
				`${name} schema created. Model loaded and ready to use.`
			);
		});

		Logger.info(
			`MultipleMongoDBConnection [${this._connectionName}]`,
			"Models loaded."
		);
	}

	get connection() {
		return this._connection;
	}
}

export interface IModel {
	name: string;
	schema: any;
}
