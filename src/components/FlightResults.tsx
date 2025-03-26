
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
  stops: number;
  stopInfo?: {
    city: string;
    duration: string;
  };
  currency: string;
}

const FlightResults = () => {
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [displayedFlights, setDisplayedFlights] = useState<Flight[]>([]);
  const [allFlightsData, setAllFlightsData] = useState<Flight[]>([]);
  const { toast } = useToast();
  
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterAirlines, setFilterAirlines] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [stopFilter, setStopFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  
  // For button glow effect
  const [activeButton, setActiveButton] = useState<number | null>(null);
  
  // All flights data (moved from inline to state for better organization)
  const allFlights = [
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
    },
    {
      id: 8,
      airline: 'Fly Elite Airways',
      flightNo: 'FE105',
      departure: { city: 'Mumbai', code: 'BOM', time: '07:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '09:30', date: '2023-07-15' },
      duration: '2h 15m',
      price: 7199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 9,
      airline: 'IndiGo',
      flightNo: 'IN302',
      departure: { city: 'Bengaluru', code: 'BLR', time: '08:00', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '09:45', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 10,
      airline: 'Vistara',
      flightNo: 'VS210',
      departure: { city: 'Chennai', code: 'MAA', time: '10:30', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '11:45', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 11,
      airline: 'SpiceJet',
      flightNo: 'SJ415',
      departure: { city: 'Kolkata', code: 'CCU', time: '12:45', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '15:00', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 12,
      airline: 'Air India',
      flightNo: 'AI526',
      departure: { city: 'Hyderabad', code: 'HYD', time: '16:30', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '17:45', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 13,
      airline: 'Fly Elite Airways',
      flightNo: 'FE317',
      departure: { city: 'Mumbai', code: 'BOM', time: '14:00', date: '2023-07-15' },
      arrival: { city: 'Goa', code: 'GOI', time: '15:15', date: '2023-07-15' },
      duration: '1h 15m',
      price: 5299,
      stops: 0,
      currency: '₹'
    },
    
    {
      id: 14,
      airline: 'IndiGo',
      flightNo: 'IN501',
      departure: { city: 'Mumbai', code: 'BOM', time: '06:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '08:30', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 15,
      airline: 'Vistara',
      flightNo: 'VS202',
      departure: { city: 'Mumbai', code: 'BOM', time: '09:45', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '12:00', date: '2023-07-15' },
      duration: '2h 15m',
      price: 7799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 16,
      airline: 'Air India',
      flightNo: 'AI308',
      departure: { city: 'Mumbai', code: 'BOM', time: '12:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '14:45', date: '2023-07-15' },
      duration: '2h 15m',
      price: 6299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 17,
      airline: 'Emirates',
      flightNo: 'EK507',
      departure: { city: 'Mumbai', code: 'BOM', time: '23:15', date: '2023-07-15' },
      arrival: { city: 'Dubai', code: 'DXB', time: '01:30', date: '2023-07-16' },
      duration: '3h 15m',
      price: 28999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 18,
      airline: 'Qatar Airways',
      flightNo: 'QR553',
      departure: { city: 'Mumbai', code: 'BOM', time: '22:30', date: '2023-07-15' },
      arrival: { city: 'Doha', code: 'DOH', time: '00:15', date: '2023-07-16' },
      duration: '3h 45m',
      price: 31499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 19,
      airline: 'IndiGo',
      flightNo: 'IN623',
      departure: { city: 'Bengaluru', code: 'BLR', time: '07:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:15', date: '2023-07-15' },
      duration: '2h 45m',
      price: 5899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 20,
      airline: 'SpiceJet',
      flightNo: 'SJ418',
      departure: { city: 'Bengaluru', code: 'BLR', time: '15:45', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '18:30', date: '2023-07-15' },
      duration: '2h 45m',
      price: 5399,
      stops: 0,
      currency: '₹'
    },
    {
      id: 21,
      airline: 'Vistara',
      flightNo: 'VS311',
      departure: { city: 'Bengaluru', code: 'BLR', time: '10:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '12:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 22,
      airline: 'Air India',
      flightNo: 'AI512',
      departure: { city: 'Chennai', code: 'MAA', time: '08:45', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '10:45', date: '2023-07-15' },
      duration: '2h 00m',
      price: 5099,
      stops: 0,
      currency: '₹'
    },
    {
      id: 23,
      airline: 'Emirates',
      flightNo: 'EK543',
      departure: { city: 'New Delhi', code: 'DEL', time: '21:45', date: '2023-07-15' },
      arrival: { city: 'Dubai', code: 'DXB', time: '00:15', date: '2023-07-16' },
      duration: '3h 30m',
      price: 27499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 24,
      airline: 'Qatar Airways',
      flightNo: 'QR579',
      departure: { city: 'New Delhi', code: 'DEL', time: '20:30', date: '2023-07-15' },
      arrival: { city: 'Doha', code: 'DOH', time: '22:45', date: '2023-07-15' },
      duration: '4h 15m',
      price: 30999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 25,
      airline: 'IndiGo',
      flightNo: 'IN705',
      departure: { city: 'Hyderabad', code: 'HYD', time: '06:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '09:00', date: '2023-07-15' },
      duration: '2h 30m',
      price: 5799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 26,
      airline: 'Vistara',
      flightNo: 'VS422',
      departure: { city: 'Kolkata', code: 'CCU', time: '11:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '14:00', date: '2023-07-15' },
      duration: '2h 45m',
      price: 6799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 27,
      airline: 'SpiceJet',
      flightNo: 'SJ530',
      departure: { city: 'Chennai', code: 'MAA', time: '13:45', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '14:45', date: '2023-07-15' },
      duration: '1h 00m',
      price: 3599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 28,
      airline: 'Air India',
      flightNo: 'AI631',
      departure: { city: 'Kolkata', code: 'CCU', time: '09:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '12:00', date: '2023-07-15' },
      duration: '2h 30m',
      price: 6199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 29,
      airline: 'IndiGo',
      flightNo: 'IN814',
      departure: { city: 'Goa', code: 'GOI', time: '10:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '11:30', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 30,
      airline: 'Vistara',
      flightNo: 'VS507',
      departure: { city: 'Mumbai', code: 'BOM', time: '18:30', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '20:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 31,
      airline: 'Emirates',
      flightNo: 'EK585',
      departure: { city: 'Bengaluru', code: 'BLR', time: '22:15', date: '2023-07-15' },
      arrival: { city: 'Dubai', code: 'DXB', time: '01:30', date: '2023-07-16' },
      duration: '4h 15m',
      price: 29999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 32,
      airline: 'Qatar Airways',
      flightNo: 'QR624',
      departure: { city: 'Bengaluru', code: 'BLR', time: '21:45', date: '2023-07-15' },
      arrival: { city: 'Doha', code: 'DOH', time: '00:45', date: '2023-07-16' },
      duration: '4h 00m',
      price: 32499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 33,
      airline: 'Air India',
      flightNo: 'AI753',
      departure: { city: 'Hyderabad', code: 'HYD', time: '12:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '14:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 34,
      airline: 'SpiceJet',
      flightNo: 'SJ641',
      departure: { city: 'Pune', code: 'PNQ', time: '07:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '09:45', date: '2023-07-15' },
      duration: '2h 30m',
      price: 5599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 35,
      airline: 'IndiGo',
      flightNo: 'IN925',
      departure: { city: 'Mumbai', code: 'BOM', time: '15:30', date: '2023-07-15' },
      arrival: { city: 'Chennai', code: 'MAA', time: '17:30', date: '2023-07-15' },
      duration: '2h 00m',
      price: 4699,
      stops: 0,
      currency: '₹'
    },
    {
      id: 36,
      airline: 'Fly Elite Airways',
      flightNo: 'FE405',
      departure: { city: 'Mumbai', code: 'BOM', time: '16:45', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '19:30', date: '2023-07-15' },
      duration: '2h 45m',
      price: 7299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 37,
      airline: 'Vistara',
      flightNo: 'VS608',
      departure: { city: 'New Delhi', code: 'DEL', time: '07:45', date: '2023-07-15' },
      arrival: { city: 'Goa', code: 'GOI', time: '10:30', date: '2023-07-15' },
      duration: '2h 45m',
      price: 6999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 38,
      airline: 'Air India',
      flightNo: 'AI862',
      departure: { city: 'New Delhi', code: 'DEL', time: '09:15', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '12:00', date: '2023-07-15' },
      duration: '2h 45m',
      price: 5999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 39,
      airline: 'Emirates',
      flightNo: 'EK612',
      departure: { city: 'Chennai', code: 'MAA', time: '23:00', date: '2023-07-15' },
      arrival: { city: 'Dubai', code: 'DXB', time: '02:15', date: '2023-07-16' },
      duration: '4h 15m',
      price: 28499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 40,
      airline: 'Qatar Airways',
      flightNo: 'QR683',
      departure: { city: 'Hyderabad', code: 'HYD', time: '21:30', date: '2023-07-15' },
      arrival: { city: 'Doha', code: 'DOH', time: '00:45', date: '2023-07-16' },
      duration: '4h 15m',
      price: 31999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 41,
      airline: 'IndiGo',
      flightNo: 'IN1027',
      departure: { city: 'Bengaluru', code: 'BLR', time: '19:45', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '21:00', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 42,
      airline: 'SpiceJet',
      flightNo: 'SJ742',
      departure: { city: 'New Delhi', code: 'DEL', time: '11:30', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '14:00', date: '2023-07-15' },
      duration: '2h 30m',
      price: 5199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 43,
      airline: 'Vistara',
      flightNo: 'VS715',
      departure: { city: 'Chennai', code: 'MAA', time: '16:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '19:00', date: '2023-07-15' },
      duration: '2h 45m',
      price: 6499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 44,
      airline: 'Air India',
      flightNo: 'AI971',
      departure: { city: 'Kochi', code: 'COK', time: '08:00', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '10:00', date: '2023-07-15' },
      duration: '2h 00m',
      price: 5399,
      stops: 0,
      currency: '₹'
    },
    {
      id: 45,
      airline: 'Fly Elite Airways',
      flightNo: 'FE518',
      departure: { city: 'New Delhi', code: 'DEL', time: '17:30', date: '2023-07-15' },
      arrival: { city: 'Pune', code: 'PNQ', time: '19:45', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 46,
      airline: 'IndiGo',
      flightNo: 'IN1131',
      departure: { city: 'Kochi', code: 'COK', time: '14:30', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '15:30', date: '2023-07-15' },
      duration: '1h 00m',
      price: 3499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 47,
      airline: 'Emirates',
      flightNo: 'EK647',
      departure: { city: 'Kolkata', code: 'CCU', time: '22:45', date: '2023-07-15' },
      arrival: { city: 'Dubai', code: 'DXB', time: '02:30', date: '2023-07-16' },
      duration: '4h 45m',
      price: 29499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 48,
      airline: 'Qatar Airways',
      flightNo: 'QR741',
      departure: { city: 'Mumbai', code: 'BOM', time: '01:30', date: '2023-07-15' },
      arrival: { city: 'Doha', code: 'DOH', time: '03:15', date: '2023-07-15' },
      duration: '3h 45m',
      price: 30499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 49,
      airline: 'Vistara',
      flightNo: 'VS824',
      departure: { city: 'Pune', code: 'PNQ', time: '13:15', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '14:45', date: '2023-07-15' },
      duration: '1h 30m',
      price: 4299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 50,
      airline: 'Air India',
      flightNo: 'AI1082',
      departure: { city: 'Hyderabad', code: 'HYD', time: '18:45', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '21:15', date: '2023-07-15' },
      duration: '2h 30m',
      price: 5799,
      stops: 0,
      currency: '₹'
    }
  ];

  const additionalFlights = [
    {
      id: 51,
      airline: 'SpiceJet',
      flightNo: 'SJ845',
      departure: { city: 'Bangkok', code: 'BKK', time: '10:00', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '12:45', date: '2023-07-15' },
      duration: '2h 45m',
      price: 12999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 52,
      airline: 'IndiGo',
      flightNo: 'IN652',
      departure: { city: 'Singapore', code: 'SIN', time: '08:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '11:30', date: '2023-07-15' },
      duration: '3h 15m',
      price: 15999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 53,
      airline: 'Air Asia',
      flightNo: 'AA471',
      departure: { city: 'Kuala Lumpur', code: 'KUL', time: '09:30', date: '2023-07-15' },
      arrival: { city: 'Bangkok', code: 'BKK', time: '11:00', date: '2023-07-15' },
      duration: '1h 30m',
      price: 8999,
      stops: 0,
      currency: '₹'
    }
  ];

  useEffect(() => {
    // Set all flights data
    const combinedFlights = [...allFlights, ...additionalFlights];
    setAllFlightsData(combinedFlights);
    setDisplayedFlights(combinedFlights);
    
    // Extract unique airlines for filter
    const airlines = [...new Set(combinedFlights.map(flight => flight.airline))];
    setFilterAirlines(airlines);
    
    // Find min and max prices
    const prices = combinedFlights.map(flight => flight.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange([minPrice, maxPrice]);
  }, []);

  // Apply filters and sorting
  const applyFilters = () => {
    let filteredFlights = [...allFlightsData];
    
    // Filter by airlines if any are selected
    if (selectedAirlines.length > 0) {
      filteredFlights = filteredFlights.filter(flight => 
        selectedAirlines.includes(flight.airline)
      );
    }
    
    // Filter by price range
    filteredFlights = filteredFlights.filter(flight => 
      flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Filter by stops
    if (stopFilter !== null) {
      filteredFlights = filteredFlights.filter(flight => 
        flight.stops === stopFilter
      );
    }
    
    // Apply sorting
    filteredFlights = sortFlights(filteredFlights, sortBy);
    
    // Update displayed flights
    setDisplayedFlights(filteredFlights);
    
    // Show toast notification
    toast({
      title: "Filters Applied",
      description: `Showing ${filteredFlights.length} flights based on your filters.`,
    });
    
    // Close the filter popover
    setIsFilterOpen(false);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedAirlines([]);
    setPriceRange([0, 50000]);
    setStopFilter(null);
    setSortBy("price-asc");
    setDisplayedFlights(allFlightsData);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset.",
    });
    
    setIsFilterOpen(false);
  };
  
  // Sort flights based on criteria
  const sortFlights = (flights: Flight[], criteria: string) => {
    const sortedFlights = [...flights];
    
    switch (criteria) {
      case "price-asc":
        return sortedFlights.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedFlights.sort((a, b) => b.price - a.price);
      case "duration-asc":
        return sortedFlights.sort((a, b) => {
          const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].split('m')[0]);
          const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].split('m')[0]);
          return durationA - durationB;
        });
      case "departure-asc":
        return sortedFlights.sort((a, b) => {
          const timeA = parseInt(a.departure.time.replace(':', ''));
          const timeB = parseInt(b.departure.time.replace(':', ''));
          return timeA - timeB;
        });
      case "departure-desc":
        return sortedFlights.sort((a, b) => {
          const timeA = parseInt(a.departure.time.replace(':', ''));
          const timeB = parseInt(b.departure.time.replace(':', ''));
          return timeB - timeA;
        });
      default:
        return sortedFlights;
    }
  };
  
  // Handle airline selection
  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines(prev => {
      if (prev.includes(airline)) {
        return prev.filter(a => a !== airline);
      } else {
        return [...prev, airline];
      }
    });
  };
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    // Apply sort immediately
    const sortedFlights = sortFlights(displayedFlights, value);
    setDisplayedFlights(sortedFlights);
    
    toast({
      title: "Flights Sorted",
      description: `Flights have been sorted by ${
        value === "price-asc" ? "price (low to high)" :
        value === "price-desc" ? "price (high to low)" :
        value === "duration-asc" ? "shortest duration" :
        value === "departure-asc" ? "earliest departure" :
        "latest departure"
      }`,
    });
  };
  
  // Handle button interaction
  const handleButtonHover = (id: number) => {
    setActiveButton(id);
  };
  
  const handleButtonLeave = () => {
    setActiveButton(null);
  };

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-2xl font-bold mb-4">Flight Results</h1>
      
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-gray-600">Showing {displayedFlights.length} flights</p>
        
        <div className="flex flex-wrap gap-2">
          {/* Sorting dropdown */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="duration-asc">Duration: Shortest</SelectItem>
              <SelectItem value="departure-asc">Departure: Earliest</SelectItem>
              <SelectItem value="departure-desc">Departure: Latest</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Filter popover */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-96">
              <div className="space-y-4 py-2">
                <h3 className="font-medium text-lg">Filter Flights</h3>
                
                {/* Price Range Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Price Range</h4>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <Slider
                    value={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={50000}
                    step={1000}
                    onValueChange={handlePriceChange}
                    className="mt-2"
                  />
                </div>
                
                {/* Stops Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Stops</h4>
                  <RadioGroup 
                    value={stopFilter === null ? "all" : stopFilter.toString()} 
                    onValueChange={(value) => setStopFilter(value === "all" ? null : parseInt(value))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="non-stop" />
                      <Label htmlFor="non-stop">Non-stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="one-stop" />
                      <Label htmlFor="one-stop">1 Stop</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Airlines Filter */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Airlines</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {filterAirlines.map((airline) => (
                      <div key={airline} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`airline-${airline}`} 
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={() => handleAirlineChange(airline)}
                        />
                        <label 
                          htmlFor={`airline-${airline}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {airline}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  <Button onClick={applyFilters} className="glow-button">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Flight Results */}
      <div className="space-y-4">
        {displayedFlights.map((flight) => (
          <div 
            key={flight.id} 
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-medium text-lg">{flight.airline}</p>
                <p className="text-gray-500">{flight.flightNo}</p>
              </div>
              
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-center">
                  <p className="font-medium">{flight.departure.time}</p>
                  <p className="text-sm text-gray-500">{flight.departure.code}</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">{flight.duration}</p>
                  <div className="relative w-20 md:w-32 h-px bg-gray-300 my-2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                    {flight.stopInfo && ` (${flight.stopInfo.city}, ${flight.stopInfo.duration})`}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium">{flight.arrival.time}</p>
                  <p className="text-sm text-gray-500">{flight.arrival.code}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{flight.currency} {flight.price}</p>
                <Button 
                  className={`mt-2 ${activeButton === flight.id ? 'glow-button' : ''}`}
                  onClick={() => {
                    setSelectedFlight(flight);
                    setIsRegisterModalOpen(true);
                  }}
                  onMouseEnter={() => handleButtonHover(flight.id)}
                  onMouseLeave={handleButtonLeave}
                >
                  Book <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayedFlights.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Flights Found</h3>
          <p className="text-gray-500 text-center">
            We couldn't find any flights matching your search criteria.
            <br />
            Please try adjusting your search parameters.
          </p>
        </div>
      )}

      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={() => setIsRegisterModalOpen(false)}
          onComplete={(details) => {
            setUserDetails(details);
            setIsRegisterModalOpen(false);
            setIsConfirmationModalOpen(true);
          }}
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
      
      <AlertDialog open={isLoginRequired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to be logged in to book a flight. Please log in or create an account to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsLoginRequired(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setIsLoginRequired(false);
              setIsRegisterModalOpen(true);
            }}>
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlightResults;
