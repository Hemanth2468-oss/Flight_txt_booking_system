
import { useState, useEffect, useRef } from 'react';
import { X, Tag, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterModalProps {
  onClose: () => void;
  onComplete: (userData: any) => void;
  flight?: any; // Make flight optional
  initialData?: any;
  promoCode?: string | null; // Add promoCode prop
  promoDiscount?: number; // Add promoDiscount prop
}

// Available promo codes (moved from FlightResults)
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

const RegisterModal = ({ onClose, onComplete, flight, initialData, promoCode: initialPromoCode, promoDiscount: initialPromoDiscount }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    passport: '',
    birthDate: ''
  });
  
  // Promo code states
  const [inputPromoCode, setInputPromoCode] = useState<string>(initialPromoCode || '');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(initialPromoCode);
  const [promoDiscount, setPromoDiscount] = useState<number>(initialPromoDiscount || 0);
  const [isValidPromoCode, setIsValidPromoCode] = useState<boolean>(!!initialPromoCode);
  const [modifiedFlight, setModifiedFlight] = useState(flight ? { ...flight } : null);
  
  const { toast } = useToast();
  const promoInputRef = useRef<HTMLInputElement>(null);
  
  // If initialData is provided, use it
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData
      });
    }
  }, [initialData]);
  
  // Initialize modified flight with discounted price if promo code exists
  useEffect(() => {
    if (flight && initialPromoCode && initialPromoDiscount) {
      applyDiscountToFlight(initialPromoDiscount);
    }
  }, [flight, initialPromoCode, initialPromoDiscount]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      promoCode: appliedPromoCode,
      promoDiscount: promoDiscount
    });
  };
  
  // Apply promo code function
  const applyPromoCode = () => {
    if (!inputPromoCode.trim()) return;
    
    const promoOffer = availablePromoCodes.find(
      promo => promo.code.toUpperCase() === inputPromoCode.toUpperCase()
    );
    
    if (promoOffer) {
      setAppliedPromoCode(inputPromoCode);
      setPromoDiscount(promoOffer.discount);
      setIsValidPromoCode(true);
      
      // Apply discount to flight
      applyDiscountToFlight(promoOffer.discount);
      
      toast({
        title: "Promo Code Applied!",
        description: `${promoOffer.discount}% discount applied to your booking.`,
      });
    } else {
      setIsValidPromoCode(false);
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive"
      });
    }
  };
  
  // Apply discount to flight
  const applyDiscountToFlight = (discount: number) => {
    if (!flight) return;
    
    const originalPrice = flight.originalPrice || flight.price;
    const discountAmount = originalPrice * (discount / 100);
    const discountedPrice = Math.round(originalPrice - discountAmount);
    
    setModifiedFlight({
      ...flight,
      originalPrice: originalPrice,
      price: discountedPrice
    });
  };
  
  // Reset promo code
  const resetPromoCode = () => {
    setInputPromoCode('');
    setAppliedPromoCode(null);
    setIsValidPromoCode(false);
    setPromoDiscount(0);
    
    // Reset flight price
    if (flight) {
      setModifiedFlight({
        ...flight,
        price: flight.originalPrice || flight.price,
        originalPrice: undefined
      });
    }
    
    toast({
      title: "Promo Code Removed",
      description: "Price has been reset to original value."
    });
    
    // Focus the input field after resetting
    if (promoInputRef.current) {
      promoInputRef.current.focus();
    }
  };
  
  // Get the flight to display (original or modified)
  const displayFlight = modifiedFlight || flight;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Register to Book Your Flight</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {displayFlight && (
          <div className="mb-6">
            <div className="bg-primary-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-lg mb-2">Flight Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {displayFlight.departure && (
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="font-medium">{displayFlight.departure.city} ({displayFlight.departure.code})</p>
                  </div>
                )}
                {displayFlight.arrival && (
                  <div>
                    <p className="text-sm text-gray-600">To</p>
                    <p className="font-medium">{displayFlight.arrival.city} ({displayFlight.arrival.code})</p>
                  </div>
                )}
                {displayFlight.departure && (
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{displayFlight.departure.date}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="font-medium">{displayFlight.airline} • {displayFlight.flightNo}</p>
                </div>
              </div>
              
              {/* Promo Code Section */}
              <div className="mt-4 border-t pt-4">
                <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                  Have a promo code?
                </label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="promo-code"
                    ref={promoInputRef}
                    type="text" 
                    placeholder="Enter promo code" 
                    value={inputPromoCode} 
                    onChange={(e) => setInputPromoCode(e.target.value)}
                    className="font-mono uppercase"
                    disabled={!!appliedPromoCode}
                  />
                  {!appliedPromoCode ? (
                    <Button 
                      onClick={applyPromoCode} 
                      className="glow-button whitespace-nowrap"
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={resetPromoCode}
                      className="whitespace-nowrap"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                {appliedPromoCode && isValidPromoCode && (
                  <div className="mt-2 bg-green-50 text-green-800 px-4 py-2 rounded-md flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">
                      <span className="font-medium">{promoDiscount}% discount</span> applied with code <span className="font-mono font-bold">{appliedPromoCode}</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 border-t pt-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Price</p>
                  <div className="text-right">
                    {displayFlight.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">{displayFlight.currency}{displayFlight.originalPrice}</p>
                    )}
                    <p className="font-bold text-primary-600">{displayFlight.currency}{displayFlight.price}</p>
                    {appliedPromoCode && promoDiscount && (
                      <p className="text-xs text-green-600">
                        You save: {displayFlight.currency}{displayFlight.originalPrice - displayFlight.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
              <input
                type="text"
                name="passport"
                value={formData.passport}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300"
            >
              Complete Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
