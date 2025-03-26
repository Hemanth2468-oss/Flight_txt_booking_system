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
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:45', date: '2023-07-15' },
      duration: '2h 30m',
      price: 14999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 53,
      airline: 'Air Asia',
      flightNo: 'AA721',
      departure: { city: 'Kuala Lumpur', code: 'KUL', time: '09:30', date: '2023-07-15' },
      arrival: { city: 'Bangkok', code: 'BKK', time: '10:30', date: '2023-07-15' },
      duration: '2h 00m',
      price: 8999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 54,
      airline: 'Japan Airlines',
      flightNo: 'JL309',
      departure: { city: 'Tokyo', code: 'NRT', time: '23:00', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '04:30', date: '2023-07-16' },
      duration: '8h 30m',
      price: 42999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 55,
      airline: 'Cathay Pacific',
      flightNo: 'CP423',
      departure: { city: 'Hong Kong', code: 'HKG', time: '10:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '13:45', date: '2023-07-15' },
      duration: '5h 30m',
      price: 32999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 56,
      airline: 'Air France',
      flightNo: 'AF218',
      departure: { city: 'Paris', code: 'CDG', time: '22:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:15', date: '2023-07-16' },
      duration: '8h 45m',
      price: 47999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 57,
      airline: 'Lufthansa',
      flightNo: 'LH743',
      departure: { city: 'Frankfurt', code: 'FRA', time: '21:45', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '09:30', date: '2023-07-16' },
      duration: '8h 45m',
      price: 45999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 58,
      airline: 'British Airways',
      flightNo: 'BA139',
      departure: { city: 'London', code: 'LHR', time: '22:00', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:45', date: '2023-07-16' },
      duration: '8h 45m',
      price: 46999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 59,
      airline: 'Singapore Airlines',
      flightNo: 'SQ516',
      departure: { city: 'Singapore', code: 'SIN', time: '16:30', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '18:15', date: '2023-07-15' },
      duration: '4h 45m',
      price: 35999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 60,
      airline: 'Turkish Airlines',
      flightNo: 'TK721',
      departure: { city: 'Istanbul', code: 'IST', time: '20:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '04:30', date: '2023-07-16' },
      duration: '7h 15m',
      price: 40999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 61,
      airline: 'Etihad Airways',
      flightNo: 'EY204',
      departure: { city: 'Abu Dhabi', code: 'AUH', time: '22:45', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '03:55', date: '2023-07-16' },
      duration: '3h 10m',
      price: 28999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 62,
      airline: 'Air Canada',
      flightNo: 'AC42',
      departure: { city: 'Toronto', code: 'YYZ', time: '21:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '21:45', date: '2023-07-16' },
      duration: '14h 15m',
      price: 79999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 63,
      airline: 'IndiGo',
      flightNo: 'IN1247',
      departure: { city: 'Jaipur', code: 'JAI', time: '05:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '07:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 64,
      airline: 'Air India',
      flightNo: 'AI1195',
      departure: { city: 'Ahmedabad', code: 'AMD', time: '12:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '14:00', date: '2023-07-15' },
      duration: '1h 30m',
      price: 5199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 65,
      airline: 'SpiceJet',
      flightNo: 'SJ958',
      departure: { city: 'Lucknow', code: 'LKO', time: '09:45', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '12:30', date: '2023-07-15' },
      duration: '2h 45m',
      price: 6299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 66,
      airline: 'Vistara',
      flightNo: 'VS939',
      departure: { city: 'Varanasi', code: 'VNS', time: '14:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '16:30', date: '2023-07-15' },
      duration: '2h 15m',
      price: 6899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 67,
      airline: 'Air Asia',
      flightNo: 'AA843',
      departure: { city: 'Bangkok', code: 'BKK', time: '13:30', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '15:15', date: '2023-07-15' },
      duration: '2h 45m',
      price: 9999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 68,
      airline: 'Emirates',
      flightNo: 'EK714',
      departure: { city: 'Dubai', code: 'DXB', time: '03:45', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '09:00', date: '2023-07-15' },
      duration: '3h 15m',
      price: 27499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 69,
      airline: 'Qatar Airways',
      flightNo: 'QR834',
      departure: { city: 'Doha', code: 'DOH', time: '05:15', date: '2023-07-15' },
      arrival: { city: 'Chennai', code: 'MAA', time: '11:45', date: '2023-07-15' },
      duration: '4h 30m',
      price: 29999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 70,
      airline: 'IndiGo',
      flightNo: 'IN1352',
      departure: { city: 'Guwahati', code: 'GAU', time: '08:45', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '10:00', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 71,
      airline: 'Air India',
      flightNo: 'AI1283',
      departure: { city: 'Srinagar', code: 'SXR', time: '10:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '12:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 5499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 72,
      airline: 'SpiceJet',
      flightNo: 'SJ1065',
      departure: { city: 'Bhubaneswar', code: 'BBI', time: '07:00', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '08:45', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 73,
      airline: 'Vistara',
      flightNo: 'VS1041',
      departure: { city: 'Chandigarh', code: 'IXC', time: '17:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '19:45', date: '2023-07-15' },
      duration: '2h 30m',
      price: 6499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 74,
      airline: 'Fly Elite Airways',
      flightNo: 'FE612',
      departure: { city: 'Indore', code: 'IDR', time: '15:30', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '17:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 5399,
      stops: 0,
      currency: '₹'
    },
    {
      id: 75,
      airline: 'IndiGo',
      flightNo: 'IN1476',
      departure: { city: 'Nagpur', code: 'NAG', time: '09:30', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '11:00', date: '2023-07-15' },
      duration: '1h 30m',
      price: 4199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 76,
      airline: 'Air India',
      flightNo: 'AI1384',
      departure: { city: 'Coimbatore', code: 'CJB', time: '11:15', date: '2023-07-15' },
      arrival: { city: 'Chennai', code: 'MAA', time: '12:30', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3699,
      stops: 0,
      currency: '₹'
    },
    {
      id: 77,
      airline: 'SpiceJet',
      flightNo: 'SJ1172',
      departure: { city: 'Tirupati', code: 'TIR', time: '13:45', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '14:45', date: '2023-07-15' },
      duration: '1h 00m',
      price: 3299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 78,
      airline: 'Vistara',
      flightNo: 'VS1143',
      departure: { city: 'Patna', code: 'PAT', time: '08:00', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '09:45', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 79,
      airline: 'IndiGo',
      flightNo: 'IN1579',
      departure: { city: 'Ranchi', code: 'IXR', time: '11:00', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '12:15', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 80,
      airline: 'Air India',
      flightNo: 'AI1492',
      departure: { city: 'Madurai', code: 'IXM', time: '16:30', date: '2023-07-15' },
      arrival: { city: 'Chennai', code: 'MAA', time: '17:45', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 81,
      airline: 'Fly Elite Airways',
      flightNo: 'FE723',
      departure: { city: 'Visakhapatnam', code: 'VTZ', time: '14:00', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '15:15', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4099,
      stops: 0,
      currency: '₹'
    },
    {
      id: 82,
      airline: 'SpiceJet',
      flightNo: 'SJ1286',
      departure: { city: 'Agartala', code: 'IXA', time: '07:45', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '09:00', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 83,
      airline: 'Vistara',
      flightNo: 'VS1246',
      departure: { city: 'Amritsar', code: 'ATQ', time: '16:00', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '17:15', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 84,
      airline: 'IndiGo',
      flightNo: 'IN1687',
      departure: { city: 'Goa', code: 'GOI', time: '18:15', date: '2023-07-15' },
      arrival: { city: 'Bengaluru', code: 'BLR', time: '19:30', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4399,
      stops: 0,
      currency: '₹'
    },
    {
      id: 85,
      airline: 'Air India',
      flightNo: 'AI1578',
      departure: { city: 'Pune', code: 'PNQ', time: '11:45', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '13:00', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4199,
      stops: 0,
      currency: '₹'
    },
    {
      id: 86,
      airline: 'SpiceJet',
      flightNo: 'SJ1392',
      departure: { city: 'Bagdogra', code: 'IXB', time: '10:00', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '12:15', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 87,
      airline: 'Fly Elite Airways',
      flightNo: 'FE834',
      departure: { city: 'Dehradun', code: 'DED', time: '13:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '14:30', date: '2023-07-15' },
      duration: '1h 00m',
      price: 3599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 88,
      airline: 'Vistara',
      flightNo: 'VS1348',
      departure: { city: 'Dibrugarh', code: 'DIB', time: '07:30', date: '2023-07-15' },
      arrival: { city: 'Kolkata', code: 'CCU', time: '09:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 89,
      airline: 'IndiGo',
      flightNo: 'IN1795',
      departure: { city: 'Trivandrum', code: 'TRV', time: '08:45', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '11:00', date: '2023-07-15' },
      duration: '2h 15m',
      price: 5299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 90,
      airline: 'Air India',
      flightNo: 'AI1683',
      departure: { city: 'Jaipur', code: 'JAI', time: '15:45', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '17:45', date: '2023-07-15' },
      duration: '2h 00m',
      price: 5299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 91,
      airline: 'SpiceJet',
      flightNo: 'SJ1498',
      departure: { city: 'Leh', code: 'IXL', time: '08:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:00', date: '2023-07-15' },
      duration: '1h 30m',
      price: 5499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 92,
      airline: 'Vistara',
      flightNo: 'VS1451',
      departure: { city: 'Ahmedabad', code: 'AMD', time: '19:15', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '20:30', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4399,
      stops: 0,
      currency: '₹'
    },
    {
      id: 93,
      airline: 'IndiGo',
      flightNo: 'IN1892',
      departure: { city: 'Lucknow', code: 'LKO', time: '16:45', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '18:00', date: '2023-07-15' },
      duration: '1h 15m',
      price: 3999,
      stops: 0,
      currency: '₹'
    },
    {
      id: 94,
      airline: 'Air India',
      flightNo: 'AI1778',
      departure: { city: 'Bhopal', code: 'BHO', time: '11:30', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '13:15', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 95,
      airline: 'Fly Elite Airways',
      flightNo: 'FE942',
      departure: { city: 'Raipur', code: 'RPR', time: '09:15', date: '2023-07-15' },
      arrival: { city: 'Hyderabad', code: 'HYD', time: '10:45', date: '2023-07-15' },
      duration: '1h 30m',
      price: 4299,
      stops: 0,
      currency: '₹'
    },
    {
      id: 96,
      airline: 'SpiceJet',
      flightNo: 'SJ1597',
      departure: { city: 'Jodhpur', code: 'JDH', time: '14:30', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '15:45', date: '2023-07-15' },
      duration: '1h 15m',
      price: 4499,
      stops: 0,
      currency: '₹'
    },
    {
      id: 97,
      airline: 'Vistara',
      flightNo: 'VS1553',
      departure: { city: 'Mangalore', code: 'IXE', time: '15:00', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '16:30', date: '2023-07-15' },
      duration: '1h 30m',
      price: 4599,
      stops: 0,
      currency: '₹'
    },
    {
      id: 98,
      airline: 'IndiGo',
      flightNo: 'IN1986',
      departure: { city: 'Vadodara', code: 'BDQ', time: '08:15', date: '2023-07-15' },
      arrival: { city: 'New Delhi', code: 'DEL', time: '10:00', date: '2023-07-15' },
      duration: '1h 45m',
      price: 4799,
      stops: 0,
      currency: '₹'
    },
    {
      id: 99,
      airline: 'Air India',
      flightNo: 'AI1864',
      departure: { city: 'Udaipur', code: 'UDR', time: '12:00', date: '2023-07-15' },
      arrival: { city: 'Mumbai', code: 'BOM', time: '13:30', date: '2023-07-15' },
      duration: '1h 30m',
      price: 4899,
      stops: 0,
      currency: '₹'
    },
    {
      id: 100,
      airline: 'Fly Elite Airways',
      flightNo: 'FE1057',
      departure: { city: 'Port Blair', code: 'IXZ', time: '10:45', date: '2023-07-15' },
      arrival: { city: 'Chennai', code: 'MAA', time: '13:00', date: '2023-07-15' },
      duration: '2h 15m',
      price: 7299,
      stops: 0,
      currency: '₹'
    }
  ];

  // ... rest of the component's logic remains unchanged
}
