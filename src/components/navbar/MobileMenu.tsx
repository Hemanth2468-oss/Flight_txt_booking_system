
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
  
  // Check if user is Elite member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  
  // Mock functions for the dialog components
  const handleLogin = (data: any) => {
    console.log('Login data:', data);
    setLoginOpen(false);
  };
  
  const handleRegister = (data: any) => {
    console.log('Register data:', data);
    setRegisterOpen(false);
  };
  
  const handleCheckIn = (data: any) => {
    console.log('Check-in data:', data);
    // Normally we would process the check-in data here
  };
  
  return (
    <div className={`fixed inset-0 z-50 ${isEliteMember ? 'bg-gradient-to-br from-[#1A1F2C] to-[#6E59A5] text-white' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" onClick={onClose} className="flex items-center">
            <PlaneTakeoff className={`h-6 w-6 mr-2 ${isEliteMember ? 'text-[#FFD700]' : 'text-primary-600'}`} />
            <span className={`text-xl font-bold ${isEliteMember ? 'font-serif text-[#FFD700]' : 'text-primary-600'}`}>
              FlyElite
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={isEliteMember ? 'text-white hover:bg-white/10' : 'text-gray-700'}
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
                className={`block py-2 ${isEliteMember ? 'text-white hover:text-[#FFD700]' : 'text-gray-800 hover:text-primary-600'} transition-colors`}
              >
                Home
              </Link>
            </li>
            <li>
              <button 
                className={`flex items-center justify-between w-full py-2 ${isEliteMember ? 'text-white hover:text-[#FFD700]' : 'text-gray-800 hover:text-primary-600'} transition-colors`}
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
                <ul className={`pl-4 mt-2 space-y-2 ${isEliteMember ? 'border-l border-white/30' : 'border-l border-gray-200'}`}>
                  <li>
                    <Link
                      to="/flights"
                      onClick={onClose}
                      className={`block py-2 ${isEliteMember ? 'text-white/80 hover:text-[#FFD700]' : 'text-gray-700 hover:text-primary-600'} transition-colors`}
                    >
                      Book Flights
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/private-jets"
                      onClick={onClose}
                      className={`block py-2 ${isEliteMember ? 'text-white/80 hover:text-[#FFD700]' : 'text-gray-700 hover:text-primary-600'} transition-colors flex items-center gap-2`}
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
                className={`block py-2 ${isEliteMember ? 'text-white hover:text-[#FFD700]' : 'text-gray-800 hover:text-primary-600'} transition-colors`}
              >
                Deals
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  // Handle elite chip navigation
                  onClose();
                  // Open Elite Chip modal or navigate
                }}
                className={`flex items-center gap-2 py-2 ${isEliteMember ? 'text-white hover:text-[#FFD700]' : 'text-gray-800 hover:text-primary-600'} transition-colors`}
              >
                <Shield className="h-4 w-4" />
                Elite Chip
              </Link>
            </li>
          </ul>
          
          <div className={`space-y-3 pt-4 ${isEliteMember ? 'border-t border-white/20' : 'border-t border-gray-200'}`}>
            <Button
              variant={isEliteMember ? "outline" : "outline"}
              className={`w-full justify-start ${isEliteMember ? 'border-white/50 text-white hover:bg-white/10' : ''}`}
              onClick={() => {
                setLoginOpen(true);
              }}
            >
              Log In
            </Button>
            <Button
              className={`w-full justify-start ${isEliteMember ? 'bg-[#FFD700] text-[#1A1F2C] hover:bg-[#e6c200]' : ''}`}
              onClick={() => {
                setRegisterOpen(true);
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isEliteMember ? 'text-white hover:bg-white/10' : ''}`}
              onClick={() => {
                setCheckInOpen(true);
              }}
            >
              Check-in
            </Button>
          </div>
        </nav>
      </div>
      
      {loginOpen && (
        <LoginDialog 
          isOpen={loginOpen} 
          setIsOpen={setLoginOpen} 
          setIsRegisterOpen={setRegisterOpen} 
          handleLogin={handleLogin} 
        />
      )}
      
      {registerOpen && (
        <RegisterDialog 
          isOpen={registerOpen} 
          setIsOpen={setRegisterOpen} 
          setIsLoginOpen={setLoginOpen} 
          handleRegister={handleRegister} 
        />
      )}
      
      {checkInOpen && (
        <CheckInDialog 
          isOpen={checkInOpen} 
          setIsOpen={setCheckInOpen} 
          checkInResult={null} 
          setCheckInResult={() => {}} 
          handleCheckIn={handleCheckIn} 
        />
      )}
    </div>
  );
};

export default MobileMenu;
