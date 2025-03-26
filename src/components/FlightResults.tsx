
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const FlightResults = () => {
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const { toast } = useToast();
  
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
    // Set displayed flights to all flights when component mounts
    setDisplayedFlights(allFlights);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-2xl font-bold mb-4">Flight Results</h1>
      <p className="mb-6">Showing {displayedFlights.length} flights</p>
      
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
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium">{flight.arrival.time}</p>
                  <p className="text-sm text-gray-500">{flight.arrival.code}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{flight.currency} {flight.price}</p>
                <button 
                  className="mt-2 bg-primary text-white px-4 py-2 rounded flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    setSelectedFlight(flight);
                    setIsRegisterModalOpen(true);
                  }}
                >
                  Book <ArrowRight className="h-4 w-4" />
                </button>
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
