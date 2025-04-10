
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Destinations from '../components/Destinations';
import Benefits from '../components/Benefits';
import AppPromo from '../components/AppPromo';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import { Star, Shield, PlaneTakeoff, Sparkles, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  // Check if user is an Elite member
  const [isEliteMember, setIsEliteMember] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Check Elite membership status
    const eliteMembership = localStorage.getItem('eliteChipMember');
    const eliteUserDetails = localStorage.getItem('eliteChipUserDetails');
    
    if (eliteMembership === 'true') {
      setIsEliteMember(true);
      if (eliteUserDetails) {
        setUserDetails(JSON.parse(eliteUserDetails));
      }
    }
  }, []);
  
  // Handle exit from Elite membership
  const handleExitElite = () => {
    localStorage.removeItem('eliteChipMember');
    localStorage.removeItem('eliteChipUserDetails');
    setIsEliteMember(false);
    setUserDetails(null);
    
    toast({
      title: "Elite Membership Cancelled",
      description: "You've successfully exited the Elite Chip program.",
      variant: "default",
    });
    
    // Refresh the page to update all components
    window.location.reload();
  };
  
  return (
    <div className={`flex flex-col min-h-screen ${isEliteMember ? 'bg-gradient-to-br from-[#1A1F2C]/10 to-[#6E59A5]/10' : 'bg-white'}`}>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
        
        {isEliteMember && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] rounded-lg p-6 text-white shadow-lg transform hover:scale-[1.01] transition-all duration-300 relative">
              <button 
                onClick={handleExitElite}
                className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/30 hover:bg-black/50 rounded-full text-sm transition-all duration-200"
                title="Exit Elite Membership"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Exit Elite</span>
              </button>
              
              <div className="flex items-center mb-4">
                <div className="bg-[#6E59A5] p-2 rounded-full mr-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold font-serif">Welcome to Your Elite Experience, {userDetails?.firstName || 'Elite Member'}</h2>
              </div>
              <p className="text-white/90 mb-6 italic">
                "Experience luxury at every step of your journey with exclusive Elite Chip privileges."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-inner transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-white" />
                    <p className="font-medium">Premium Support</p>
                  </div>
                  <p className="text-white/80 text-xs">24/7 dedicated personal assistance for all your travel needs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-inner transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-white" />
                    <p className="font-medium">Exclusive Discounts</p>
                  </div>
                  <p className="text-white/80 text-xs">Up to 15% off on all bookings, including private jets</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-inner transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <PlaneTakeoff className="h-5 w-5 text-white" />
                    <p className="font-medium">Priority Services</p>
                  </div>
                  <p className="text-white/80 text-xs">Skip the lines with expedited check-in and boarding</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full inline-flex items-center">
                  <span className="text-white font-bold mr-1">ELITE</span>
                  <span className="text-white/80 text-xs">MEMBER SINCE APR 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Features />
        <Destinations />
        <Benefits />
        <AppPromo />
        <Partners />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
