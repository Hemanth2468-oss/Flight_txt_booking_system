
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, SendIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
            <h3 className="text-xl font-bold mb-6">About Us</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Company
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Flight Insurance
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Group Booking
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-900"
              />
              <button className="px-4 py-3 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors duration-200 flex items-center">
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 Fly Elite. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
