
import { ShieldCheck, CreditCard, Clock, RefreshCcw } from 'lucide-react';

const benefits = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-primary-600" />,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it!'
  },
  {
    icon: <CreditCard className="w-7 h-7 text-primary-600" />,
    title: 'Secure Booking',
    description: 'Your data is always protected'
  },
  {
    icon: <Clock className="w-7 h-7 text-primary-600" />,
    title: '24/7 Support',
    description: 'We\'re here whenever you need us'
  },
  {
    icon: <RefreshCcw className="w-7 h-7 text-primary-600" />,
    title: 'Easy Cancellation',
    description: 'Flexible booking options'
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We're committed to making your travel experience exceptional from start to finish
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mb-5 bg-primary-50 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-primary-100 shadow-sm group-hover:shadow">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
