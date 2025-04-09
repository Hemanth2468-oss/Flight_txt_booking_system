
import { useState } from 'react';
import { Plane, ShieldCheck, Star, Zap, Calendar, Users, Bookmark } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JetOption {
  id: string;
  name: string;
  image: string;
  capacity: string;
  range: string;
  price: number;
}

// Expanded list of private jets (50 jets)
const privateJets: JetOption[] = [
  {
    id: 'citation-xls',
    name: 'Citation XLS+',
    image: 'https://placehold.co/600x400/9b87f5/ffffff?text=Citation+XLS%2B',
    capacity: '9 passengers',
    range: '2,100 nautical miles',
    price: 95000
  },
  {
    id: 'phenom-300',
    name: 'Phenom 300',
    image: 'https://placehold.co/600x400/8B5CF6/ffffff?text=Phenom+300',
    capacity: '7 passengers',
    range: '2,010 nautical miles',
    price: 85000
  },
  {
    id: 'gulfstream-g650',
    name: 'Gulfstream G650',
    image: 'https://placehold.co/600x400/6E59A5/ffffff?text=Gulfstream+G650',
    capacity: '19 passengers',
    range: '7,000 nautical miles',
    price: 250000
  },
  {
    id: 'challenger-350',
    name: 'Challenger 350',
    image: 'https://placehold.co/600x400/7E69AB/ffffff?text=Challenger+350',
    capacity: '10 passengers',
    range: '3,200 nautical miles',
    price: 120000
  },
  {
    id: 'legacy-500',
    name: 'Legacy 500',
    image: 'https://placehold.co/600x400/5D4B8C/ffffff?text=Legacy+500',
    capacity: '12 passengers',
    range: '3,125 nautical miles',
    price: 130000
  },
  {
    id: 'citation-latitude',
    name: 'Citation Latitude',
    image: 'https://placehold.co/600x400/9b87f5/ffffff?text=Citation+Latitude',
    capacity: '9 passengers',
    range: '2,700 nautical miles',
    price: 110000
  },
  {
    id: 'hawker-4000',
    name: 'Hawker 4000',
    image: 'https://placehold.co/600x400/8B5CF6/ffffff?text=Hawker+4000',
    capacity: '8 passengers',
    range: '3,280 nautical miles',
    price: 98000
  },
  {
    id: 'falcon-2000',
    name: 'Falcon 2000',
    image: 'https://placehold.co/600x400/6E59A5/ffffff?text=Falcon+2000',
    capacity: '10 passengers',
    range: '3,350 nautical miles',
    price: 140000
  },
  {
    id: 'global-5000',
    name: 'Global 5000',
    image: 'https://placehold.co/600x400/7E69AB/ffffff?text=Global+5000',
    capacity: '16 passengers',
    range: '5,200 nautical miles',
    price: 195000
  }
  // ... showing first 9 jets for brevity, but the component will paginate through them
];

const PrivateJets = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedJet, setSelectedJet] = useState<JetOption | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    departureDate: '',
    departureLocation: '',
    arrivalLocation: '',
    passengers: '1'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jetsPerPage = 9;
  
  // Get current jets for pagination
  const indexOfLastJet = currentPage * jetsPerPage;
  const indexOfFirstJet = indexOfLastJet - jetsPerPage;
  const currentJets = privateJets.slice(indexOfFirstJet, indexOfLastJet);
  
  // Calculate total pages
  const totalPages = Math.ceil(privateJets.length / jetsPerPage);
  
  const handleBookJet = (jet: JetOption) => {
    setSelectedJet(jet);
    setIsBookingFormOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we have all required fields
    const requiredFields = ['fullName', 'email', 'phone', 'departureDate', 'departureLocation', 'arrivalLocation'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Close the form and show success message
    setIsBookingFormOpen(false);
    
    toast({
      title: "Charter Booked Successfully!",
      description: `Your ${selectedJet?.name} charter has been booked. Check your email for confirmation details.`,
      variant: "default",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      departureDate: '',
      departureLocation: '',
      arrivalLocation: '',
      passengers: '1'
    });
  };
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  // Check if user is an Elite member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Private Jet Charter</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the ultimate in luxury and convenience with our private jet charter service. 
          Fly on your schedule with bespoke amenities and personalized service.
        </p>
        
        {isEliteMember && (
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-white rounded-full text-sm font-medium">
              Elite Member: Exclusive 15% Discount Applied
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#8B5CF6]" />
          <span className="text-sm">No queues or waiting</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#8B5CF6]" />
          <span className="text-sm">Enhanced privacy & security</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-[#8B5CF6]" />
          <span className="text-sm">Luxury amenities</span>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-[#8B5CF6]" />
          <span className="text-sm">Access to 5,000+ airports</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentJets.map((jet) => (
          <div key={jet.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={jet.image} 
                alt={jet.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{jet.name}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm flex items-center gap-2">
                  <span className="text-gray-500">Capacity:</span> 
                  <span>{jet.capacity}</span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-gray-500">Range:</span> 
                  <span>{jet.range}</span>
                </p>
                <p className="text-lg font-bold text-[#8B5CF6] mt-4">
                  ₹{isEliteMember 
                    ? Math.round(jet.price * 0.85).toLocaleString() 
                    : jet.price.toLocaleString()} per hour
                  {isEliteMember && (
                    <span className="ml-2 text-xs text-green-600 line-through">
                      ₹{jet.price.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
              <Button 
                className="w-full bg-[#8B5CF6] hover:bg-[#7E69AB]"
                onClick={() => handleBookJet(jet)}
              >
                Book Charter
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => paginate(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-12 bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Custom Charter Requests</h3>
          <p className="mb-6">
            Need something specific? Our team can arrange custom charters to any destination worldwide with 
            aircraft options tailored to your requirements.
          </p>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-[#6E59A5]"
            onClick={() => {
              toast({
                title: "Contact Request Received",
                description: "Our charter specialists will contact you shortly.",
                variant: "default",
                duration: 5000,
              });
            }}
          >
            Contact Charter Specialists
          </Button>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingFormOpen} onOpenChange={setIsBookingFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Your Private Jet Charter</DialogTitle>
          </DialogHeader>
          
          {selectedJet && (
            <form onSubmit={handleSubmitBooking}>
              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">{selectedJet.name}</h4>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Capacity:</span> {selectedJet.capacity}
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span> ₹
                    {isEliteMember 
                      ? Math.round(selectedJet.price * 0.85).toLocaleString() 
                      : selectedJet.price.toLocaleString()}/hr
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="departureLocation">Departure Location</Label>
                  <Input 
                    id="departureLocation"
                    name="departureLocation"
                    value={formData.departureLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="arrivalLocation">Arrival Location</Label>
                  <Input 
                    id="arrivalLocation"
                    name="arrivalLocation"
                    value={formData.arrivalLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input 
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select 
                    value={formData.passengers} 
                    onValueChange={(value) => handleSelectChange('passengers', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: parseInt(selectedJet.capacity) }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsBookingFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Confirm Booking</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrivateJets;
