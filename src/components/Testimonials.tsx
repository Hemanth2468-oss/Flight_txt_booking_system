
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      content: "FlyElite has completely transformed my business travel experience. The seamless booking process and personalized service have made my frequent trips stress-free.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Luxury Traveler",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      content: "The private jet experience was beyond expectations. From the moment I booked until landing, every detail was perfect. Worth every penny for the luxury and time saved.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Vacationer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      content: "Traveling with my family of 5 used to be a nightmare until we found FlyElite. Their family packages and attentive service made our vacation start the moment we booked.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of travelers choose FlyElite for their journey every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-14 w-14 rounded-full object-cover border-2 border-primary-600"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                className={`h-2.5 w-2.5 rounded-full ${dot === 1 ? 'bg-primary-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial page ${dot}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
