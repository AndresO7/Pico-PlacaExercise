import { IPicoYPlacaRules } from "../interfaces/IPicoYPlacaRules";

export class PicoYPlacaRules implements IPicoYPlacaRules {
  // Map that associates each weekday with the restricted last digits
  private static readonly restrictionMap: Record<number, number[]> = {
    1: [1, 2], // Monday restrictions: last digits 1 and 2
    2: [3, 4], // Tuesday restrictions: last digits 3 and 4
    3: [5, 6], // Wednesday restrictions: last digits 5 and 6
    4: [7, 8], // Thursday restrictions: last digits 7 and 8
    5: [9, 0], // Friday restrictions: last digits 9 and 0
  };

  /**
   * Determines if a given day has restrictions for a specific last digit of the plate number.
   *
   * @param lastDigit - The last digit of the plate number.
   * @param dayOfWeek - The day of the week (0 for Sunday, 1 for Monday, etc.).
   * @returns True if the last digit is restricted on the given day, false otherwise.
   */
  private static isRestrictedDay(
    lastDigit: number,
    dayOfWeek: number
  ): boolean {
    const restrictedDigits = this.restrictionMap[dayOfWeek];
    return restrictedDigits.includes(lastDigit);
  }

  /**
   * Checks if the given time falls within restricted hours.
   *
   * @param time - The time to check in HH:MM format.
   * @returns True if the time is within restricted hours, false otherwise.
   */
  private static isRestrictedTime(time: string): boolean {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    // Define restricted time periods in minutes from midnight
    const morningStart = 7 * 60; // 07:00
    const morningEnd = 9 * 60 + 30; // 09:30
    const afternoonStart = 16 * 60; // 16:00
    const afternoonEnd = 19 * 60 + 30; // 19:30

    return (
      (totalMinutes >= morningStart && totalMinutes <= morningEnd) ||
      (totalMinutes >= afternoonStart && totalMinutes <= afternoonEnd)
    );
  }

  /**
   * Determines if a vehicle with a given plate number can drive on a specific date and time.
   *
   * @param plateNumber - The vehicle's plate number.
   * @param date - The date of the check as a Date object.
   * @param time - The time of the check in HH:MM format.
   * @returns True if the vehicle can drive, false otherwise.
   */
  public canDrive(plateNumber: string, date: Date, time: string): boolean {
    const lastDigit = parseInt(plateNumber.slice(-1), 10);
    const dayOfWeek = date.getDay(); // Sunday is 0, Monday is 1, etc.

    // No restrictions on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    // Check if the vehicle is restricted based on the day and time
    return !(
      PicoYPlacaRules.isRestrictedDay(lastDigit, dayOfWeek) &&
      PicoYPlacaRules.isRestrictedTime(time)
    );
  }
}
