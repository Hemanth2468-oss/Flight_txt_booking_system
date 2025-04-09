
import { Link } from 'react-router-dom';
import { Tag, CheckSquare } from 'lucide-react';

interface NavLinksProps {
  setIsCheckInOpen: (value: boolean) => void;
}

const NavLinks = ({ setIsCheckInOpen }: NavLinksProps) => {
  return (
    <div className="hidden md:flex space-x-8">
      <Link to="/flights" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
        Flights
      </Link>
      <Link to="/deals" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center">
        <Tag className="mr-1 h-4 w-4" />
        Deals & Offers
      </Link>
      <button 
        onClick={() => setIsCheckInOpen(true)}
        className="text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center"
      >
        <CheckSquare className="mr-1 h-4 w-4" />
        Check-in
      </button>
    </div>
  );
};

export default NavLinks;
