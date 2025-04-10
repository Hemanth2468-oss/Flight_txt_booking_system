
import { useState } from 'react';
import { PlaneTakeoff, Users, Globe, Gauge, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CharterBookingForm from './CharterBookingForm';

const PrivateJets = () => {
  const [selectedJet, setSelectedJet] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Check if user is Elite member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  
  const jets = [
    {
      id: "citation-x",
      name: "Citation X",
      image: "https://public.readdy.ai/ai/img_res/ef172d45c5dfadabe598b1de58f88aff.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494426383302-7b9d36a1a028?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598016736404-19ff4b2836c5?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "One of the fastest private jets, perfect for executives who need to travel quickly.",
      passengers: 8,
      range: "3,700 miles",
      speed: "Mach 0.935",
      price: isEliteMember ? "$15,300/hour" : "$18,000/hour",
    },
    {
      id: "gulfstream-g650",
      name: "Gulfstream G650",
      image: "https://public.readdy.ai/ai/img_res/89aba3c9dcdb267ed0b2b8c02e18f76e.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1604342427263-11a3ab5c68e7?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525006878758-cf233a0932ab?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1480150458580-b97ebc75dbea?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Ultra-long-range jet offering exceptional comfort and performance for intercontinental travel.",
      passengers: 14,
      range: "7,500 miles",
      speed: "Mach 0.925",
      price: isEliteMember ? "$12,750/hour" : "$15,000/hour",
    },
    {
      id: "bombardier-global-7500",
      name: "Bombardier Global 7500",
      image: "https://public.readdy.ai/ai/img_res/85d9dcad4518b31b3fd8723fc8a3db73.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1487246457841-39b9e296df83?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "The industry's largest and longest-range business jet, offering unmatched luxury.",
      passengers: 16,
      range: "7,700 miles",
      speed: "Mach 0.925",
      price: isEliteMember ? "$13,600/hour" : "$16,000/hour",
    },
    {
      id: "dassault-falcon-8x",
      name: "Dassault Falcon 8X",
      image: "https://public.readdy.ai/ai/img_res/0a97b84d50bb65c0b0bbfcd3ca32cf44.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1569953391543-5d8a3f54e26c?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Tri-jet design with impressive range and the ability to access challenging airports.",
      passengers: 12,
      range: "6,450 miles",
      speed: "Mach 0.90",
      price: isEliteMember ? "$10,200/hour" : "$12,000/hour",
    },
    {
      id: "embraer-phenom-300",
      name: "Embraer Phenom 300",
      image: "https://public.readdy.ai/ai/img_res/29a08f7dddf19ce97be34e9d56a98e08.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Light jet with excellent performance and comfortable cabin for shorter trips.",
      passengers: 7,
      range: "2,000 miles",
      speed: "Mach 0.78", 
      price: isEliteMember ? "$4,250/hour" : "$5,000/hour",
    },
    {
      id: "cessna-caravan",
      name: "Cessna Grand Caravan",
      image: "https://public.readdy.ai/ai/img_res/909ca2e7dd3fe1b58a0f4d4fbd66143e.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1507812984078-917a274065be?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621886292650-520f76c747d6?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Versatile turboprop aircraft ideal for short-distance trips and unique destinations.",
      passengers: 10,
      range: "1,200 miles",
      speed: "210 mph",
      price: isEliteMember ? "$1,700/hour" : "$2,000/hour",
    },
    {
      id: "pilatus-pc24",
      name: "Pilatus PC-24",
      image: "https://public.readdy.ai/ai/img_res/bcf80c81b85f4e42fd2cfa18e55b5ec4.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588156979401-db19f1458ad5?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Versatile jet that can land on short runways, perfect for accessing remote locations.",
      passengers: 8,
      range: "2,000 miles",
      speed: "440 mph",
      price: isEliteMember ? "$4,250/hour" : "$5,000/hour",
    },
    {
      id: "learjet-75",
      name: "Learjet 75 Liberty",
      image: "https://public.readdy.ai/ai/img_res/4daaa79f98835eaaa0eeca2c5c4e4b03.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533709143609-3afa140c4283?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Iconic performance with legendary Learjet handling and efficiency.",
      passengers: 9,
      range: "2,080 miles",
      speed: "Mach 0.81",
      price: isEliteMember ? "$5,525/hour" : "$6,500/hour",
    },
    {
      id: "hawker-4000",
      name: "Hawker 4000",
      image: "https://public.readdy.ai/ai/img_res/b66e40a59f1ba5f33a994f49a79f3a91.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1536048810607-3dc7f86981cb?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Super-midsize jet with a spacious cabin and transcontinental range.",
      passengers: 8,
      range: "3,280 miles",
      speed: "Mach 0.84",
      price: isEliteMember ? "$7,650/hour" : "$9,000/hour",
    },
    {
      id: "challenger-650",
      name: "Bombardier Challenger 650",
      image: "https://public.readdy.ai/ai/img_res/aad2e04733fa0e9d8c6f97b583e3caec.jpg",
      galleryImages: [
        "https://images.unsplash.com/photo-1529633874033-63e141f14bdc?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591281700819-900258b1423d?q=80&w=1700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599666332659-d632beb0d48a?q=80&w=1700&auto=format&fit=crop",
      ],
      description: "Spacious cabin with exceptional comfort for intercontinental travel.",
      passengers: 12,
      range: "4,000 miles",
      speed: "Mach 0.85",
      price: isEliteMember ? "$8,500/hour" : "$10,000/hour",
    },
  ];
  
  const handleBookCharter = (jet: any) => {
    setSelectedJet(jet);
    setIsBookingOpen(true);
  };
  
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isEliteMember ? 'text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5]' : 'text-gray-900'}`}>
            Private Jet Charter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the ultimate in luxury and convenience with our exclusive fleet of private jets, available for charter to destinations worldwide.
          </p>
          
          {isEliteMember && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#1A1F2C]/10 to-[#6E59A5]/10 rounded-lg inline-block">
              <p className="text-sm text-gray-800 flex items-center">
                <PlaneTakeoff className="h-4 w-4 text-[#FFD700] mr-2" />
                <span className="font-medium">Elite Chip Member Discount Applied: <span className="text-[#6E59A5]">15% Off</span></span>
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jets.map((jet) => (
            <div 
              key={jet.id}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                isEliteMember ? 'border border-[#6E59A5]/20' : 'border border-gray-200'
              }`}
            >
              <div className="relative h-56 group overflow-hidden">
                {/* Main jet image */}
                <img src={jet.image} alt={jet.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                
                {/* Gallery image overlay on hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-2">
                    {jet.galleryImages && jet.galleryImages.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-md overflow-hidden border-2 border-white hover:border-[#FFD700] transition-all duration-200">
                        <img src={image} alt={`${jet.name} interior ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {isEliteMember && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-white text-xs font-bold rounded">
                    15% OFF
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{jet.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{jet.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{jet.passengers} passengers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{jet.range}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 col-span-2">
                    <Gauge className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{jet.speed}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-5">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className={`text-xl font-bold ${isEliteMember ? 'text-[#6E59A5]' : 'text-gray-900'}`}>
                      {jet.price}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => handleBookCharter(jet)} 
                    className={`${
                      isEliteMember 
                        ? 'bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] text-white hover:opacity-90' 
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    Book Charter
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedJet && isBookingOpen && (
        <CharterBookingForm 
          jet={selectedJet} 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </section>
  );
};

export default PrivateJets;
