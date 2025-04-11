
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Globe, Clock, HeartHandshake } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-500/20 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About FlyElite</h1>
              <p className="text-xl text-gray-700 mb-8">
                Redefining luxury travel with exceptional service and unmatched experiences
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, FlyElite was born from a vision to transform the way people experience air travel. Our founders, seasoned aviation experts with over 50 years of combined experience, recognized a gap in the market for truly personalized, hassle-free travel services.
                </p>
                <p className="text-gray-700 mb-4">
                  What began as a boutique service for discerning business travelers has evolved into a comprehensive travel platform serving thousands of clients worldwide. Through strategic partnerships with premier airlines and private jet operators, we've created a seamless ecosystem that caters to every aspect of luxury travel.
                </p>
                <p className="text-gray-700">
                  Today, FlyElite stands at the forefront of the industry, continuously innovating to exceed the expectations of modern travelers while maintaining our founding principles of excellence, integrity, and personalized service.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1700&auto=format&fit=crop" 
                  alt="FlyElite headquarters" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at FlyElite
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Safety</h3>
                    <p className="text-gray-600">
                      We prioritize the safety and security of our clients above all else, maintaining the highest standards in every aspect of our operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <Award className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                    <p className="text-gray-600">
                      We are committed to delivering exceptional service in every interaction, continuously raising the bar for luxury travel experiences.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Client-Centered</h3>
                    <p className="text-gray-600">
                      Every decision we make is guided by our dedication to understanding and exceeding the unique needs of each client we serve.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <Globe className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Global Perspective</h3>
                    <p className="text-gray-600">
                      We embrace diversity and maintain a global outlook, connecting cultures and destinations with a deep respect for local communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Efficiency</h3>
                    <p className="text-gray-600">
                      We value our clients' time and strive to create streamlined, efficient processes without compromising on quality or attention to detail.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary-100 p-3 rounded-full mb-4">
                      <HeartHandshake className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                    <p className="text-gray-600">
                      We are committed to responsible business practices and continually work to minimize our environmental impact while supporting local communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the experienced professionals leading FlyElite to new heights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alexander Reynolds",
                  role: "Chief Executive Officer",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
                  bio: "Former airline executive with 20+ years of experience in the aviation industry."
                },
                {
                  name: "Sophia Chen",
                  role: "Chief Operations Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
                  bio: "Aviation logistics expert who has transformed our operational efficiency and customer experience."
                },
                {
                  name: "Marcus Johnson",
                  role: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
                  bio: "Tech innovator driving FlyElite's digital transformation and customer-facing platforms."
                },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
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

export default AboutUs;
