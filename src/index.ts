import { PicoYPlacaChecker } from "./services/PicoYPlacaChecker";
import { PicoYPlacaRules } from "./services/PicoYPlacaRules";
import { InputHandler } from "./services/InputHandler";

/**
 * Main function to execute the Pico y Placa checker.
 *
 * This function handles user input, performs the Pico y Placa check,
 * and outputs the result. It also manages errors and ensures resources
 * are properly cleaned up.
 */
async function main() {
  // Create instances of PicoYPlacaChecker with rules and InputHandler
  const checker = new PicoYPlacaChecker(new PicoYPlacaRules());
  const inputHandler = new InputHandler();

  try {
    // Get user input for plate number, date, and time
    const plateNumber = await inputHandler.getPlateNumber();
    const date = await inputHandler.getDate();
    const time = await inputHandler.getTime();

    // Check if the vehicle can drive and output the result
    const result = checker.check(plateNumber, date, time);
    console.log(result);
  } catch (error) {
    // Handle and log any errors that occur during the process
    console.error("An error occurred:", error);
  } finally {
    inputHandler.close();
  }
}

main();
