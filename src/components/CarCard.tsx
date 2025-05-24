import React from 'react';
import { Link } from 'react-router-dom';
import { Car as CarType } from '../services/carService';
import { Calendar, Fuel, Settings, Tag } from 'lucide-react';

interface CarCardProps {
  car: CarType;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-[#FFFF00] text-gray-900 px-3 py-1 rounded-bl-lg font-medium">
          {formatPrice(car.price)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {car.year} {car.make} {car.model}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-1" />
            <span className="text-sm">{car.year}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Fuel size={16} className="mr-1" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Settings size={16} className="mr-1" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Tag size={16} className="mr-1" />
            <span className="text-sm">{car.mileage.toLocaleString()} mi</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>
        
        <Link 
          to={`/car/${car.id}`}
          className="block w-full bg-[#FFFF00] hover:bg-[#CCFF00] text-gray-900 text-center py-2 rounded-md transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
