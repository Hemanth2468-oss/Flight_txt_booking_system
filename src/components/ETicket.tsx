
import { Plane, Calendar, Clock, MapPin, User, Download } from 'lucide-react';
import { useState } from 'react';

interface ETicketProps {
  flight: any; // We'll add guards for this
  user: any; // We'll add guards for this
  bookingReference: string;
  promoCode?: string | null; // Add promoCode prop
  promoDiscount?: number; // Add promoDiscount prop
}

const ETicket = ({ flight, user, bookingReference, promoCode, promoDiscount }: ETicketProps) => {
  const [ticketStyle, setTicketStyle] = useState<'standard' | 'boardingPass'>('standard');
  
  // Add a guard to prevent rendering with invalid data
  if (!flight || !user) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">Ticket information is not available</p>
      </div>
    );
  }

  // Generate a random seat number
  const seat = `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(1 + Math.random() * 30)}`;
  
  // Generate boarding time (2 hours before departure)
  const getBoardingTime = () => {
    if (!flight.departure || !flight.departure.time) {
      return "N/A";
    }
    
    const [hours, minutes] = flight.departure.time.split(':');
    const departureDate = new Date();
    departureDate.setHours(parseInt(hours) - 2);
    departureDate.setMinutes(parseInt(minutes));
    return `${departureDate.getHours().toString().padStart(2, '0')}:${departureDate.getMinutes().toString().padStart(2, '0')}`;
  };

  // Format date for boarding pass
  const formatDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(today);
    const year = today.getFullYear().toString().slice(2);
    return `${day} ${month} ${year}`;
  };
  
  // Standard e-ticket layout
  const standardTicket = (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-primary-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">Fly Elite</span>
            <span>✈️</span>
          </div>
          <div className="text-sm">
            E-Ticket / Boarding Pass
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Flight Information</h3>
            <div className="space-y-3">
              <div className="flex">
                <Plane className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="font-medium">{flight?.airline || 'N/A'} • {flight?.flightNo || 'N/A'}</p>
                </div>
              </div>
              {flight.departure && (
                <>
                  <div className="flex">
                    <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{flight.departure.date || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Departure Time</p>
                      <p className="font-medium">{flight.departure.time || 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex">
                <Clock className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Boarding Time</p>
                  <p className="font-medium">{getBoardingTime()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Passenger Information</h3>
            <div className="space-y-3">
              <div className="flex">
                <User className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Passenger</p>
                  <p className="font-medium">{user?.firstName || ''} {user?.lastName || ''}</p>
                </div>
              </div>
              {flight.departure && (
                <div className="flex">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="font-medium">{flight.departure.city || 'N/A'} ({flight.departure.code || 'N/A'})</p>
                  </div>
                </div>
              )}
              {flight.arrival && (
                <div className="flex">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">To</p>
                    <p className="font-medium">{flight.arrival.city || 'N/A'} ({flight.arrival.code || 'N/A'})</p>
                  </div>
                </div>
              )}
              <div className="flex">
                <div className="w-5 h-5 text-primary-600 mr-3 flex items-center justify-center">
                  <span className="font-bold">S</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seat</p>
                  <p className="font-medium">{seat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Booking Reference</p>
              <p className="font-bold">{bookingReference}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="font-bold text-primary-600">${flight?.price || 'N/A'}</p>
              {promoCode && promoDiscount && (
                <p className="text-xs text-green-600">
                  {promoDiscount}% off with code <span className="font-mono">{promoCode}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>Please arrive at the airport at least 3 hours before your scheduled departure time. Don't forget to bring your passport and booking reference.</p>
        </div>
      </div>
    </div>
  );
  
  // Boarding pass style layout (similar to the image)
  const boardingPassTicket = (
    <div className="border border-gray-200 rounded-lg overflow-hidden print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Left section - Main boarding pass */}
        <div className="border-r border-gray-300 flex-1">
          <div className="bg-blue-700 text-white p-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Email Boarding Pass (Web Check in)</h3>
              <div className="text-sm font-bold">FlyElite.com</div>
            </div>
          </div>
          
          <div className="p-4 flex">
            {/* Barcode section */}
            <div className="pr-4 border-r border-gray-300 flex flex-col items-center w-1/3">
              <div className="h-32 w-20 bg-[url('/lovable-uploads/b9549fe4-2ff0-41e6-8a6f-c71a9a4ecfa8.png')] bg-contain bg-no-repeat bg-center mb-2"></div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">Name</p>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">From</p>
                <p>{flight.departure?.city || 'N/A'}</p>
              </div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">Flight No.</p>
                <p>FE {flight.flightNo || '0000'}</p>
              </div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">Boarding Time</p>
                <p>{getBoardingTime()} AM</p>
              </div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">Sequence No.</p>
                <p>1</p>
              </div>
              <div className="text-xs text-center mt-2">
                <p className="font-bold">Gate No.</p>
                <p>{String.fromCharCode(65 + Math.floor(Math.random() * 6))}{Math.floor(1 + Math.random() * 20)}</p>
              </div>
            </div>
            
            {/* Middle section */}
            <div className="px-4 flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-bold">To</p>
                  <p className="text-lg">{flight.arrival?.city || 'N/A'}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-bold">Date</p>
                <p>{formatDate()}</p>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-bold">Departure Time</p>
                <p>{flight.departure?.time || '00:00'} AM</p>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-bold">Class</p>
                <p>R</p>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-bold">Seat No.</p>
                <p className="font-bold">{seat}</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs p-2 border-t border-gray-300 bg-gray-50">
            <p>Boarding pass must be presented at the departure time. Boarding gate will be closed 20 minutes before the flight departure time.</p>
          </div>
        </div>
        
        {/* Right section - Flight info */}
        <div className="md:w-1/3 bg-white">
          <div className="bg-blue-700 text-white p-3">
            <div className="font-bold">SPECIAL SERVICES</div>
            <div>NIL</div>
          </div>
          
          <div className="p-4">
            <div className="mb-2">
              <p className="text-sm font-bold">Name:</p>
              <p>{user.firstName} {user.lastName}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-sm font-bold">PNR:</p>
              <p>{bookingReference}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-sm font-bold">Flt No.:</p>
              <p>FE {flight.flightNo || '0000'}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-sm font-bold">Seat No.:</p>
              <p>{seat}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-sm font-bold">Seq No.:</p>
              <p>1</p>
            </div>
          </div>
        </div>
        
        {/* Far right section - Passenger info */}
        <div className="md:w-1/4 bg-white border-l border-gray-300">
          <div className="bg-blue-700 text-white p-3">
            <div className="font-bold">FlyElite.com</div>
          </div>
          
          <div className="p-4">
            <div className="mb-3 font-bold">
              {user.firstName} {user.lastName}
            </div>
            
            <div className="mb-3">
              <p className="text-sm">From</p>
              <p className="font-bold">{flight.departure?.city || 'N/A'}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">To</p>
              <p className="font-bold">{flight.arrival?.city || 'N/A'}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Flight No.</p>
              <p className="font-bold">FE {flight.flightNo || '0000'}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Date</p>
              <p className="font-bold">{formatDate()}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Boarding Time</p>
              <p className="font-bold">{getBoardingTime()} AM</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Departure Time</p>
              <p className="font-bold">{flight.departure?.time || '00:00'} AM</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Seq No.</p>
              <p className="font-bold">1</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Class</p>
              <p className="font-bold">R</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm">Seat No</p>
              <p className="font-bold">{seat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="flex justify-end mb-4 space-x-3">
        <button 
          onClick={() => setTicketStyle('standard')}
          className={`px-3 py-1 text-sm rounded ${ticketStyle === 'standard' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Standard Ticket
        </button>
        <button 
          onClick={() => setTicketStyle('boardingPass')}
          className={`px-3 py-1 text-sm rounded ${ticketStyle === 'boardingPass' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Boarding Pass
        </button>
      </div>
      
      {ticketStyle === 'standard' ? standardTicket : boardingPassTicket}
    </div>
  );
};

export default ETicket;
