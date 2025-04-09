
import { PlaneTakeoff, ArrowRight, QrCode } from 'lucide-react';

interface PremiumTicketProps {
  booking: {
    bookingNumber: string;
    bookingDate: string;
    firstName: string;
    lastName: string;
    departure: string;
    destination: string;
    departureDate: string;
    returnDate: string | null;
    jet: {
      name: string;
      passengers: number;
    };
    status: string;
    totalAmount: string;
  };
}

const PremiumTicket = ({ booking }: PremiumTicketProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center">
          <PlaneTakeoff className="h-8 w-8 text-[#FFD700] mr-2" />
          <div>
            <h1 className="text-xl font-bold font-serif text-[#1A1F2C]">FlyElite</h1>
            <p className="text-xs text-gray-500">Private Charter Ticket</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Elite Chip Member</div>
          <div className="text-sm font-bold text-[#6E59A5]">PREMIUM CLASS</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <h2 className="text-sm font-bold text-gray-700 mb-1">PASSENGER</h2>
            <p className="text-lg font-bold">{booking.firstName} {booking.lastName}</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-sm font-bold text-gray-700 mb-1">BOOKING REF</h2>
            <p className="text-lg font-bold text-[#6E59A5]">{booking.bookingNumber}</p>
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <h2 className="text-sm font-bold text-gray-700 mb-1">AIRCRAFT</h2>
            <p className="text-base">{booking.jet.name}</p>
          </div>
          <div className="w-1/2 pl-2">
            <h2 className="text-sm font-bold text-gray-700 mb-1">STATUS</h2>
            <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              {booking.status}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] rounded-lg p-4 text-white mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-sm opacity-80">From</p>
              <h3 className="text-xl font-bold">{booking.departure}</h3>
            </div>
            
            <div className="flex-1 flex justify-center items-center px-4">
              <div className="w-full h-[1px] bg-white/30 relative">
                <PlaneTakeoff className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-5 w-5 text-[#FFD700]" />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm opacity-80">To</p>
              <h3 className="text-xl font-bold">{booking.destination}</h3>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="opacity-80">Departure</p>
              <p className="font-medium">{booking.departureDate}</p>
            </div>
            
            {booking.returnDate && (
              <div>
                <p className="opacity-80">Return</p>
                <p className="font-medium">{booking.returnDate}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-1">TOTAL PRICE</h2>
          <p className="text-xl font-bold text-[#6E59A5]">{booking.totalAmount}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-gray-200 flex items-center justify-center rounded">
            <QrCode className="h-16 w-16 text-gray-800" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Scan for details</p>
        </div>
      </div>
      
      {/* Boarding Pass Section */}
      <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
        <h2 className="text-center text-lg font-bold text-[#1A1F2C] mb-4">BOARDING PASS</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-xs font-bold text-gray-700">PASSENGER</h3>
            <p className="text-sm">{booking.firstName} {booking.lastName}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700">FLIGHT</h3>
            <p className="text-sm">EL-PRIVATE</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700">DATE</h3>
            <p className="text-sm">{booking.departureDate}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700">FROM</h3>
            <p className="text-sm">{booking.departure}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700">TO</h3>
            <p className="text-sm">{booking.destination}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700">SEAT</h3>
            <p className="text-sm">Premium</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center">
            <PlaneTakeoff className="h-5 w-5 text-[#6E59A5] mr-2" />
            <span className="text-sm font-bold text-[#1A1F2C]">FlyElite Premium Charter</span>
          </div>
          <div className="text-xs text-gray-600">
            Visit our lounge 2 hours before departure
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTicket;
