
import { Plane, ShieldCheck, Star, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface JetOption {
  id: string;
  name: string;
  image: string;
  capacity: string;
  range: string;
  price: number;
}

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
  }
];

const PrivateJets = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleBookJet = (jet: JetOption) => {
    toast({
      title: "Private Jet Booking Request",
      description: `Your request for the ${jet.name} has been received. Our team will contact you shortly.`,
      variant: "default",
      duration: 5000,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Private Jet Charter</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the ultimate in luxury and convenience with our private jet charter service. 
          Fly on your schedule with bespoke amenities and personalized service.
        </p>
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
        {privateJets.map((jet) => (
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
                  ₹{jet.price.toLocaleString()} per hour
                </p>
              </div>
              <Button 
                className="w-full bg-[#8B5CF6] hover:bg-[#7E69AB]"
                onClick={() => handleBookJet(jet)}
              >
                Request Charter
              </Button>
            </div>
          </div>
        ))}
      </div>
      
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
    </div>
  );
};

export default PrivateJets;
