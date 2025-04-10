
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PremiumTicket from './PremiumTicket';

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  departure: z.string().min(2, "Please enter departure location"),
  destination: z.string().min(2, "Please enter destination"),
  departureDate: z.date({
    required_error: "Please select departure date",
  }),
  returnDate: z.date({
    required_error: "Please select return date",
  }).optional(),
  passengers: z.coerce.number().min(1, "At least 1 passenger required").max(20, "Maximum 20 passengers allowed"),
  specialRequests: z.string().optional(),
});

// Define the form type
type FormValues = z.infer<typeof formSchema>;

interface CharterBookingFormProps {
  jet: {
    id: string;
    name: string;
    image: string;
    price: string;
    passengers: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

const CharterBookingForm = ({ jet, isOpen, onClose }: CharterBookingFormProps) => {
  const [showTicket, setShowTicket] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();
  
  const generateBookingNumber = () => {
    return 'EL' + Math.floor(100000 + Math.random() * 900000);
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departure: "",
      destination: "",
      passengers: 1,
      specialRequests: "",
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Format the dates for display
    const formatDate = (date: Date) => {
      return format(date, "dd MMM yyyy");
    };

    // Create booking object in the format expected by PremiumTicket
    const booking = {
      bookingNumber: generateBookingNumber(),
      bookingDate: format(new Date(), "dd MMM yyyy"),
      firstName: values.firstName,
      lastName: values.lastName,
      departure: values.departure,
      destination: values.destination,
      departureDate: formatDate(values.departureDate),
      returnDate: values.returnDate ? formatDate(values.returnDate) : null,
      jet: {
        name: jet.name,
        passengers: jet.passengers
      },
      status: 'Confirmed',
      totalAmount: jet.price,
    };
    
    setBookingData(booking);
    setShowTicket(true);
    
    toast({
      title: "Charter Booking Confirmed!",
      description: `Your private jet has been booked. Booking #${booking.bookingNumber}`,
      variant: "default",
      duration: 5000,
    });
  };
  
  return (
    <>
      <Dialog open={isOpen && !showTicket} onOpenChange={() => !showTicket && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book Your Charter Flight</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <img src={jet.image} alt={jet.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="font-bold text-lg">{jet.name}</h3>
                <p className="text-gray-600">Price: {jet.price}</p>
                <p className="text-gray-600">Capacity: {jet.passengers} passengers</p>
              </div>
            </div>
            
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
                          <Input placeholder="john@example.com" type="email" {...field} />
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
                          <Input placeholder="City or Airport" {...field} />
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
                          <Input placeholder="City or Airport" {...field} />
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
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
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
                              disabled={(date) => date < new Date()}
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
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
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
                              disabled={(date) => date < (form.getValues("departureDate") || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Passengers</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            max={jet.passengers}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special requirements or preferences..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Book Charter
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      
      {showTicket && bookingData && (
        <PremiumTicket 
          booking={bookingData}
          isOpen={showTicket} 
          onClose={() => {
            setShowTicket(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default CharterBookingForm;
