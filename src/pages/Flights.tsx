
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightResults from '../components/FlightResults';
import Footer from '../components/Footer';

const Flights = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <FlightResults />
      </main>
      
      <Footer />
    </div>
  );
};

export default Flights;
