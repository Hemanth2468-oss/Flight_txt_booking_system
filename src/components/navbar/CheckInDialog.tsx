
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plane } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const checkInSchema = z.object({
  bookingReference: z.string().min(6, { message: "Booking reference must be at least 6 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
});

interface CheckInDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  checkInResult: any;
  setCheckInResult: (result: any) => void;
  handleCheckIn: (data: any) => void;
}

const CheckInDialog = ({ 
  isOpen, 
  setIsOpen, 
  checkInResult, 
  setCheckInResult, 
  handleCheckIn 
}: CheckInDialogProps) => {
  const checkInForm = useForm({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      bookingReference: "",
      lastName: "",
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Online Check-in</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your booking reference and last name to check in for your flight
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {!checkInResult ? (
          <Form {...checkInForm}>
            <form onSubmit={checkInForm.handleSubmit(handleCheckIn)} className="space-y-4 py-4">
              <FormField
                control={checkInForm.control}
                name="bookingReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Reference / PNR</FormLabel>
                    <FormControl>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="ABCDEF"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={checkInForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="Doe"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AlertDialogFooter className="pt-4">
                <AlertDialogCancel asChild>
                  <button type="button" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-button hover:bg-gray-50">Cancel</button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 glow-button">Check In</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700 font-medium">Check-in Successful</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{checkInResult.status}</span>
              </div>
              <h3 className="font-bold text-lg">{checkInResult.passengerName}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Flight</p>
                  <p className="font-medium">{checkInResult.flightNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Seat</p>
                  <p className="font-medium">{checkInResult.seat}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gate</p>
                  <p className="font-medium">{checkInResult.gate}</p>
                </div>
              </div>
              
              <div className="flex justify-between border-t border-b py-3">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{checkInResult.departure.city} ({checkInResult.departure.code})</p>
                  <p className="text-sm">{checkInResult.departure.time}</p>
                </div>
                <div className="text-center self-center">
                  <Plane className="h-5 w-5 mx-auto text-primary-600 transform rotate-45" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{checkInResult.arrival.city} ({checkInResult.arrival.code})</p>
                  <p className="text-sm">{checkInResult.arrival.time}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Boarding Time</p>
                <p className="font-medium">{checkInResult.boardingTime}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="w-full py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 glow-button"
                onClick={() => {
                  setCheckInResult(null);
                  setIsOpen(false);
                  checkInForm.reset();
                }}
              >
                Download Boarding Pass
              </button>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckInDialog;
