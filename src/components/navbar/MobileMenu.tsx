
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, PlaneTakeoff, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import CheckInDialog from './CheckInDialog';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [showFlights, setShowFlights] = useState(false);
  
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" onClick={onClose} className="text-xl font-bold text-primary-600">
            FlyElite
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="space-y-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="block py-2 text-gray-800 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <button 
                className="flex items-center justify-between w-full py-2 text-gray-800 hover:text-primary-600 transition-colors"
                onClick={() => setShowFlights(!showFlights)}
              >
                <span>Flights</span>
                {showFlights ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {showFlights && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-gray-200">
                  <li>
                    <Link
                      to="/flights"
                      onClick={onClose}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      Book Flights
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/private-jets"
                      onClick={onClose}
                      className="block py-2 text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-2"
                    >
                      <PlaneTakeoff className="h-4 w-4" />
                      Private Jets
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/deals"
                onClick={onClose}
                className="block py-2 text-gray-800 hover:text-primary-600 transition-colors"
              >
                Deals
              </Link>
            </li>
            <li>
              <button 
                className="flex items-center gap-2 py-2 text-gray-800 hover:text-primary-600 transition-colors"
                onClick={() => {
                  onClose();
                  // Open Elite Chip modal - would need to refactor EliteChip component to accept an open prop
                }}
              >
                <Shield className="h-4 w-4" />
                Elite Chip
              </button>
            </li>
          </ul>
          
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setLoginOpen(true);
              }}
            >
              Log In
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => {
                setRegisterOpen(true);
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setCheckInOpen(true);
              }}
            >
              Check-in
            </Button>
          </div>
        </nav>
      </div>
      
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
      <CheckInDialog open={checkInOpen} onOpenChange={setCheckInOpen} />
    </div>
  );
};

export default MobileMenu;
