
const partners = [
  {
    id: 1,
    name: 'Partner 1',
    image: 'https://public.readdy.ai/ai/img_res/053291d09389daef261bdbc06ca33961.jpg',
  },
  {
    id: 2,
    name: 'Partner 2',
    image: 'https://public.readdy.ai/ai/img_res/75a6256134458ed047974a284ea61a7d.jpg',
  },
  {
    id: 3,
    name: 'Partner 3',
    image: 'https://public.readdy.ai/ai/img_res/4008b11c4dcc2594a99cba78207bde87.jpg',
  },
  {
    id: 4,
    name: 'Partner 4',
    image: 'https://public.readdy.ai/ai/img_res/aac519e36188876136bd69fa45859f05.jpg',
  },
];

const Partners = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 animate-fade-in">
          Our Trusted Partners
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner, index) => (
            <div 
              key={partner.id} 
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={partner.image} 
                alt={partner.name} 
                className="h-10 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
