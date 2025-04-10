
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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsRegisterOpen: (value: boolean) => void;
  handleLogin: (data: any) => void;
}

const LoginDialog = ({ isOpen, setIsOpen, setIsRegisterOpen, handleLogin }: LoginDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create simple user object
      const user = {
        firstName: "John",
        lastName: "Doe",
        email: data.email,
      };
      
      // Store user in localStorage
      localStorage.setItem('flyEliteUser', JSON.stringify(user));
      
      // Call the handleLogin function
      handleLogin(user);
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: "Welcome back to FlyElite!",
        variant: "default",
      });
      
      setIsSubmitting(false);
      setIsOpen(false);
      
      // Refresh the page to update UI state
      window.location.reload();
    }, 1000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Sign In</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your credentials to access your account
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
        
        <div className="text-center border-t pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              className="text-primary-600 hover:underline"
              onClick={() => {
                setIsOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginDialog;
