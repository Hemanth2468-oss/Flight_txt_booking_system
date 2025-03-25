
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import RegisterModal from './RegisterModal';
import ConfirmationModal from './ConfirmationModal';

const FlightResults = () => {
  const location = useLocation();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  
  // Sample flight data
  const flights = [
    {
      id: 1,
      airline: 'Fly Elite Airways',
      flightNo: 'FE203',
      departure: { city: 'New York', code: 'JFK', time: '08:30', date: '2023-07-15' },
      arrival: { city: 'London', code: 'LHR', time: '20:45', date: '2023-07-15' },
      duration: '7h 15m',
      price: 499,
      stops: 0
    },
    {
      id: 2,
      airline: 'Global Airlines',
      flightNo: 'GA756',
      departure: { city: 'New York', code: 'JFK', time: '12:15', date: '2023-07-15' },
      arrival: { city: 'London', code: 'LHR', time: '00:30', date: '2023-07-16' },
      duration: '7h 15m',
      price: 452,
      stops: 0
    },
    {
      id: 3,
      airline: 'TransAtlantic',
      flightNo: 'TA489',
      departure: { city: 'New York', code: 'JFK', time: '16:45', date: '2023-07-15' },
      arrival: { city: 'London', code: 'LHR', time: '05:00', date: '2023-07-16' },
      duration: '7h 15m',
      price: 475,
      stops: 1,
      stopInfo: { city: 'Dublin', duration: '1h 30m' }
    }
  ];

  // Handle booking a flight
  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setIsRegisterModalOpen(true);
  };

  // Handle completion of registration
  const handleRegistrationComplete = (userData) => {
    setUserDetails(userData);
    setIsRegisterModalOpen(false);
    setIsConfirmationModalOpen(true);
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
                    <div className="text-2xl font-bold text-primary-600 mb-2">${flight.price}</div>
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
      
      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={() => setIsRegisterModalOpen(false)}
          onComplete={handleRegistrationComplete}
          flight={selectedFlight}
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
