import readline from "readline";

export class InputHandler {
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
      plateNumber = await this.askQuestion(
        "Enter the plate number (e.g., PBX-1234): "
      );
      if (this.isValidPlateNumber(plateNumber)) {
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
      if (this.isValidDate(date)) {
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
      if (this.isValidTime(time)) {
        break;
      } else {
        console.log(
          "Invalid time. It must be in the format HH:MM (24-hour format)."
        );
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

  /**
   * Validates the format of a plate number.
   *
   * @param plateNumber - The plate number to validate.
   * @returns True if the plate number is in the correct format, false otherwise.
   */
  private isValidPlateNumber(plateNumber: string): boolean {
    const plateRegex = /^[A-Z]{3}-\d{3,4}$/;
    return plateRegex.test(plateNumber);
  }

  /**
   * Validates the format and value of a date.
   *
   * @param date - The date to validate.
   * @returns True if the date is in the correct format and is a valid date, false otherwise.
   */
  private isValidDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date) && !isNaN(new Date(date).getTime());
  }

  /**
   * Validates the format of a time.
   *
   * @param time - The time to validate.
   * @returns True if the time is in the correct format, false otherwise.
   */
  private isValidTime(time: string): boolean {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  }
}
