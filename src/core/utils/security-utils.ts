import bcrypt from "bcrypt";
import crypto from "crypto";
import { v4 as uuid } from "uuid";

/**
 * Contains security utils for hashing and comparing encrypted data, and generating tokens, passwords.
 */
export namespace SecurityUtils {
	const MIN_PASSWORD_LENGTH: number = 8;

	/**
	 * This function generates a UUID based on v4.
	 * @returns {string} A UUID string.
	 */
	export function genUUID(): string {
		return uuid();
	}

	/**
	 * This function generates a hash for a given text.
	 * @param {string} text - The text to be hashed.
	 * @returns {Promise<string>} A promise that resolves to the hashed text.
	 * @throws {Error} If the text to be hashed is empty.
	 */
	export async function genHash(text: string): Promise<string> {
		if (text.length === 0) {
			throw new Error(
				"SecurityUtils (genHash) - The text to be hashed must contain more than 0 characters."
			);
		}
		try {
			const salt = await bcrypt.genSalt(20);
			const hash = await bcrypt.hash(text, salt);
			return hash;
		} catch (e) {
			return Promise.reject(
				`SecurityUtils (genHash) - There's an error while hashing data: \n${e}`
			);
		}
	}

	/**
	 * This function compares a given text with a hashed text.
	 * @param {string} text - The text to compare.
	 * @param {string} hashedInfo - The hashed text to compare against.
	 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the texts match.
	 * @throws {Error} If the text to be compared or the hashed text is empty.
	 */
	export async function compareHash(
		text: string,
		hashedInfo: string
	): Promise<boolean> {
		if (text.length === 0) {
			throw new Error(
				"SecurityUtils (compareHash) - The text to be compared must contain more than 0 characters."
			);
		}
		if (hashedInfo.length === 0) {
			throw new Error("SecurityUtils (compareHash) - Invalid hashed text.");
		}

		try {
			const areEquals = await bcrypt.compare(text, hashedInfo);
			return areEquals;
		} catch (e) {
			return Promise.reject(
				`SecurityUtils (compareHash) - There's an error while comparing the data: \n${e}`
			);
		}
	}

	/**
	 * This function generates a random token.
	 * @returns {Promise<string>} A promise that resolves to a random token.
	 * @throws {Error} If there's an error while generating the token.
	 */
	export async function genRandomToken(): Promise<string> {
		try {
			const token = crypto.randomBytes(20).toString("hex");
			return token;
		} catch (e) {
			return Promise.reject(
				`SecurityUtils (genRandomToken) - There's an error while generating token: \n${e}`
			);
		}
	}

	/**
	 * This function generates a random password.
	 * @param {number} length - The length of the password. Defaults to MIN_PASSWORD_LENGTH.
	 * @returns {Promise<string>} A promise that resolves to a random password.
	 */
	export async function genRandomPassword(
		length: number = MIN_PASSWORD_LENGTH
	): Promise<string> {
		const characters: string =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let password = "";

		for (let i = 0; i < length; i++) {
			const index = Math.floor(Math.random() * characters.length);
			password += characters.charAt(index);
		}

		return password;
	}

	/**
	 * This function generates a random six-digit code.
	 * @returns {string} A random six-digit code.
	 */
	export function genRandomSixDigitsCode(): string {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
}
