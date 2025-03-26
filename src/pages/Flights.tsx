
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Button>
        </div>
        <FlightResults />
      </main>
      
      <Footer />
    </div>
  );
};

export default Flights;
