
import { useState } from 'react';

const destinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://public.readdy.ai/ai/img_res/527789f1559591b8e6660ed36d8e52e9.jpg',
    description: 'Experience the city of love and lights',
    price: 299,
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://public.readdy.ai/ai/img_res/e201c56399b1bf78a46e27bfe2405578.jpg',
    description: 'Discover the blend of tradition and future',
    price: 499,
  },
  {
    id: 3,
    city: 'New York',
    country: 'USA',
    image: 'https://public.readdy.ai/ai/img_res/767880d6ed5f93d651016180d26b925c.jpg',
    description: 'The city that never sleeps awaits',
    price: 399,
  },
];

const Destinations = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our most popular flight destinations with exclusive deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-apple transition-all duration-500 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={`${destination.city}, ${destination.country}`} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === destination.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-xs tracking-wider bg-primary-600/80 rounded-full px-3 py-1 backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-gray-900">
                    {destination.city}, <span className="text-gray-600">{destination.country}</span>
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-bold">From ${destination.price}</span>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 text-sm shadow-sm hover:shadow">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
