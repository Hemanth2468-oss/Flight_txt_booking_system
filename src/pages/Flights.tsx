
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import FlightResults from '../components/FlightResults';
import Footer from '../components/Footer';

const Flights = () => {
  const navigate = useNavigate();
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary-50 hover:text-primary-600 transition-all"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </div>
        
        {/* Promo Banner */}
        <div className="container mx-auto px-4 mb-6">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <Tag className="h-5 w-5 text-primary-600 mr-2" />
              <span className="text-sm md:text-base">
                <span className="font-medium">New user?</span> Get 20-50% off on your first booking with code <span className="font-mono font-bold text-primary-700">FIRSTFLY</span>
              </span>
            </div>
            <Button
              className="glow-button text-sm px-4 py-1 h-auto"
              onClick={() => navigate('/deals')}
            >
              View All Offers
            </Button>
          </div>
        </div>
        
        <FlightResults />
      </main>
      
      <Footer />
    </div>
  );
};

export default Flights;
