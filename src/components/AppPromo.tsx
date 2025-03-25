
import { AppleIcon, SmartphoneIcon } from 'lucide-react';

const AppPromo = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Our App</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get exclusive mobile-only deals and manage your trips on the go
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-apple bg-white animate-scale-in">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Book on the go with our mobile app
              </h3>
              <p className="text-gray-600 mb-8">
                Access exclusive mobile-only deals, receive real-time flight alerts, and manage your bookings with ease—all from your smartphone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow">
                  <AppleIcon className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="text-sm font-medium">App Store</span>
                  </div>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow">
                  <SmartphoneIcon className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Get it on</span>
                    <span className="text-sm font-medium">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <img 
                src="https://public.readdy.ai/ai/img_res/c27475acad630475743a35ff04f8918f.jpg" 
                alt="Mobile App" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent md:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
