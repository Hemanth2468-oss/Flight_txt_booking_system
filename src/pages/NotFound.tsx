
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-[180px] font-bold text-gray-100">404</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img 
                    src="https://public.readdy.ai/ai/img_res/7ddf678232c28e734c97b1d59b4477a9.jpg" 
                    alt="404" 
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
