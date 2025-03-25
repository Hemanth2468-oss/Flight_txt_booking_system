
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import RegisterModal from './RegisterModal';
import ConfirmationModal from './ConfirmationModal';
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

const FlightResults = () => {
  const location = useLocation();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  
  // Sample flight data with prices in INR
  const flights = [
    {
      id: 1,
      airline: 'Fly Elite Airways',
      flightNo: 'FE203',
      departure: { city: 'New Delhi', code: 'DEL', time: '08:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '10:45', date: '2023-07-15' },
      duration: '2h 15m',
      price: 6999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 2,
      airline: 'Air India',
      flightNo: 'AI756',
      departure: { city: 'New Delhi', code: 'DEL', time: '12:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '14:30', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 3,
      airline: 'IndiGo',
      flightNo: 'IN489',
      departure: { city: 'New Delhi', code: 'DEL', time: '16:45', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '19:00', date: '2023-07-15' },
      duration: '2h 15m',
      price: 4999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 4,
      airline: 'SpiceJet',
      flightNo: 'SJ324',
      departure: { city: 'New Delhi', code: 'DEL', time: '06:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '08:45', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 5,
      airline: 'Vistara',
      flightNo: 'VS104',
      departure: { city: 'New Delhi', code: 'DEL', time: '14:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '17:00', date: '2023-07-15' },
      duration: '2h 30m',
      price: 7299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 6,
      airline: 'GoAir',
      flightNo: 'GA211',
      departure: { city: 'New Delhi', code: 'DEL', time: '10:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '12:45', date: '2023-07-15' },
      duration: '2h 30m',
      price: 4499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 7,
      airline: 'Air India',
      flightNo: 'AI125',
      departure: { city: 'New Delhi', code: 'DEL', time: '19:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '22:15', date: '2023-07-15' },
      duration: '2h 45m',
      price: 6799,
      stops: 1,
      stopInfo: { city: 'Ahmedabad', duration: '45m' },
      currency: '₹'
    }
  ];

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('flyEliteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle booking a flight
  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    
    // Check if user is logged in
    if (!user) {
      setIsLoginRequired(true);
    } else {
      // If user is logged in, pre-fill the registration form
      setUserDetails({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        passport: '',
        birthDate: ''
      });
      setIsRegisterModalOpen(true);
    }
  };

  // Handle completion of registration
  const handleRegistrationComplete = (userData) => {
    setUserDetails(userData);
    setIsRegisterModalOpen(false);
    setIsConfirmationModalOpen(true);
    
    // Store user data in localStorage if not already stored
    if (!user) {
      const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      };
      localStorage.setItem('flyEliteUser', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  // Handle login requirement
  const handleLoginContinue = () => {
    setIsLoginRequired(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Flight Search Results</h1>
      
      {flights.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-sm">
          <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No flights found</h2>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-6">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="text-lg font-bold mb-1">{flight.airline}</div>
                    <div className="text-sm text-gray-600">Flight {flight.flightNo}</div>
                  </div>
                  
                  <div className="flex-1 md:ml-8 md:mr-8">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.departure.time}</div>
                        <div className="text-sm font-medium">{flight.departure.code}</div>
                        <div className="text-xs text-gray-600">{flight.departure.city}</div>
                      </div>
                      
                      <div className="flex-1 mx-4">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                          <div className="w-full flex items-center">
                            <div className="h-[2px] flex-1 bg-gray-300"></div>
                            <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                            <div className="h-[2px] flex-1 bg-gray-300"></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {flight.stops === 0 ? 'Nonstop' : 
                              `${flight.stops} stop in ${flight.stopInfo.city} (${flight.stopInfo.duration})`}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.arrival.time}</div>
                        <div className="text-sm font-medium">{flight.arrival.code}</div>
                        <div className="text-xs text-gray-600">{flight.arrival.city}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-primary-600 mb-2">{flight.currency}{flight.price}</div>
                    <button 
                      onClick={() => handleBookFlight(flight)}
                      className="px-6 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Login Required Dialog */}
      <AlertDialog open={isLoginRequired} onOpenChange={setIsLoginRequired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign in to continue with your flight booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button 
                onClick={handleLoginContinue}
                className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300"
              >
                Continue as Guest
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={() => setIsRegisterModalOpen(false)}
          onComplete={handleRegistrationComplete}
          flight={selectedFlight}
          initialData={userDetails}
        />
      )}
      
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onClose={() => setIsConfirmationModalOpen(false)}
          flight={selectedFlight}
          user={userDetails}
        />
      )}
    </div>
  );
};

export default FlightResults;
