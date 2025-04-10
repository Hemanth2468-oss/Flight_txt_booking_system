
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import html2pdf from 'html2pdf.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Download, PlaneTakeoff, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PremiumTicket from './PremiumTicket';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  departure: z.string().min(2, "Please enter a departure location"),
  destination: z.string().min(2, "Please enter a destination"),
  departureDate: z.date({
    required_error: "Please select a departure date",
  }),
  returnDate: z.date({
    required_error: "Please select a return date",
  }).optional(),
  passengers: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0 && val <= 20, {
    message: "Number of passengers must be between 1 and 20",
  }),
  specialRequests: z.string().optional(),
});

type JetDetails = {
  id: string;
  name: string;
  image: string;
  passengers: number;
  range: string;
  speed: string;
  price: string;
};

interface CharterBookingFormProps {
  jet: JetDetails;
  isOpen: boolean;
  onClose: () => void;
}

const CharterBookingForm = ({ jet, isOpen, onClose }: CharterBookingFormProps) => {
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const { toast } = useToast();
  
  // Generate booking number
  const generateBookingNumber = () => {
    return 'EL' + Math.floor(100000 + Math.random() * 900000);
  };
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departure: "",
      destination: "",
      passengers: "1", // Note: This is a string now, not a number
      specialRequests: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create booking details
    const booking = {
      ...values,
      bookingNumber: generateBookingNumber(),
      bookingDate: new Date().toISOString(),
      jet: jet,
      departureDate: format(values.departureDate, 'dd MMM yyyy'),
      returnDate: values.returnDate ? format(values.returnDate, 'dd MMM yyyy') : null,
      status: 'Confirmed',
      totalAmount: jet.price,
    };
    
    setBookingDetails(booking);
    setBookingComplete(true);
    
    toast({
      title: "Charter Booking Confirmed!",
      description: "Your private jet charter has been successfully booked.",
      variant: "default",
      duration: 5000,
    });
  };
  
  const downloadTicket = () => {
    const element = document.getElementById('premium-ticket');
    if (element) {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `FlyElite_Charter_Ticket_${bookingDetails.bookingNumber}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().from(element).set(opt).save().then(() => {
        toast({
          title: "Ticket Downloaded",
          description: "Your premium ticket has been downloaded successfully.",
          variant: "default",
        });
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!bookingComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <PlaneTakeoff className="h-5 w-5 text-[#8B5CF6]" />
                <span>Book Private Charter: {jet.name}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col md:flex-row gap-6 py-4">
              <div className="md:w-2/5">
                <img 
                  src={jet.image} 
                  alt={jet.name} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="mt-4 space-y-2 text-sm">
                  <p><span className="font-medium">Model:</span> {jet.name}</p>
                  <p><span className="font-medium">Capacity:</span> {jet.passengers} passengers</p>
                  <p><span className="font-medium">Range:</span> {jet.range}</p>
                  <p><span className="font-medium">Speed:</span> {jet.speed}</p>
                  <p><span className="font-medium">Price:</span> <span className="text-[#8B5CF6] font-bold">{jet.price}</span></p>
                </div>
              </div>
              
              <div className="md:w-3/5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="departure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Departure Location</FormLabel>
                            <FormControl>
                              <Input placeholder="New York, NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <FormControl>
                              <Input placeholder="Los Angeles, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Departure Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className="pl-3 text-left font-normal"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Return Date (Optional)</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className="pl-3 text-left font-normal"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < form.getValues("departureDate") || !form.getValues("departureDate")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max={jet.passengers}
                              placeholder="1" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requirements or requests..."
                              className="resize-none h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] hover:opacity-90 flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Book Charter
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Check className="h-5 w-5 text-green-500" />
                <span>Charter Booking Confirmed!</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div id="premium-ticket">
                <PremiumTicket booking={bookingDetails} />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={downloadTicket}
                  className="bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5] text-white hover:opacity-90 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Ticket
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CharterBookingForm;
