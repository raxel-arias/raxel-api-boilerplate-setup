import jwt, { JwtPayload } from "jsonwebtoken";

import { JWTConfig, jwtConfig } from "@config";

export class JwtProvider {
	private readonly config: JWTConfig;

	constructor(config = jwtConfig) {
		this.config = config;
		this.verifyConfiguration();
	}

	generate(payload: any) {
		return Promise.resolve(
			jwt.sign(
				payload,
				this.config.secret!,
				this.config.expiresIn ? { expiresIn: this.config.expiresIn } : undefined
			)
		);
	}

	verify(token: string) {
		return new Promise<jwt.JwtPayload>((resolve, reject) => {
			jwt.verify(token.trim(), this.config.secret!, (error, user) => {
				if (error) return reject(error);
				resolve(user as JwtPayload);
			});
		});
	}

	private verifyConfiguration() {
		if (!this.config.secret) throw new Error("JWT secret not specified.");
		if (!this.config.expiresIn) throw new Error("JWT expiresIn not specified.");
	}
}
