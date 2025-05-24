import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car, carService } from '../services/carService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, Check, Fuel, MessageSquare, Palette, PhoneCall, Settings, Share2, Tag } from 'lucide-react';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('Car ID is required');
        }
        
        const fetchedCar = await carService.getCarById(parseInt(id));
        
        if (!fetchedCar) {
          throw new Error('Car not found');
        }
        
        setCar(fetchedCar);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Add Google font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFFF00]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700 mb-4">{error || 'Car not found'}</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Listings
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />
      
      <main className="flex-grow pt-16 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-[#CCFF00] hover:text-[#99CC00] font-medium"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Listings
            </Link>
          </div>
          
          {/* Car details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Car image */}
            <div className="h-72 md:h-96 overflow-hidden">
              <img 
                src={car.imageUrl} 
                alt={`${car.make} ${car.model}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center bg-[#FFFFCC] text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Calendar size={14} className="mr-1" /> {car.year}
                    </span>
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Fuel size={14} className="mr-1" /> {car.fuelType}
                    </span>
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Settings size={14} className="mr-1" /> {car.transmission}
                    </span>
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Tag size={14} className="mr-1" /> {car.mileage.toLocaleString()} mi
                    </span>
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Palette size={14} className="mr-1" /> {car.color}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(car.price)}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>
              
              {/* Features */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center bg-[#FFFF00] hover:bg-[#CCFF00] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors">
                    <PhoneCall size={18} className="mr-2" />
                    Call Dealer
                  </button>
                  <button className="flex items-center justify-center bg-[#CCFF00] hover:bg-[#99CC00] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors">
                    <MessageSquare size={18} className="mr-2" />
                    Message Dealer
                  </button>
                  <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetailPage;
