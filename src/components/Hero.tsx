
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import MultiCityModal from './MultiCityModal';

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

  const handleSearch = () => {
    // Navigate to flights page when search is clicked
    navigate('/flights');
  };

  const handleMultiCitySearch = (flights: Flight[]) => {
    console.log('Multi-city flights:', flights);
    // Navigate to flights page with multi-city data
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
    </section>
  );
};

export default Hero;
