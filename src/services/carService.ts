import axios from 'axios';
import carsData from '../data/cars.json';

// Define the Car interface
export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  features: string[];
  imageUrl: string;
}

// In a real application, these would be API calls
export const carService = {
  // Get all cars
  getAllCars: async (): Promise<Car[]> => {
    // Simulating API call with local data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(carsData as Car[]);
      }, 300); // Simulating network delay
    });
  },

  // Get a specific car by ID
  getCarById: async (id: number): Promise<Car | undefined> => {
    // Simulating API call with local data
    return new Promise((resolve) => {
      setTimeout(() => {
        const car = (carsData as Car[]).find(car => car.id === id);
        resolve(car);
      }, 200); // Simulating network delay
    });
  },

  // Get unique makes for filtering
  getUniqueMakes: async (): Promise<string[]> => {
    const cars = carsData as Car[];
    const uniqueMakes = [...new Set(cars.map(car => car.make))];
    return Promise.resolve(uniqueMakes);
  },

  // Get min and max year range
  getYearRange: async (): Promise<{min: number, max: number}> => {
    const cars = carsData as Car[];
    const years = cars.map(car => car.year);
    return Promise.resolve({
      min: Math.min(...years),
      max: Math.max(...years)
    });
  },

  // Get price range (converted to MYR, approximate conversion rate: 1 USD = 4.5 MYR)
  getPriceRange: async (): Promise<{min: number, max: number}> => {
    const cars = carsData as Car[];
    const prices = cars.map(car => car.price * 4.5); // Convert to MYR
    return Promise.resolve({
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  }
};
