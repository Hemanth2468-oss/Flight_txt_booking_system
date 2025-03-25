
import { useState, useRef, useEffect } from 'react';
import { X, Plus, PlaneIcon, PlaneLanding, Calendar } from 'lucide-react';

interface Flight {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
}

interface AirportOption {
  code: string;
  city: string;
  country: string;
}

interface MultiCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (flights: Flight[]) => void;
}

// Sample airports data
const airports: AirportOption[] = [
  { code: 'JFK', city: 'New York', country: 'United States' },
  { code: 'LHR', city: 'London', country: 'United Kingdom' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'HND', city: 'Tokyo', country: 'Japan' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'DEL', city: 'New Delhi', country: 'India' },
  { code: 'BOM', city: 'Mumbai', country: 'India' },
  { code: 'MAA', city: 'Chennai', country: 'India' },
  { code: 'BLR', city: 'Bengaluru', country: 'India' },
  { code: 'HYD', city: 'Hyderabad', country: 'India' },
  { code: 'CCU', city: 'Kolkata', country: 'India' },
  { code: 'COK', city: 'Kochi', country: 'India' },
  { code: 'PNQ', city: 'Pune', country: 'India' },
];

const MultiCityModal = ({ isOpen, onClose, onSearch }: MultiCityModalProps) => {
  const [flights, setFlights] = useState<Flight[]>([
    { from: '', fromCode: '', to: '', toCode: '', date: new Date().toISOString().split('T')[0] }
  ]);
  const [error, setError] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Reset state when modal is opened
    setFlights([
      { from: '', fromCode: '', to: '', toCode: '', date: new Date().toISOString().split('T')[0] }
    ]);
    setError('');
    
    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (index: number, field: keyof Flight, value: string) => {
    const updatedFlights = [...flights];
    updatedFlights[index] = { ...updatedFlights[index], [field]: value };
    setFlights(updatedFlights);
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleAddFlight = () => {
    // Get tomorrow's date for the new flight
    const nextDay = new Date(flights[flights.length - 1].date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    setFlights([
      ...flights,
      { from: '', fromCode: '', to: '', toCode: '', date: nextDay.toISOString().split('T')[0] }
    ]);
  };

  const handleRemoveFlight = (index: number) => {
    if (flights.length <= 1) return;
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights);
  };

  const handleSearch = () => {
    // Validate all flights have required fields
    const isValid = flights.every(flight => 
      flight.from && flight.fromCode && flight.to && flight.toCode && flight.date
    );
    
    if (!isValid) {
      setError('Please fill in all flight details');
      return;
    }
    
    onSearch(flights);
    onClose();
  };

  const handleAirportSelect = (index: number, field: 'from' | 'to', airport: AirportOption) => {
    const updatedFlights = [...flights];
    updatedFlights[index] = { 
      ...updatedFlights[index], 
      [field]: `${airport.city} (${airport.code})`,
      [`${field}Code`]: airport.code
    };
    setFlights(updatedFlights);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-apple m-4 animate-scale-in"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Multi-City Flight Search</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            {flights.map((flight, index) => (
              <div 
                key={index} 
                className="flight-leg p-4 bg-gray-50 rounded-lg border border-gray-100 animate-fade-in"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Flight {index + 1}</h4>
                  {flights.length > 1 && (
                    <button 
                      onClick={() => handleRemoveFlight(index)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                        placeholder="City or Airport"
                        value={flight.from}
                        onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                      />
                      <PlaneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      
                      {flight.from && flight.from.length > 1 && !flight.fromCode && (
                        <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto animate-fade-in">
                          {airports
                            .filter(airport => 
                              airport.city.toLowerCase().includes(flight.from.toLowerCase()) || 
                              airport.code.toLowerCase().includes(flight.from.toLowerCase())
                            )
                            .map((airport) => (
                              <div 
                                key={airport.code}
                                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                                onClick={() => handleAirportSelect(index, 'from', airport)}
                              >
                                <div className="font-medium text-gray-800">{airport.city} ({airport.code})</div>
                                <div className="text-sm text-gray-500">{airport.country}</div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                        placeholder="City or Airport"
                        value={flight.to}
                        onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                      />
                      <PlaneLanding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      
                      {flight.to && flight.to.length > 1 && !flight.toCode && (
                        <div className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto animate-fade-in">
                          {airports
                            .filter(airport => 
                              airport.city.toLowerCase().includes(flight.to.toLowerCase()) || 
                              airport.code.toLowerCase().includes(flight.to.toLowerCase())
                            )
                            .map((airport) => (
                              <div 
                                key={airport.code}
                                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                                onClick={() => handleAirportSelect(index, 'to', airport)}
                              >
                                <div className="font-medium text-gray-800">{airport.city} ({airport.code})</div>
                                <div className="text-sm text-gray-500">{airport.country}</div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                      value={flight.date}
                      onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
            
            {error && (
              <div className="text-red-500 text-sm mt-2 animate-fade-in">
                {error}
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={handleAddFlight}
                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-button flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Flight</span>
              </button>
              
              <button 
                onClick={handleSearch}
                className="px-6 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow"
              >
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCityModal;
