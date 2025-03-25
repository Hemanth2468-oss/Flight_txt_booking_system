
import { useState, useRef, useEffect } from 'react';
import { User, Plus, Minus } from 'lucide-react';

interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

interface CabinClass {
  value: string;
  label: string;
}

interface PassengerSelectorProps {
  onChange: (passengers: Passengers, cabinClass: string) => void;
}

const cabinClasses: CabinClass[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
];

const PassengerSelector = ({ onChange }: PassengerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [selectedCabinClass, setSelectedCabinClass] = useState<string>('economy');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPassengers = passengers.adults + passengers.children;
  const displayCabinClass = cabinClasses.find(c => c.value === selectedCabinClass)?.label || 'Economy';

  const handleUpdatePassengers = (type: keyof Passengers, change: number) => {
    const updatedPassengers = { ...passengers };
    
    // Apply constraints
    if (type === 'adults') {
      updatedPassengers.adults = Math.max(1, Math.min(9, passengers.adults + change));
      // Adjust infants if necessary (max 1 infant per adult)
      if (updatedPassengers.adults < updatedPassengers.infants) {
        updatedPassengers.infants = updatedPassengers.adults;
      }
    } else if (type === 'children') {
      const newCount = passengers.children + change;
      if (newCount >= 0 && totalPassengers + change <= 9) {
        updatedPassengers.children = newCount;
      }
    } else if (type === 'infants') {
      const newCount = passengers.infants + change;
      if (newCount >= 0 && newCount <= passengers.adults) {
        updatedPassengers.infants = newCount;
      }
    }
    
    setPassengers(updatedPassengers);
  };

  const handleApply = () => {
    onChange(passengers, selectedCabinClass);
    setIsOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format display text
  const getDisplayText = () => {
    let text = `${totalPassengers} `;
    text += totalPassengers === 1 ? 'Passenger' : 'Passengers';
    
    if (passengers.infants > 0) {
      text += `, ${passengers.infants} Infant${passengers.infants > 1 ? 's' : ''}`;
    }
    
    text += `, ${displayCabinClass}`;
    return text;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">{getDisplayText()}</span>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-apple border border-gray-100 z-50 p-4 animate-scale-in origin-top">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-900 mb-3">Passengers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Adults</div>
                    <div className="text-sm text-gray-500">12+ years</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleUpdatePassengers('adults', -1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        passengers.adults <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={passengers.adults <= 1}
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.adults}</span>
                    <button 
                      onClick={() => handleUpdatePassengers('adults', 1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        passengers.adults >= 9 || totalPassengers >= 9 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={passengers.adults >= 9 || totalPassengers >= 9}
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Children</div>
                    <div className="text-sm text-gray-500">2-11 years</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleUpdatePassengers('children', -1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        passengers.children <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={passengers.children <= 0}
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.children}</span>
                    <button 
                      onClick={() => handleUpdatePassengers('children', 1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        totalPassengers >= 9 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={totalPassengers >= 9}
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Infants</div>
                    <div className="text-sm text-gray-500">0-2 years</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleUpdatePassengers('infants', -1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        passengers.infants <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={passengers.infants <= 0}
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.infants}</span>
                    <button 
                      onClick={() => handleUpdatePassengers('infants', 1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-primary-600 transition-colors ${
                        passengers.infants >= passengers.adults ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={passengers.infants >= passengers.adults}
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-900 mb-3">Cabin Class</h3>
              <div className="space-y-2">
                {cabinClasses.map((cabinClass) => (
                  <label key={cabinClass.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cabinClass"
                      value={cabinClass.value}
                      checked={selectedCabinClass === cabinClass.value}
                      onChange={() => setSelectedCabinClass(cabinClass.value)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{cabinClass.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={handleApply} 
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector;
