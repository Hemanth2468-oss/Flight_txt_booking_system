
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X, Plane } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import CheckInDialog from './CheckInDialog';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [checkInResult, setCheckInResult] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('flyEliteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (data) => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.email.split('@')[0],
      lastName: '',
    };
    
    localStorage.setItem('flyEliteUser', JSON.stringify(userData));
    setUser(userData);
    setIsLoginOpen(false);
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${userData.firstName}!`,
    });
  };

  const handleRegister = (data) => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    
    localStorage.setItem('flyEliteUser', JSON.stringify(userData));
    setUser(userData);
    setIsRegisterOpen(false);
    
    toast({
      title: "Registration successful",
      description: `Welcome to Fly Elite, ${data.firstName}!`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('flyEliteUser');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleCheckIn = (data) => {
    const mockFlightData = {
      passengerName: `${data.lastName}, John`,
      flightNo: 'FE203',
      departure: { city: 'New Delhi', code: 'DEL', time: '08:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '10:45', date: '2023-07-15' },
      gate: 'B12',
      seat: '14A',
      boardingTime: '08:00',
      status: 'On Time'
    };
    
    setCheckInResult(mockFlightData);
    
    toast({
      title: "Check-in successful",
      description: `Boarding pass ready for ${mockFlightData.passengerName}`,
    });
  };

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
              className="text-2xl font-pacifico text-primary-600 transition-transform duration-300 transform hover:scale-105 flex items-center"
            >
              Fly Elite
              <Plane className="ml-2 h-5 w-5 text-primary-600 transform rotate-45" />
            </Link>
            <NavLinks setIsCheckInOpen={setIsCheckInOpen} />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 flex items-center space-x-1 transition-colors duration-200">
              <Globe className="w-5 h-5" />
              <span>EN</span>
            </button>
            
            <UserMenu 
              user={user} 
              handleLogout={handleLogout}
              setIsLoginOpen={setIsLoginOpen}
              setIsRegisterOpen={setIsRegisterOpen}
            />
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
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        user={user}
        handleLogout={handleLogout}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        setIsCheckInOpen={setIsCheckInOpen}
      />

      <LoginDialog 
        isOpen={isLoginOpen} 
        setIsOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        handleLogin={handleLogin}
      />

      <RegisterDialog 
        isOpen={isRegisterOpen} 
        setIsOpen={setIsRegisterOpen}
        setIsLoginOpen={setIsLoginOpen}
        handleRegister={handleRegister}
      />

      <CheckInDialog 
        isOpen={isCheckInOpen} 
        setIsOpen={setIsCheckInOpen}
        checkInResult={checkInResult}
        setCheckInResult={setCheckInResult}
        handleCheckIn={handleCheckIn}
      />
    </header>
  );
};

export default Navbar;
