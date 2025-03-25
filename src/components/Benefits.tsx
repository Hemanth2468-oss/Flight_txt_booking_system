
import { ShieldCheck, Clock, CreditCard, Award } from 'lucide-react';

const Benefits = () => {
  // Array of benefits with proper syntax
  const benefits = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary-600" />,
      title: "Secure Booking",
      description: "Your personal and payment information is always protected with advanced encryption."
    },
    {
      icon: <Clock className="w-12 h-12 text-primary-600" />,
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to assist with any needs."
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary-600" />,
      title: "Flexible Payment",
      description: "Choose from multiple payment options and pay in installments for select flights."
    },
    {
      icon: <Award className="w-12 h-12 text-primary-600" />,
      title: "Premium Experience",
      description: "Enjoy exclusive benefits, loyalty rewards, and a hassle-free travel experience."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fly Elite</h2>
          <p className="text-lg text-gray-600">
            We provide premium service with attention to every detail of your journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
