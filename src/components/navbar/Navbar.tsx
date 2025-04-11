
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, X, PlaneTakeoff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import EliteChip from '../EliteChip';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is Elite member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  
  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('flyEliteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Change navbar background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isHomePage = location.pathname === '/';
  
  // Handle login function
  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoginOpen(false);
  };
  
  // Handle register function
  const handleRegister = (userData: any) => {
    setUser(userData);
    setIsRegisterOpen(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('flyEliteUser');
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  // Navigation handlers
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-sm' : isEliteMember ? 'bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] text-white' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <PlaneTakeoff className={`h-6 w-6 mr-2 ${isEliteMember ? 'text-[#FFD700]' : 'text-primary-600'}`} />
            <span className={`text-xl font-bold ${isEliteMember ? 'font-serif text-[#FFD700]' : 'text-primary-600'}`}>
              FlyElite
            </span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isHomePage && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/')}
                  >
                    Home
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === '/flights' && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/flights')}
                  >
                    Flights
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === '/deals' && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/deals')}
                  >
                    Deals
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === '/private-jets' && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/private-jets')}
                  >
                    Private Jets
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === '/about' && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/about')}
                  >
                    About Us
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      location.pathname === '/contact' && "bg-accent/50 text-accent-foreground"
                    )}
                    onClick={() => handleNavigation('/contact')}
                  >
                    Contact
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem className="ml-2">
                  <EliteChip />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <UserMenu 
              user={user} 
              handleLogout={handleLogout} 
              setIsLoginOpen={setIsLoginOpen} 
              setIsRegisterOpen={setIsRegisterOpen} 
            />
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${isEliteMember && !isScrolled && isHomePage ? 'text-white' : 'text-gray-700'}`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu 
          onClose={() => setMobileMenuOpen(false)} 
        />
      )}
      
      {/* Login Dialog */}
      {isLoginOpen && (
        <LoginDialog 
          isOpen={isLoginOpen} 
          setIsOpen={setIsLoginOpen} 
          setIsRegisterOpen={setIsRegisterOpen} 
          handleLogin={handleLogin} 
        />
      )}
      
      {/* Register Dialog */}
      {isRegisterOpen && (
        <RegisterDialog 
          isOpen={isRegisterOpen} 
          setIsOpen={setIsRegisterOpen} 
          setIsLoginOpen={setIsLoginOpen} 
          handleRegister={handleRegister} 
        />
      )}
    </header>
  );
};

export default Navbar;
