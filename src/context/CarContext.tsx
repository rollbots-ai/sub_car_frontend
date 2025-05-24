import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car, carService } from '../services/carService';

// Define the context shape
interface CarContextType {
  cars: Car[];
  filteredCars: Car[];
  loading: boolean;
  makes: string[];
  yearRange: { min: number; max: number };
  priceRange: { min: number; max: number };
  filters: {
    make: string;
    minYear: number;
    maxYear: number;
    minPrice: number;
    maxPrice: number;
    searchQuery: string;
  };
  updateFilter: (
    filterType: 'make' | 'minYear' | 'maxYear' | 'minPrice' | 'maxPrice' | 'searchQuery',
    value: string | number
  ) => void;
  resetFilters: () => void;
}

// Create the context
const CarContext = createContext<CarContextType | undefined>(undefined);

// Context provider component
export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [makes, setMakes] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState({ min: 2000, max: 2023 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [filters, setFilters] = useState({
    make: '',
    minYear: 2000,
    maxYear: 2023,
    minPrice: 0,
    maxPrice: 100000,
    searchQuery: ''
  });

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allCars = await carService.getAllCars();
        const uniqueMakes = await carService.getUniqueMakes();
        const yearRangeData = await carService.getYearRange();
        const priceRangeData = await carService.getPriceRange();

        setCars(allCars);
        setFilteredCars(allCars);
        setMakes(uniqueMakes);
        setYearRange(yearRangeData);
        setPriceRange(priceRangeData);

        // Update filters with actual data ranges
        setFilters(prev => ({
          ...prev,
          minYear: yearRangeData.min,
          maxYear: yearRangeData.max,
          minPrice: priceRangeData.min,
          maxPrice: priceRangeData.max
        }));
      } catch (error) {
        console.error('Failed to fetch car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever filters or cars change
  useEffect(() => {
    if (cars.length === 0) return;

    const result = cars.filter(car => {
      // Filter by make
      if (filters.make && car.make !== filters.make) return false;

      // Filter by year range
      if (car.year < filters.minYear || car.year > filters.maxYear) return false;

      // Filter by price range
      if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query) ||
          car.fuelType.toLowerCase().includes(query) ||
          car.transmission.toLowerCase().includes(query) ||
          car.color.toLowerCase().includes(query) ||
          car.features.some(feature => feature.toLowerCase().includes(query))
        );
      }

      return true;
    });

    setFilteredCars(result);
  }, [filters, cars]);

  // Update a specific filter
  const updateFilter = (
    filterType: 'make' | 'minYear' | 'maxYear' | 'minPrice' | 'maxPrice' | 'searchQuery',
    value: string | number
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      make: '',
      minYear: yearRange.min,
      maxYear: yearRange.max,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      searchQuery: ''
    });
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        filteredCars,
        loading,
        makes,
        yearRange,
        priceRange,
        filters,
        updateFilter,
        resetFilters
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// Custom hook to use the car context
export const useCarContext = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};
