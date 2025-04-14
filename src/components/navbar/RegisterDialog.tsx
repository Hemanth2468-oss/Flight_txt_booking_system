
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

interface RegisterDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsLoginOpen: (value: boolean) => void;
  handleRegister: (data: any) => void;
}

const RegisterDialog = ({ isOpen, setIsOpen, setIsLoginOpen, handleRegister }: RegisterDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create user object (excluding password for security)
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
      
      // Store user in localStorage
      localStorage.setItem('flyEliteUser', JSON.stringify(user));
      
      // Call the handleRegister function
      handleRegister(user);
      
      // Show success toast
      toast({
        title: "Registration Successful",
        description: `Welcome to FlyElite, ${data.firstName}!`,
        variant: "default",
      });
      
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Create Account</AlertDialogTitle>
          <AlertDialogDescription>
            Join Fly Elite to access exclusive deals and faster booking
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                        placeholder="John"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
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
            </div>
            
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                      placeholder="your@email.com"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                      placeholder="******"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500" 
                      placeholder="******"
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
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
        
        <div className="text-center border-t pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              className="text-primary-600 hover:underline"
              onClick={() => {
                setIsOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegisterDialog;
