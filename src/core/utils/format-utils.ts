import * as fns from "date-fns";
import { CoreConstants } from "@core/constants";

/**
 * Contains utility functions for formatting dates and times.
 */
export namespace FormatUtils {
	/**
	 * Formats a given date object into a string representation using the provided format string.
	 * @param date The date object to format
	 * @param format The datetime format specifying the desired output format. Check https://date-fns.org/v3.6.0/docs/format for more info about formatting.
	 */
	export const formatDateTime = (
		date: Date,
		format: string = CoreConstants.SERVER_DATETIME_FORMAT
	): string => fns.format(date, format);
}
