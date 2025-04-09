
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Destinations from '../components/Destinations';
import Benefits from '../components/Benefits';
import AppPromo from '../components/AppPromo';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Index = () => {
  // Check if user is an Elite member
  const [isEliteMember, setIsEliteMember] = useState(false);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Check Elite membership status
    const eliteMembership = localStorage.getItem('eliteChipMember');
    if (eliteMembership) {
      setIsEliteMember(true);
    }
  }, []);
  
  return (
    <div className={`flex flex-col min-h-screen ${isEliteMember ? 'bg-gradient-to-br from-[#1A1F2C]/5 to-[#6E59A5]/5' : 'bg-white'}`}>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
        {isEliteMember && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] rounded-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="bg-[#FFD700] p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1A1F2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">Welcome to Elite Experience</h2>
              </div>
              <p className="text-white/80 mb-4">
                As an Elite Chip member, you now have access to exclusive benefits and premium services.
                Enjoy priority boarding, lounge access, and special discounts on all your bookings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 p-3 rounded">
                  <p className="font-medium">Premium Support</p>
                  <p className="text-white/70">24/7 dedicated assistance</p>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <p className="font-medium">Exclusive Discounts</p>
                  <p className="text-white/70">Up to 15% off on all bookings</p>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <p className="font-medium">Priority Services</p>
                  <p className="text-white/70">Skip the lines at airports</p>
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
