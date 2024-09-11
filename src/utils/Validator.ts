export class Validator {
    /**
     * Validates the format of a plate number.
     *
     * @param plateNumber - The plate number to validate.
     * @returns True if the plate number is in the correct format, false otherwise.
     */
    static isValidPlateNumber(plateNumber: string): boolean {
      // Regular expression to match the plate number format (e.g., ABC-1234)
      const plateRegex = /^[A-Z]{3}-\d{3,4}$/;
      return plateRegex.test(plateNumber);
    }
  
    /**
     * Validates the format and value of a date.
     *
     * @param date - The date to validate.
     * @returns True if the date is in the correct format and is a valid date, false otherwise.
     */
    static isValidDate(date: string): boolean {
      // Regular expression to match the date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(date) && !isNaN(new Date(date).getTime());
    }
  
    /**
     * Validates the format of a time.
     *
     * @param time - The time to validate in HH:MM format.
     * @returns True if the time is in the correct format, false otherwise.
     */
    static isValidTime(time: string): boolean {
      // Regular expression to match the time format (HH:MM, 24-hour format)
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      return timeRegex.test(time);
    }
  }
  