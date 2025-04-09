
import { Link } from 'react-router-dom';
import { Globe, X, Tag, CheckSquare, Plane } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: any;
  handleLogout: () => void;
  setIsLoginOpen: (value: boolean) => void;
  setIsRegisterOpen: (value: boolean) => void;
  setIsCheckInOpen: (value: boolean) => void;
}

const MobileMenu = ({ 
  isOpen, 
  setIsOpen, 
  user, 
  handleLogout, 
  setIsLoginOpen, 
  setIsRegisterOpen,
  setIsCheckInOpen 
}: MobileMenuProps) => {
  return (
    <div 
      className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      <div className="flex flex-col p-8 h-full">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/"
            className="text-2xl font-pacifico text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            Fly Elite
            <Plane className="ml-2 h-5 w-5 text-primary-600 transform rotate-45 inline-block" />
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6 mb-8">
          <Link 
            to="/flights" 
            className="text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Flights
          </Link>
          <Link 
            to="/deals" 
            className="text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Tag className="mr-2 h-5 w-5" />
            Deals & Offers
          </Link>
          <button 
            onClick={() => {
              setIsOpen(false);
              setIsCheckInOpen(true);
            }}
            className="text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center"
          >
            <CheckSquare className="mr-2 h-5 w-5" />
            Check-in
          </button>
        </div>
        
        <div className="flex flex-col space-y-4 mt-auto">
          {user ? (
            <>
              <div className="text-sm text-gray-700 mb-2">
                <span>Welcome, </span>
                <span className="font-medium">{user.firstName}</span>
              </div>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-3 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 w-full shadow-sm hover:shadow glow-button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200 w-full"
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  setIsRegisterOpen(true);
                  setIsOpen(false);
                }}
                className="px-4 py-3 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 w-full shadow-sm hover:shadow glow-button"
              >
                Register
              </button>
            </>
          )}
          <button className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-button transition-colors duration-200 w-full mt-4">
            <Globe className="w-5 h-5" />
            <span>English</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
