
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600/10 to-secondary-500/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated with Travel Deals</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals, new destinations, and travel tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              disabled={isSubscribing}
              className="bg-primary-600 text-white hover:bg-primary-700 font-medium px-6 py-3"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-3">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from FlyElite.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
