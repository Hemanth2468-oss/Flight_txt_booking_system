
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-8">
            <Link 
              to="/"
              className="text-2xl font-pacifico text-primary-600 transition-transform duration-300 transform hover:scale-105"
            >
              Fly Elite
              <span className="ml-1">✈️</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/flights" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">Flights</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 flex items-center space-x-1 transition-colors duration-200">
              <Globe className="w-5 h-5" />
              <span>EN</span>
            </button>
            <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200">
              Sign In
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow">
              Register
            </button>
          </div>
          
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col p-8 h-full">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/"
              className="text-2xl font-pacifico text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fly Elite
              <span className="ml-1">✈️</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6 mb-8">
            <Link 
              to="/flights" 
              className="text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Flights
            </Link>
          </div>
          
          <div className="flex flex-col space-y-4 mt-auto">
            <button className="px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200 w-full">
              Sign In
            </button>
            <button className="px-4 py-3 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 w-full shadow-sm hover:shadow">
              Register
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-button transition-colors duration-200 w-full mt-4">
              <Globe className="w-5 h-5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
