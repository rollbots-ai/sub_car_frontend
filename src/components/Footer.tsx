import React from 'react';
import { Car, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-[#FFFF00]" />
              <span className="text-xl font-bold">AI Car Search Malaysia</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover your perfect ride with our extensive collection of quality vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FFFF00] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#FFFF00] transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Car Listings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#FFFF00] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Jalan Bukit Bintang, Kuala Lumpur, 50200</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#FFFF00] flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#FFFF00] flex-shrink-0" />
                <span className="text-gray-400">info@AI Car Search.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FFFF00] text-gray-900"
              />
              <button className="bg-[#FFFF00] hover:bg-[#CCFF00] px-4 py-2 rounded-r-md transition-colors text-gray-900">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AI Car Search Malaysia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
