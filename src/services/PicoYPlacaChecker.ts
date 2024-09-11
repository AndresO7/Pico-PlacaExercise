import { IPicoYPlacaRules } from "../interfaces/IPicoYPlacaRules";

export class PicoYPlacaChecker {
  constructor(private rules: IPicoYPlacaRules) {}

  /**
   * Checks if a vehicle can drive based on its plate number, date, and time.
   *
   * @param plateNumber - The vehicle's plate number.
   * @param date - The date of the check in YYYY-MM-DD format.
   * @param time - The time of the check in HH:MM format.
   * @returns A message indicating whether the vehicle can drive or not.
   */
  public check(plateNumber: string, date: string, time: string): string {

    const parsedDate = new Date(date);
    parsedDate.setHours(parsedDate.getHours());

    // Check if the vehicle can drive based on the rules
    const canDrive = this.rules.canDrive(plateNumber, parsedDate, time);

    // Return the result message
    return canDrive
      ? `The vehicle with plate ${plateNumber} **can** drive.`
      : `The vehicle with plate ${plateNumber} **cannot** drive.`;
  }
}
