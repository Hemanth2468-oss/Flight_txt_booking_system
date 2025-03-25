
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Destinations from '../components/Destinations';
import Benefits from '../components/Benefits';
import AppPromo from '../components/AppPromo';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Index = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
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
