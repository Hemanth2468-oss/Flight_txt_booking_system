
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, ArrowUpDown, Filter } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchData {
  tripType: 'roundTrip' | 'oneWay' | 'multiCity';
  from: { code: string; display: string };
  to: { code: string; display: string };
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: string;
}

interface Flight {
  id: number;
  airline: string;
  flightNo: string;
  departure: {
    city: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  originalPrice?: number;
  stops: number;
  stopInfo?: {
    city: string;
    duration: string;
  };
  currency: string;
}

interface FlightResultsProps {
  promoCode?: string | null;
  setLowestPrice?: (price: number) => void;
}

const FlightResults = ({ promoCode, setLowestPrice }: FlightResultsProps) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPromoAlert, setShowPromoAlert] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sortOption, setSortOption] = useState('price');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [stops, setStops] = useState<number[]>([0, 1, 2]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [availableAirlines, setAvailableAirlines] = useState<string[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Available promo codes
  const availablePromoCodes = [
    {
      code: "FIRSTFLY",
      discount: 20,
      description: "First-time user discount",
      validUntil: "2023-12-31"
    },
    {
      code: "FIRSTFLY20",
      discount: 20,
      description: "First-time user discount - 20% off",
      validUntil: "2023-12-31"
    },
    {
      code: "FIRSTFLY50",
      discount: 50,
      description: "First-time user discount - 50% off",
      validUntil: "2023-12-31"
    },
    {
      code: "WEEKEND15",
      discount: 15,
      description: "Weekend special offer",
      validUntil: "2023-10-31"
    },
    {
      code: "CARDOFR10",
      discount: 10,
      description: "Credit card partner offer",
      validUntil: "2023-11-30"
    }
  ];
  
  // Fetch saved search data from localStorage
  useEffect(() => {
    const savedSearchData = localStorage.getItem('flyEliteSearchData');
    if (savedSearchData) {
      const parsedData = JSON.parse(savedSearchData);
      setSearchData(parsedData);
    }
  }, []);

  // Fetch flights
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Mock flight data
          const mockFlights: Flight[] = [
            {
              id: 1,
              airline: "FlyElite Airways",
              flightNo: "FE102",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "06:30",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "08:15",
                date: "2025-04-09"
              },
              duration: "1h 45m",
              price: 4580,
              stops: 0,
              currency: "₹"
            },
            {
              id: 2,
              airline: "IndiaAir",
              flightNo: "IA205",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "08:45",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "10:50",
                date: "2025-04-09"
              },
              duration: "2h 05m",
              price: 4250,
              stops: 0,
              currency: "₹"
            },
            {
              id: 3,
              airline: "FlyElite Airways",
              flightNo: "FE310",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "11:20",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "14:40",
                date: "2025-04-09"
              },
              duration: "3h 20m",
              price: 3890,
              stops: 1,
              stopInfo: {
                city: "Pune",
                duration: "45m"
              },
              currency: "₹"
            },
            {
              id: 4,
              airline: "Velocity Air",
              flightNo: "VA721",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "15:10",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "16:55",
                date: "2025-04-09"
              },
              duration: "1h 45m",
              price: 5120,
              stops: 0,
              currency: "₹"
            },
            {
              id: 5,
              airline: "SkyConnect",
              flightNo: "SC444",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "19:25",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "23:00",
                date: "2025-04-09"
              },
              duration: "3h 35m",
              price: 3450,
              stops: 1,
              stopInfo: {
                city: "Goa",
                duration: "55m"
              },
              currency: "₹"
            },
            {
              id: 6,
              airline: "IndiaAir",
              flightNo: "IA631",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "21:40",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "23:20",
                date: "2025-04-09"
              },
              duration: "1h 40m",
              price: 4820,
              stops: 0,
              currency: "₹"
            },
            {
              id: 7,
              airline: "FlyElite Airways",
              flightNo: "FE103",
              departure: {
                city: "Hyderabad",
                code: "HYD",
                time: "06:30",
                date: "2025-04-10"
              },
              arrival: {
                city: "Mumbai",
                code: "BOM",
                time: "08:15",
                date: "2025-04-10"
              },
              duration: "1h 45m",
              price: 4680,
              stops: 0,
              currency: "₹"
            },
            {
              id: 8,
              airline: "Velocity Air",
              flightNo: "VA722",
              departure: {
                city: "Hyderabad",
                code: "HYD",
                time: "09:15",
                date: "2025-04-10"
              },
              arrival: {
                city: "Mumbai",
                code: "BOM",
                time: "10:55",
                date: "2025-04-10"
              },
              duration: "1h 40m",
              price: 5220,
              stops: 0,
              currency: "₹"
            },
            {
              id: 9,
              airline: "SkyConnect",
              flightNo: "SC445",
              departure: {
                city: "Hyderabad",
                code: "HYD",
                time: "13:50",
                date: "2025-04-10"
              },
              arrival: {
                city: "Mumbai",
                code: "BOM",
                time: "17:30",
                date: "2025-04-10"
              },
              duration: "3h 40m",
              price: 3350,
              stops: 1,
              stopInfo: {
                city: "Goa",
                duration: "1h"
              },
              currency: "₹"
            },
            {
              id: 10,
              airline: "IndiaAir",
              flightNo: "IA206",
              departure: {
                city: "Hyderabad",
                code: "HYD",
                time: "18:15",
                date: "2025-04-10"
              },
              arrival: {
                city: "Mumbai",
                code: "BOM",
                time: "20:00",
                date: "2025-04-10"
              },
              duration: "1h 45m",
              price: 4350,
              stops: 0,
              currency: "₹"
            }
          ];
          
          // Add some more varied flights to show more filtering options
          const additionalFlights: Flight[] = [
            {
              id: 11,
              airline: "BlueSky Airlines",
              flightNo: "BS501",
              departure: {
                city: "Mumbai",
                code: "BOM",
                time: "05:15",
                date: "2025-04-09"
              },
              arrival: {
                city: "Hyderabad",
                code: "HYD",
                time: "09:30",
                date: "2025-04-09"
              },
              duration: "4h 15m",
              price: 2990,
              stops: 2,
              stopInfo: {
                city: "Pune, Bangalore",
                duration: "1h 40m"
              },
              currency: "₹"
            },
            {
              id: 12,
              airline: "BlueSky Airlines",
              flightNo: "BS502",
              departure: {
                city: "Hyderabad",
                code: "HYD",
                time: "14:20",
                date: "2025-04-10"
              },
              arrival: {
                city: "Mumbai",
                code: "BOM",
                time: "18:40",
                date: "2025-04-10"
              },
              duration: "4h 20m",
              price: 3090,
              stops: 2,
              stopInfo: {
                city: "Bangalore, Pune",
                duration: "1h 45m"
              },
              currency: "₹"
            }
          ];
          
          const allFlights = [...mockFlights, ...additionalFlights];
          
          // Set flights
          setFlights(allFlights);
          
          // Set initial lowest price for parent component
          if (setLowestPrice) {
            const lowestPrice = Math.min(...allFlights.map(flight => flight.price));
            setLowestPrice(lowestPrice);
          }
          
          // Extract all unique airlines
          const airlines = [...new Set(allFlights.map(flight => flight.airline))];
          setAvailableAirlines(airlines);
          setSelectedAirlines(airlines);
          
          // Get min and max price for range
          const minPrice = Math.min(...allFlights.map(flight => flight.price));
          const maxPrice = Math.max(...allFlights.map(flight => flight.price));
          setPriceRange([minPrice, maxPrice]);
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load flights. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    fetchFlights();
  }, [setLowestPrice, toast]);
  
  // Filter flights based on search data
  useEffect(() => {
    if (flights.length > 0 && searchData) {
      let filtered = [...flights];
      
      // Filter by departure and arrival cities
      filtered = filtered.filter(flight => {
        // Check for matching departure and arrival cities
        const matchesDeparture = flight.departure.code === searchData.from.code;
        const matchesArrival = flight.arrival.code === searchData.to.code;
        
        // Check for matching date
        const matchesDate = flight.departure.date === searchData.departureDate || 
                          (searchData.returnDate && flight.departure.date === searchData.returnDate);
        
        // For one-way trip, only show departure flights
        if (searchData.tripType === 'oneWay') {
          return matchesDeparture && matchesArrival && flight.departure.date === searchData.departureDate;
        }
        
        // For round trip, show both departure and return flights
        if (searchData.tripType === 'roundTrip') {
          return matchesDeparture && matchesArrival && matchesDate;
        }
        
        return false;
      });
      
      // Apply price range filter
      filtered = filtered.filter(flight => 
        flight.price >= priceRange[0] && flight.price <= priceRange[1]
      );
      
      // Apply stops filter
      filtered = filtered.filter(flight => stops.includes(flight.stops));
      
      // Apply airline filter
      filtered = filtered.filter(flight => selectedAirlines.includes(flight.airline));
      
      // Sort flights
      if (sortOption === 'price') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'duration') {
        filtered.sort((a, b) => {
          const durationA = a.duration.split('h')[0];
          const durationB = b.duration.split('h')[0];
          return parseInt(durationA) - parseInt(durationB);
        });
      } else if (sortOption === 'departure') {
        filtered.sort((a, b) => {
          const timeA = a.departure.time.split(':').map(Number);
          const timeB = b.departure.time.split(':').map(Number);
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
        });
      } else if (sortOption === 'arrival') {
        filtered.sort((a, b) => {
          const timeA = a.arrival.time.split(':').map(Number);
          const timeB = b.arrival.time.split(':').map(Number);
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
        });
      }
      
      setFilteredFlights(filtered);
    }
  }, [flights, searchData, priceRange, stops, selectedAirlines, sortOption]);
  
  // Check if promo code is valid
  useEffect(() => {
    if (promoCode && !showPromoAlert) {
      const isValidPromo = availablePromoCodes.some(
        promo => promo.code.toUpperCase() === promoCode.toUpperCase()
      );
      
      if (isValidPromo) {
        setShowPromoAlert(true);
      }
    }
  }, [promoCode, showPromoAlert, availablePromoCodes]);
  
  const handleSelectFlight = (flight: Flight) => {
    // If promo code is present, apply discount to flight price
    if (promoCode) {
      const promoOffer = availablePromoCodes.find(
        promo => promo.code.toUpperCase() === promoCode.toUpperCase()
      );
      
      if (promoOffer) {
        const originalPrice = flight.price;
        const discountAmount = originalPrice * (promoOffer.discount / 100);
        const discountedPrice = Math.round(originalPrice - discountAmount);
        
        const discountedFlight = {
          ...flight,
          originalPrice: originalPrice,
          price: discountedPrice
        };
        
        setSelectedFlight(discountedFlight);
      } else {
        setSelectedFlight(flight);
      }
    } else {
      setSelectedFlight(flight);
    }
    
    setShowRegisterModal(true);
  };
  
  const handleUserRegistration = (userData: any) => {
    setUserData(userData);
    setShowRegisterModal(false);
    setShowConfirmationModal(true);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleStopsChange = (value: number, checked: boolean) => {
    if (checked) {
      setStops(prev => [...prev, value].sort());
    } else {
      setStops(prev => prev.filter(stop => stop !== value));
    }
  };
  
  const handleAirlineChange = (airline: string, checked: boolean) => {
    if (checked) {
      setSelectedAirlines(prev => [...prev, airline]);
    } else {
      setSelectedAirlines(prev => prev.filter(a => a !== airline));
    }
  };
  
  const formatTime = (time: string) => {
    // Convert "14:25" to "2:25 PM" format
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  // Render filtered flights
  const renderFlights = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center py-12">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading flights...</p>
        </div>
      );
    }
    
    if (filteredFlights.length === 0) {
      return (
        <div className="flex flex-col items-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Flights Found</h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            We couldn't find any flights matching your search criteria. Try adjusting your filters or search for different dates.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            Return to Search
          </Button>
        </div>
      );
    }
    
    return filteredFlights.map((flight) => (
      <div 
        key={flight.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 transition-all duration-300 hover:shadow-md"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
              <span className="text-primary-700 font-semibold">{flight.airline.substring(0, 2)}</span>
            </div>
            <div>
              <p className="font-medium">{flight.airline}</p>
              <p className="text-sm text-gray-500">{flight.flightNo}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 w-full md:w-auto mb-4 md:mb-0">
            <div className="text-center">
              <p className="text-xl font-semibold">{formatTime(flight.departure.time)}</p>
              <p className="text-sm text-gray-500">{flight.departure.code}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
              <div className="relative w-24 md:w-32">
                <div className="absolute top-1/2 w-full h-px bg-gray-300"></div>
                <div className="absolute left-0 -mt-1 w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="absolute right-0 -mt-1 w-2 h-2 rounded-full bg-gray-400"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-semibold">{formatTime(flight.arrival.time)}</p>
              <p className="text-sm text-gray-500">{flight.arrival.code}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end w-full md:w-auto">
            <p className="text-2xl font-bold text-primary-600">{flight.currency}{flight.price}</p>
            <button
              onClick={() => handleSelectFlight(flight)}
              className="mt-2 px-6 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 w-full md:w-auto flex items-center justify-center"
            >
              <span>Select</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
        
        {flight.stops > 0 && flight.stopInfo && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Stops:</span> {flight.stopInfo.city} ({flight.stopInfo.duration} layover)
            </p>
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Summary */}
      {searchData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Search</h2>
          <div className="flex flex-wrap gap-y-2">
            <div className="flex items-center mr-6">
              <span className="text-gray-500 mr-1">From:</span>
              <span className="font-medium">{searchData.from.display}</span>
            </div>
            <div className="flex items-center mr-6">
              <span className="text-gray-500 mr-1">To:</span>
              <span className="font-medium">{searchData.to.display}</span>
            </div>
            <div className="flex items-center mr-6">
              <span className="text-gray-500 mr-1">Date:</span>
              <span className="font-medium">{searchData.departureDate}</span>
              {searchData.returnDate && (
                <span className="font-medium"> - {searchData.returnDate}</span>
              )}
            </div>
            <div className="flex items-center mr-6">
              <span className="text-gray-500 mr-1">Passengers:</span>
              <span className="font-medium">
                {searchData.passengers.adults + searchData.passengers.children + searchData.passengers.infants}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">Class:</span>
              <span className="font-medium capitalize">{searchData.cabinClass}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Left Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                className="h-8 md:hidden"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterOpen ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            <div className={`space-y-6 ${filterOpen ? 'block' : 'hidden md:block'}`}>
              {/* Price Range Slider */}
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 10000]}
                    min={Math.min(...flights.map(f => f.price))}
                    max={Math.max(...flights.map(f => f.price))}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Stops Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Stops</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox 
                      id="stop-0" 
                      checked={stops.includes(0)}
                      onCheckedChange={(checked) => 
                        handleStopsChange(0, checked as boolean)
                      }
                    />
                    <label htmlFor="stop-0" className="ml-2 text-sm">Direct</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="stop-1" 
                      checked={stops.includes(1)}
                      onCheckedChange={(checked) => 
                        handleStopsChange(1, checked as boolean)
                      }
                    />
                    <label htmlFor="stop-1" className="ml-2 text-sm">1 Stop</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="stop-2" 
                      checked={stops.includes(2)}
                      onCheckedChange={(checked) => 
                        handleStopsChange(2, checked as boolean)
                      }
                    />
                    <label htmlFor="stop-2" className="ml-2 text-sm">2+ Stops</label>
                  </div>
                </div>
              </div>
              
              {/* Airlines Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Airlines</h3>
                <div className="space-y-2">
                  {availableAirlines.map((airline) => (
                    <div className="flex items-center" key={airline}>
                      <Checkbox 
                        id={`airline-${airline}`} 
                        checked={selectedAirlines.includes(airline)}
                        onCheckedChange={(checked) => 
                          handleAirlineChange(airline, checked as boolean)
                        }
                      />
                      <label htmlFor={`airline-${airline}`} className="ml-2 text-sm">{airline}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flight Results - Main Content */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-gray-500 mb-2 sm:mb-0">
              {loading ? 'Searching...' : `${filteredFlights.length} flights found`}
            </p>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="duration">Duration (Shortest)</SelectItem>
                  <SelectItem value="departure">Departure (Earliest)</SelectItem>
                  <SelectItem value="arrival">Arrival (Earliest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Flights List */}
          <div>
            {renderFlights()}
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      {showRegisterModal && selectedFlight && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onComplete={handleUserRegistration}
          flight={selectedFlight}
          promoCode={promoCode}
          promoDiscount={promoCode 
            ? availablePromoCodes.find(p => p.code.toUpperCase() === promoCode.toUpperCase())?.discount 
            : 0
          }
        />
      )}
      
      {/* Confirmation Modal */}
      {showConfirmationModal && selectedFlight && userData && (
        <ConfirmationModal
          onClose={() => {
            setShowConfirmationModal(false);
            setSelectedFlight(null);
            setUserData(null);
          }}
          flight={selectedFlight}
          user={userData}
          promoCode={promoCode}
          promoDiscount={promoCode 
            ? availablePromoCodes.find(p => p.code.toUpperCase() === promoCode.toUpperCase())?.discount 
            : 0
          }
        />
      )}
      
      {/* Promo Alert Dialog */}
      <AlertDialog open={showPromoAlert} onOpenChange={setShowPromoAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promo Code Applied!</AlertDialogTitle>
            <AlertDialogDescription>
              {promoCode && (
                <div className="py-2">
                  Your promo code <span className="font-mono font-bold">{promoCode}</span> has been applied.
                  {availablePromoCodes.find(p => p.code.toUpperCase() === promoCode.toUpperCase()) && (
                    <p className="mt-2">
                      You'll receive a <span className="font-semibold">
                        {availablePromoCodes.find(p => p.code.toUpperCase() === promoCode.toUpperCase())?.discount}% discount
                      </span> on your flight booking.
                    </p>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlightResults;
