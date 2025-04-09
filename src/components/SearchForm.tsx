
import { useState, useRef, useEffect } from 'react';
import { PlaneIcon, PlaneLanding, Calendar, ArrowLeftRight } from 'lucide-react';
import PassengerSelector from './PassengerSelector';
import { useToast } from "@/hooks/use-toast";

interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

interface AirportOption {
  code: string;
  city: string;
  country: string;
  international?: boolean;
}

interface SearchFormProps {
  onSearch: () => void;
}

// Sample airports data with international options
const airports: AirportOption[] = [
  // Domestic Indian airports
  { code: 'DEL', city: 'New Delhi', country: 'India' },
  { code: 'BOM', city: 'Mumbai', country: 'India' },
  { code: 'MAA', city: 'Chennai', country: 'India' },
  { code: 'BLR', city: 'Bengaluru', country: 'India' },
  { code: 'HYD', city: 'Hyderabad', country: 'India' },
  { code: 'CCU', city: 'Kolkata', country: 'India' },
  { code: 'COK', city: 'Kochi', country: 'India' },
  { code: 'PNQ', city: 'Pune', country: 'India' },
  
  // International airports
  { code: 'JFK', city: 'New York', country: 'United States', international: true },
  { code: 'LHR', city: 'London', country: 'United Kingdom', international: true },
  { code: 'CDG', city: 'Paris', country: 'France', international: true },
  { code: 'HND', city: 'Tokyo', country: 'Japan', international: true },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', international: true },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', international: true },
  { code: 'SYD', city: 'Sydney', country: 'Australia', international: true },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', international: true },
  { code: 'HKG', city: 'Hong Kong', country: 'China', international: true },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', international: true },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', international: true },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', international: true },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', international: true },
];

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay' | 'multiCity'>('roundTrip');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [fromCode, setFromCode] = useState<string>('');
  const [toCode, setToCode] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [passengers, setPassengers] = useState<Passengers>({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState<string>('economy');
  const [fromSuggestions, setFromSuggestions] = useState<AirportOption[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AirportOption[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState<boolean>(false);
  const [showToSuggestions, setShowToSuggestions] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  
  const { toast } = useToast();
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set min date for departure and return inputs
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (!departureDate) {
      const formattedToday = today.toISOString().split('T')[0];
      setDepartureDate(formattedToday);
    }
    
    if (!returnDate && tripType === 'roundTrip') {
      const formattedTomorrow = tomorrow.toISOString().split('T')[0];
      setReturnDate(formattedTomorrow);
    }
  }, [tripType, departureDate, returnDate]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (fromSuggestionsRef.current && !fromSuggestionsRef.current.contains(event.target as Node) && 
          fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      
      if (toSuggestionsRef.current && !toSuggestionsRef.current.contains(event.target as Node) && 
          toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFrom(value);
    setFromCode('');
    setValidationError('');
    
    if (value.length > 1) {
      const filteredAirports = airports.filter(airport => 
        airport.city.toLowerCase().includes(value.toLowerCase()) || 
        airport.code.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(filteredAirports);
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTo(value);
    setToCode('');
    setValidationError('');
    
    if (value.length > 1) {
      const filteredAirports = airports.filter(airport => 
        airport.city.toLowerCase().includes(value.toLowerCase()) || 
        airport.code.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(filteredAirports);
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const selectFromAirport = (airport: AirportOption) => {
    setFrom(`${airport.city} (${airport.code})`);
    setFromCode(airport.code);
    setShowFromSuggestions(false);
  };

  const selectToAirport = (airport: AirportOption) => {
    setTo(`${airport.city} (${airport.code})`);
    setToCode(airport.code);
    setShowToSuggestions(false);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
    setFromCode(toCode);
    setToCode(fromCode);
    
    // Add animation classes
    if (fromInputRef.current) fromInputRef.current.classList.add('animate-pulse-slow');
    if (toInputRef.current) toInputRef.current.classList.add('animate-pulse-slow');
    
    // Remove animation classes after animation completes
    setTimeout(() => {
      if (fromInputRef.current) fromInputRef.current.classList.remove('animate-pulse-slow');
      if (toInputRef.current) toInputRef.current.classList.remove('animate-pulse-slow');
    }, 1000);
  };

  const handlePassengerChange = (newPassengers: Passengers, newCabinClass: string) => {
    setPassengers(newPassengers);
    setCabinClass(newCabinClass);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all required fields are filled
    if (!fromCode || !toCode) {
      setValidationError('Please select departure and destination airports');
      toast({
        title: "Input Error",
        description: "Please select both departure and destination airports",
        variant: "destructive"
      });
      return;
    }
    
    if (!departureDate || (tripType === 'roundTrip' && !returnDate)) {
      setValidationError('Please select all required dates');
      toast({
        title: "Input Error",
        description: "Please select all required travel dates",
        variant: "destructive"
      });
      return;
    }
    
    if (fromCode === toCode) {
      setValidationError('Departure and destination cannot be the same');
      toast({
        title: "Input Error",
        description: "Departure and destination cannot be the same",
        variant: "destructive"
      });
      return;
    }
    
    // Prepare search data and store in localStorage for the flights page
    const searchData = {
      tripType,
      from: { code: fromCode, display: from },
      to: { code: toCode, display: to },
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : undefined,
      passengers,
      cabinClass,
    };
    
    // Store search data in localStorage to be used on flights page
    localStorage.setItem('flyEliteSearchData', JSON.stringify(searchData));
    console.log('Search data:', searchData);
    
    // Call the onSearch prop to navigate to the flights page
    onSearch();
  };

  const isReturnVisible = tripType === 'roundTrip';

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-apple p-8 animate-scale-in">
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            tripType === 'roundTrip' 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('roundTrip')}
        >
          Round Trip
        </button>
        <button 
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            tripType === 'oneWay' 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => {
            setTripType('oneWay');
            setReturnDate('');
          }}
        >
          One Way
        </button>
        <button 
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            tripType === 'multiCity' 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setTripType('multiCity')}
        >
          Multi-City
        </button>
      </div>

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {validationError}
        </div>
      )}

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <input
                id="from"
                ref={fromInputRef}
                type="text"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                placeholder="City or Airport"
                value={from}
                onChange={handleFromChange}
                onFocus={() => setShowFromSuggestions(true)}
              />
              <PlaneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <div 
                ref={fromSuggestionsRef}
                className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto animate-fade-in"
              >
                {fromSuggestions.map((airport) => (
                  <div 
                    key={airport.code}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => selectFromAirport(airport)}
                  >
                    <div className="font-medium text-gray-800">{airport.city} ({airport.code})</div>
                    <div className="text-sm text-gray-500">{airport.country}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <input
                id="to"
                ref={toInputRef}
                type="text"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                placeholder="City or Airport"
                value={to}
                onChange={handleToChange}
                onFocus={() => setShowToSuggestions(true)}
              />
              <PlaneLanding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            {showToSuggestions && toSuggestions.length > 0 && (
              <div 
                ref={toSuggestionsRef}
                className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto animate-fade-in"
              >
                {toSuggestions.map((airport) => (
                  <div 
                    key={airport.code}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => selectToAirport(airport)}
                  >
                    <div className="font-medium text-gray-800">{airport.city} ({airport.code})</div>
                    <div className="text-sm text-gray-500">{airport.country}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            type="button" 
            className="absolute left-1/2 top-1/3 transform -translate-x-1/2 md:translate-y-6 w-10 h-10 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow hover:border-primary-300 transition-all duration-300 z-10 hidden md:flex"
            onClick={swapLocations}
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
            <div className="relative">
              <input
                id="departure"
                type="date"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                value={departureDate}
                onChange={(e) => {
                  setDepartureDate(e.target.value);
                  setValidationError('');
                }}
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          <div className={`transition-opacity duration-300 ${isReturnVisible ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
            <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">Return</label>
            <div className="relative">
              <input
                id="return"
                type="date"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-300"
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setValidationError('');
                }}
                min={departureDate}
                disabled={!isReturnVisible}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <PassengerSelector onChange={handlePassengerChange} />
          
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <span>Search Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
