
import { Plane, Calendar, Clock, MapPin, User } from 'lucide-react';

interface ETicketProps {
  flight: any;
  user: any;
  bookingReference: string;
}

const ETicket = ({ flight, user, bookingReference }: ETicketProps) => {
  // Generate a random seat number
  const seat = `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(1 + Math.random() * 30)}`;
  
  // Generate boarding time (2 hours before departure)
  const getBoardingTime = () => {
    const [hours, minutes] = flight.departure.time.split(':');
    const departureDate = new Date();
    departureDate.setHours(parseInt(hours) - 2);
    departureDate.setMinutes(parseInt(minutes));
    return `${departureDate.getHours().toString().padStart(2, '0')}:${departureDate.getMinutes().toString().padStart(2, '0')}`;
  };
  
  return (
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
                  <p className="font-medium">{flight.airline} • {flight.flightNo}</p>
                </div>
              </div>
              <div className="flex">
                <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{flight.departure.date}</p>
                </div>
              </div>
              <div className="flex">
                <Clock className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Departure Time</p>
                  <p className="font-medium">{flight.departure.time}</p>
                </div>
              </div>
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
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              <div className="flex">
                <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-medium">{flight.departure.city} ({flight.departure.code})</p>
                </div>
              </div>
              <div className="flex">
                <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">To</p>
                  <p className="font-medium">{flight.arrival.city} ({flight.arrival.code})</p>
                </div>
              </div>
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
              <p className="font-bold text-primary-600">${flight.price}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>Please arrive at the airport at least 3 hours before your scheduled departure time. Don't forget to bring your passport and booking reference.</p>
        </div>
      </div>
    </div>
  );
};

export default ETicket;
