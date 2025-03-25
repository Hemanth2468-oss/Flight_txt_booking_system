
import { CalendarClock, Plane, Tag, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: <CalendarClock className="w-6 h-6 text-primary-600" />,
    title: 'Price Calendar',
    description: 'Find the best fares across dates',
  },
  {
    icon: <Plane className="w-6 h-6 text-primary-600" />,
    title: 'Flight Status',
    description: 'Track your flight in real-time',
  },
  {
    icon: <Tag className="w-6 h-6 text-primary-600" />,
    title: 'Special Offers',
    description: 'Exclusive deals and discounts',
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6 text-primary-600" />,
    title: '24/7 Support',
    description: 'Here to help anytime',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mb-5 bg-primary-50 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300 shadow-sm group-hover:shadow">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
