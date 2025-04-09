
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { ArrowRight, Tag, Plane, Calendar, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Deals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle booking with promo code
  const handleBookWithPromo = (promoCode: string) => {
    navigate(`/flights?promo=${promoCode}`);
    
    toast({
      title: "Promo Code Selected",
      description: `You've selected the ${promoCode} promo. It will be automatically applied to your booking.`,
    });
  };
  
  // Copy promo code to clipboard
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    toast({
      title: "Promo Code Copied",
      description: `${code} has been copied to your clipboard.`,
    });
  };
  
  const featuredDeals = [
    {
      id: 1,
      title: "First-Time Flyer Discount",
      description: "Get 20% off on your first booking with Fly Elite",
      code: "FIRSTFLY20",
      expiryDate: "2023-12-31",
      discount: "20%",
      icon: Plane,
      color: "bg-blue-50 border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: 2,
      title: "Weekend Getaway Special",
      description: "Save up to 15% on weekend flights to popular destinations",
      code: "WEEKEND15",
      expiryDate: "2023-10-31",
      discount: "15%",
      icon: Calendar,
      color: "bg-purple-50 border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: 3,
      title: "Credit Card Partner Offer",
      description: "Extra 10% discount when you pay with our partner banks",
      code: "CARDOFR10",
      expiryDate: "2023-11-30",
      discount: "10%",
      icon: CreditCard,
      color: "bg-green-50 border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];
  
  const regularDeals = [
    {
      id: 4,
      title: "Monsoon Travel Sale",
      description: "Special fares for monsoon travel season",
      discount: "Up to 25%",
      code: "MONSOON25",
      validity: "Valid till 31 Aug 2023"
    },
    {
      id: 5,
      title: "Student Discount",
      description: "Special fares for students with valid ID",
      discount: "12%",
      code: "STUDENT12",
      validity: "Valid all year"
    },
    {
      id: 6,
      title: "Senior Citizen Offer",
      description: "Special discounts for travelers above 60 years",
      discount: "10%",
      code: "SENIOR10",
      validity: "Valid all year"
    },
    {
      id: 7,
      title: "Group Booking Discount",
      description: "Special rates for group bookings of 10+ passengers",
      discount: "Up to 15%",
      code: "GROUP15",
      validity: "Subject to availability"
    },
    {
      id: 8,
      title: "Last Minute Deals",
      description: "Grab special fares on last-minute bookings",
      discount: "Varies",
      code: "LASTMIN",
      validity: "Subject to availability"
    },
    {
      id: 9,
      title: "Family Vacation Package",
      description: "Special rates for family bookings with children",
      discount: "Up to 12%",
      code: "FAMILY12",
      validity: "Valid till 31 Dec 2023"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Deals & Offers</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">Discover our latest promotions and save on your next journey</p>
              <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-yellow-300" />
                  <p className="text-sm md:text-base font-medium">
                    <span className="text-yellow-300 font-bold">NEW:</span> 20-50% off on your first booking with code <span className="font-mono bg-white/20 px-2 py-1 rounded text-white font-bold">FIRSTFLY</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ transform: 'translateY(50%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#f9fafb" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,133.3C672,107,768,85,864,96C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        {/* Featured Deals */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Featured Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className={`${deal.color} border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white p-3 rounded-full">
                      <deal.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="inline-block bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full">-{deal.discount}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  
                  <div className="bg-white rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Promo Code:</p>
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-lg font-bold">{deal.code}</code>
                      <button 
                        className="text-primary-600 text-sm hover:underline"
                        onClick={() => copyPromoCode(deal.code)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">Valid until: {deal.expiryDate}</p>
                  
                  <button 
                    className={`w-full py-2.5 ${deal.buttonColor} text-white rounded-button glow-button hover:shadow-lg transition-all duration-300`}
                    onClick={() => handleBookWithPromo(deal.code)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* First Booking Offer Banner */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-white text-2xl font-bold mb-2">First-Time Booking Special</h3>
                <p className="text-white/80 mb-4">Get an amazing 20-50% discount on your first flight booking with us</p>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded px-4 py-2 mb-4">
                  <span className="text-white">Use code: </span>
                  <span className="font-mono font-bold text-yellow-300">FIRSTFLY50</span>
                </div>
              </div>
              <Button 
                className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-2.5 h-auto font-medium glow-button"
                onClick={() => handleBookWithPromo('FIRSTFLY50')}
              >
                Book with Discount <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* More Deals */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">More Offers</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold">{deal.title}</h3>
                      <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">{deal.discount}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{deal.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{deal.validity}</p>
                    <p className="text-sm mb-4">Code: <span className="font-mono font-medium">{deal.code}</span></p>
                  </div>
                  <div className="px-6 pb-4">
                    <button 
                      className="w-full py-2 border border-primary-600 text-primary-600 rounded-button hover:bg-primary-50 transition-colors duration-200 glow-button"
                      onClick={() => handleBookWithPromo(deal.code)}
                    >
                      Book with this Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* How to use */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How to Redeem Offers</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Choose a Deal</h3>
                <p className="text-gray-600">Select from our available offers that best suits your travel needs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Copy Promo Code</h3>
                <p className="text-gray-600">Copy the promo code provided with the deal</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Apply at Checkout</h3>
                <p className="text-gray-600">Enter the promo code during the booking process to get the discount</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-2.5 h-auto rounded-button glow-button"
                onClick={() => navigate('/flights')}
              >
                Browse Flights <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;
