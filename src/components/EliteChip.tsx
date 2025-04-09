
import { useState, useEffect } from 'react';
import { Badge, Shield, Star, Sparkles, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const EliteChip = () => {
  const [open, setOpen] = useState(false);
  const [isEliteMember, setIsEliteMember] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is already an Elite member
  useEffect(() => {
    const eliteMembership = localStorage.getItem('eliteChipMember');
    if (eliteMembership) {
      setIsEliteMember(true);
    }
  }, []);
  
  const handleJoin = () => {
    setOpen(false);
    // Store Elite membership in localStorage
    localStorage.setItem('eliteChipMember', 'true');
    setIsEliteMember(true);
    
    toast({
      title: "Welcome to Elite Chip!",
      description: "You've successfully joined our premium loyalty program.",
      variant: "default",
      duration: 5000,
    });
    
    // Redirect to home page to show premium experience
    navigate('/');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={`${isEliteMember ? 'bg-gradient-to-r from-[#FFD700] to-[#B8860B]' : 'bg-gradient-to-r from-[#6E59A5] to-[#9b87f5]'} 
          text-white border-none hover:from-[#8B5CF6] hover:to-[#D6BCFA] hover:text-white flex items-center gap-2 shadow-sm py-2`}
        >
          <Shield className="h-4 w-4" />
          <span className="font-medium">{isEliteMember ? 'Elite Member' : 'Elite Chip'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-[#8B5CF6]" />
            <span>FlyElite's Elite Chip Program</span>
          </DialogTitle>
          <DialogDescription>
            Join our premium loyalty program and enjoy exclusive benefits on all your flights.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] rounded-lg p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">ELITE CHIP</h3>
                <p className="text-sm opacity-75">Premium Membership</p>
              </div>
              <Badge className="h-8 w-8 text-[#9b87f5]" />
            </div>
            
            <div className="space-y-1 text-sm mb-4">
              <p className="opacity-75">Member Name</p>
              <p className="font-medium">YOUR NAME</p>
            </div>
            
            <div className="flex justify-between text-sm">
              <div>
                <p className="opacity-75">Member Since</p>
                <p className="font-medium">APR 2025</p>
              </div>
              <div>
                <p className="opacity-75">Card Number</p>
                <p className="font-medium">ELITE ****</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Elite Chip Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Priority check-in and boarding</p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Extra baggage allowance</p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Access to premium lounges</p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Dedicated customer support</p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Special discounts on flights</p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm">Free seat selection</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Maybe Later</Button>
          <Button 
            className="bg-[#8B5CF6] hover:bg-[#7E69AB]"
            onClick={handleJoin}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Join Elite Chip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EliteChip;
