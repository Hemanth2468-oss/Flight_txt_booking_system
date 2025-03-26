
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import MultiCityModal from './MultiCityModal';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface Flight {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
}

const Hero = () => {
  const navigate = useNavigate();
  const [isMultiCityModalOpen, setIsMultiCityModalOpen] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('flyEliteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = () => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('flyEliteUser');
    
    if (!storedUser) {
      // If not logged in, show login dialog
      setIsLoginRequired(true);
    } else {
      // If logged in, navigate to flights page
      navigate('/flights');
    }
  };

  const handleMultiCitySearch = (flights: Flight[]) => {
    console.log('Multi-city flights:', flights);
    
    // Store multi-city flight data in localStorage
    localStorage.setItem('flyEliteMultiCityData', JSON.stringify(flights));
    
    // Check if user is logged in
    const storedUser = localStorage.getItem('flyEliteUser');
    
    if (!storedUser) {
      // If not logged in, show login dialog
      setIsLoginRequired(true);
    } else {
      // If logged in, navigate to flights page
      navigate('/flights');
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginRequired(false);
    // Navigate to flights page
    navigate('/flights');
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center py-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://public.readdy.ai/ai/img_res/7ddf678232c28e734c97b1d59b4477a9.jpg" 
          alt="Airplane view" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white mb-10 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
            Experience the Joy of Premium Travel
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Find and book the perfect flight to your dream destination
          </p>
        </div>
        
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {/* Multi-city modal */}
      <MultiCityModal 
        isOpen={isMultiCityModalOpen}
        onClose={() => setIsMultiCityModalOpen(false)}
        onSearch={handleMultiCitySearch}
      />

      {/* Login Required Dialog */}
      <AlertDialog open={isLoginRequired} onOpenChange={setIsLoginRequired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please sign in to continue with your flight search and booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button 
                onClick={handleLoginRedirect}
                className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300"
              >
                Continue to Flights
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Hero;
