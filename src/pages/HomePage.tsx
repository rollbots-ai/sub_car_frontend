import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import FilterBar from '../components/FilterBar';
import { useCarContext } from '../context/CarContext';
import { Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const { filteredCars, loading } = useCarContext();

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

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FFFF00] to-[#CCFF00] pt-24 pb-16 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Drive</h1>
            <p className="text-lg md:text-xl text-gray-800 mb-6">
              Browse our extensive collection of quality vehicles
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section */}
          <FilterBar />
          
          {/* Car Listings */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Available Cars</h2>
              <p className="text-gray-600">{filteredCars.length} cars found</p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFFF00]"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No cars found</h3>
                <p className="text-gray-600">
                  Try adjusting your search filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
