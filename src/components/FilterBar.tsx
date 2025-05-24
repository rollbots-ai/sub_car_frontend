import React, { useState } from 'react';
import { useCarContext } from '../context/CarContext';
import { Filter, Search, X } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { 
    makes, 
    yearRange, 
    priceRange, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useCarContext();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('searchQuery', e.target.value);
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter('make', e.target.value);
  };

  const handleYearMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilter('minYear', value);
  };

  const handleYearMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilter('maxYear', value);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilter('minPrice', value);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilter('maxPrice', value);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by make, model, features..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFFF00]"
          value={filters.searchQuery}
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isFilterOpen ? (
            <>
              <X size={18} /> Hide Filters
            </>
          ) : (
            <>
              <Filter size={18} /> Show Filters
            </>
          )}
        </button>
      </div>

      {/* Filter Options */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isFilterOpen || 'hidden md:grid'}`}>
        {/* Make Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFFF00]"
            value={filters.make}
            onChange={handleMakeChange}
          >
            <option value="">All Makes</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min={yearRange.min}
              max={yearRange.max}
              value={filters.minYear}
              onChange={handleYearMinChange}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={yearRange.min}
              max={yearRange.max}
              value={filters.maxYear}
              onChange={handleYearMaxChange}
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={1000}
              value={filters.minPrice}
              onChange={handlePriceMinChange}
              className="w-full"
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={1000}
              value={filters.maxPrice}
              onChange={handlePriceMaxChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
