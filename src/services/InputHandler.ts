import readline from "readline";
import { Validator } from "../utils/Validator";

export class InputHandler {
  // Creates a readline interface for user input/output
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  /**
   * Prompts the user with a question and returns their response.
   *
   * @param query - The question to ask the user.
   * @returns A promise that resolves to the user's input.
   */
  private askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => this.rl.question(query, resolve));
  }

  /**
   * Asks the user to input a plate number and validates its format.
   *
   * @returns A promise that resolves to a valid plate number.
   */
  public async getPlateNumber(): Promise<string> {
    let plateNumber: string;

    while (true) {
      plateNumber = await this.askQuestion("Enter the plate number (e.g., PBX-1234): ");
      if (Validator.isValidPlateNumber(plateNumber)) {
        break;
      } else {
        console.log("Invalid plate number. It must be in the format PBX-1234.");
      }
    }

    return plateNumber;
  }

  /**
   * Asks the user to input a date and validates its format.
   *
   * @returns A promise that resolves to a valid date.
   */
  public async getDate(): Promise<string> {
    let date: string;

    while (true) {
      date = await this.askQuestion("Enter the date (YYYY-MM-DD): ");
      if (Validator.isValidDate(date)) {
        break;
      } else {
        console.log("Invalid date. It must be in the format YYYY-MM-DD.");
      }
    }

    return date;
  }

  /**
   * Asks the user to input a time and validates its format.
   *
   * @returns A promise that resolves to a valid time.
   */
  public async getTime(): Promise<string> {
    let time: string;

    while (true) {
      time = await this.askQuestion("Enter the time (HH:MM, 24-hour format): ");
      if (Validator.isValidTime(time)) {
        break;
      } else {
        console.log("Invalid time. It must be in the format HH:MM (24-hour format).");
      }
    }

    return time;
  }

  /**
   * Closes the readline interface.
   */
  public close(): void {
    this.rl.close();
  }
}
