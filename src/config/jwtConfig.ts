import dotenv from "dotenv";
dotenv.config();

export const jwtConfig = {
	secret: process.env.JWT_SECRET,
	expiresIn: process.env.JWT_EXPIRES_IN,
};

export interface JWTConfig {
	secret?: string;
	expiresIn?: string;
}
