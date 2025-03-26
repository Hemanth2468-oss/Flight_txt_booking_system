import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X, Plane, Tag, CheckSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const checkInSchema = z.object({
  bookingReference: z.string().min(6, { message: "Booking reference must be at least 6 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [checkInResult, setCheckInResult] = useState(null);
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const checkInForm = useForm({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      bookingReference: "",
      lastName: "",
    },
  });

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

    loginForm.reset();
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

    registerForm.reset();
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
            <div className="hidden md:flex space-x-8">
              <Link to="/flights" className="text-gray-700 hover:text-primary-600 transition-colors duration-200">Flights</Link>
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
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 flex items-center space-x-1 transition-colors duration-200">
              <Globe className="w-5 h-5" />
              <span>EN</span>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span>Welcome, </span>
                  <span className="font-medium">{user.firstName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow glow-button"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow glow-button"
                >
                  Register
                </button>
              </>
            )}
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
              <Plane className="ml-2 h-5 w-5 text-primary-600 transform rotate-45 inline-block" />
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
            <Link 
              to="/deals" 
              className="text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Tag className="mr-2 h-5 w-5" />
              Deals & Offers
            </Link>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
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
                    setIsMobileMenuOpen(false);
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
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200 w-full"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setIsMobileMenuOpen(false);
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

      <AlertDialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">Sign In</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your credentials to access your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 py-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="your@email.com"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="******"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AlertDialogFooter className="pt-4">
                <AlertDialogCancel asChild>
                  <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300">Sign In</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
          
          <div className="text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                className="text-primary-600 hover:underline"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                }}
              >
                Register here
              </button>
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">Create Account</AlertDialogTitle>
            <AlertDialogDescription>
              Join Fly Elite to access exclusive deals and faster booking
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                          placeholder="John"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                          placeholder="Doe"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="your@email.com"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="******"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <input 
                        type="password" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="******"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AlertDialogFooter className="pt-4">
                <AlertDialogCancel asChild>
                  <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300">Register</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
          
          <div className="text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                className="text-primary-600 hover:underline"
                onClick={() => {
                  setIsRegisterOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Sign in here
              </button>
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">Online Check-in</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your booking reference and last name to check in for your flight
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {!checkInResult ? (
            <Form {...checkInForm}>
              <form onSubmit={checkInForm.handleSubmit(handleCheckIn)} className="space-y-4 py-4">
                <FormField
                  control={checkInForm.control}
                  name="bookingReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Reference / PNR</FormLabel>
                      <FormControl>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                          placeholder="ABCDEF"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={checkInForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                          placeholder="Doe"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <AlertDialogFooter className="pt-4">
                  <AlertDialogCancel asChild>
                    <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 glow-button">Check In</button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          ) : (
            <div className="py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-700 font-medium">Check-in Successful</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{checkInResult.status}</span>
                </div>
                <h3 className="font-bold text-lg">{checkInResult.passengerName}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium">{checkInResult.flightNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seat</p>
                    <p className="font-medium">{checkInResult.seat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gate</p>
                    <p className="font-medium">{checkInResult.gate}</p>
                  </div>
                </div>
                
                <div className="flex justify-between border-t border-b py-3">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">{checkInResult.departure.city} ({checkInResult.departure.code})</p>
                    <p className="text-sm">{checkInResult.departure.time}</p>
                  </div>
                  <div className="text-center self-center">
                    <Plane className="h-5 w-5 mx-auto text-primary-600 transform rotate-45" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">{checkInResult.arrival.city} ({checkInResult.arrival.code})</p>
                    <p className="text-sm">{checkInResult.arrival.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Boarding Time</p>
                  <p className="font-medium">{checkInResult.boardingTime}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 glow-button"
                  onClick={() => {
                    setCheckInResult(null);
                    setIsCheckInOpen(false);
                    checkInForm.reset();
                  }}
                >
                  Download Boarding Pass
                </button>
              </div>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Navbar;

