# Pico y Placa Predictor

## Overview

This project implements a "Pico y Placa" predictor to determine whether a vehicle can be on the road based on its license plate, the current date, and time. It adheres to the Pico y Placa regulations in Quito, Ecuador, including specific time restrictions and rules for different days of the week.

## Author
Andres Ortiz

## Requirements

- **Node.js**: 20.9.0

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AndresO7/Pico-PlacaExercise.git
   cd Pico-PlacaExercise-main
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application
To start the application in development mode, use:
   ```bash
   npm run dev
   ```
Alternatively, you can use:
   ```bash
   npm start
   ```

## Running Tests
To run the tests, use:
   ```bash
   npm run test
   ```

## Technology Stack
- TypeScript: The project is written in TypeScript for type safety and better maintainability.
- ESLint: Used for linting and ensuring code quality.
- Jest: Used for automated testing.

## Timezone Adjustment
The application adjusts the timezone to Quito, Ecuador (UTC-5). This adjustment is made to ensure that the time checks are accurate for the local timezone.

## Pico y Placa Rules
- Hours:
  - Morning: 07:00 AM to 09:30 AM
  - Afternoon: 04:00 PM to 07:30 PM

- Days and Digits:
  - Monday: Plates ending in 1 and 2
  - Tuesday: Plates ending in 3 and 4
  - Wednesday: Plates ending in 5 and 6
  - Thursday: Plates ending in 7 and 8
  - Friday: Plates ending in 9 and 0

# Future Improvements
- Holiday API Integration: Future improvements could include integrating an API to check for holidays. The implementation might look like this:
   ```javascript
  import axios from 'axios';
  import { IFeriadoProvider } from '../interfaces/IFeriadoProvider';

  export class ApiFeriadoProvider implements IFeriadoProvider {
    private apiUrl = 'https://holidayapi.com/v1/holidays';
    private apiKey = 'api_key'; 

    public async esFeriado(fecha: Date): Promise<boolean> {
      const year = fecha.getFullYear();
      const month = fecha.getMonth() + 1;
      const day = fecha.getDate();

      const response = await axios.get(this.apiUrl, {
        params: {
          key: this.apiKey,
          country: 'EC', 
          year,
          month,
          day
        }
      });

      const holidays = response.data.holidays;
      return holidays && holidays.length > 0;
    }
  }
  ```
