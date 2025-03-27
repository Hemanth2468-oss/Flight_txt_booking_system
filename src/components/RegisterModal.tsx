
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface RegisterModalProps {
  onClose: () => void;
  onComplete: (userData: any) => void;
  flight?: any; // Make flight optional
  initialData?: any;
  promoCode?: string | null; // Add promoCode prop
  promoDiscount?: number; // Add promoDiscount prop
}

const RegisterModal = ({ onClose, onComplete, flight, initialData, promoCode, promoDiscount }: RegisterModalProps) => {
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
  
  // If initialData is provided, use it
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData
      });
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };
  
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
        
        {flight && (
          <div className="mb-6">
            <div className="bg-primary-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-lg mb-2">Flight Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {flight.departure && (
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="font-medium">{flight.departure.city} ({flight.departure.code})</p>
                  </div>
                )}
                {flight.arrival && (
                  <div>
                    <p className="text-sm text-gray-600">To</p>
                    <p className="font-medium">{flight.arrival.city} ({flight.arrival.code})</p>
                  </div>
                )}
                {flight.departure && (
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{flight.departure.date}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="font-medium">{flight.airline} • {flight.flightNo}</p>
                </div>
              </div>
              <div className="mt-2 border-t pt-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Price</p>
                  <div className="text-right">
                    {flight.originalPrice && promoDiscount && (
                      <p className="text-sm text-gray-500 line-through">${flight.originalPrice}</p>
                    )}
                    <p className="font-bold text-primary-600">${flight.price}</p>
                    {promoCode && promoDiscount && (
                      <p className="text-xs text-green-600">
                        {promoDiscount}% off with code <span className="font-mono">{promoCode}</span>
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
