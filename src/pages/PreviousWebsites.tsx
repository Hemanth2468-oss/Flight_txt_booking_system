
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const websites = [
  {
    id: 1,
    name: 'Previous website 1',
    image: 'https://public.readdy.ai/ai/img_res/053291d09389daef261bdbc06ca33961.jpg',
    description: 'Our first website design featuring a clean and minimal interface.'
  },
  {
    id: 2,
    name: 'Previous website 2',
    image: 'https://public.readdy.ai/ai/img_res/75a6256134458ed047974a284ea61a7d.jpg',
    description: 'Second iteration with improved user experience and navigation.'
  },
  {
    id: 3,
    name: 'Previous website 3',
    image: 'https://public.readdy.ai/ai/img_res/4008b11c4dcc2594a99cba78207bde87.jpg',
    description: 'Third version with enhanced booking system and flight search.'
  },
  {
    id: 4,
    name: 'Previous website 4',
    image: 'https://public.readdy.ai/ai/img_res/aac519e36188876136bd69fa45859f05.jpg',
    description: 'Our most recent previous design with advanced features and responsive layout.'
  },
];

const PreviousWebsites = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 animate-fade-in">
              Our Previous Websites
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-600">
              Explore our journey through various website designs and experiences that have shaped our current platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {websites.map((website, index) => (
                <div 
                  key={website.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-60">
                    <img 
                      src={website.image} 
                      alt={website.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{website.name}</h3>
                    <p className="text-gray-600">{website.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviousWebsites;
