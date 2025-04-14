
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import PrivateJetsComponent from '../components/PrivateJets';
import Footer from '../components/Footer';

const Charter = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <PrivateJetsComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default Charter;
