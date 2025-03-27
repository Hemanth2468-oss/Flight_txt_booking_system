
import { useState } from 'react';
import { X, Download, Mail, Check } from 'lucide-react';
import ETicket from './ETicket';
import { useToast } from "@/hooks/use-toast";
import html2pdf from 'html2pdf.js';

interface ConfirmationModalProps {
  onClose: () => void;
  flight: any;
  user: any;
  promoCode?: string | null; // Add promoCode prop
  promoDiscount?: number; // Add promoDiscount prop
}

const ConfirmationModal = ({ onClose, flight, user, promoCode, promoDiscount }: ConfirmationModalProps) => {
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const bookingReference = `FE${Math.floor(1000000 + Math.random() * 9000000)}`;
  const { toast } = useToast();
  
  // Generate e-ticket as PDF and trigger download
  const handleDownloadTicket = () => {
    const ticketContent = document.getElementById('e-ticket');
    if (!ticketContent) return;
    
    setIsDownloading(true);
    
    // Use html2pdf to generate and download the PDF
    const opt = {
      margin: 10,
      filename: `FlyElite_Ticket_${bookingReference}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().from(ticketContent).set(opt).save()
      .then(() => {
        setIsDownloading(false);
        toast({
          title: "Download Complete",
          description: "Your e-ticket has been downloaded as PDF successfully.",
        });
      })
      .catch(err => {
        setIsDownloading(false);
        console.error("Error generating PDF:", err);
        toast({
          title: "Download Error",
          description: "There was an error downloading your e-ticket.",
          variant: "destructive"
        });
      });
  };
  
  // Send e-ticket to email
  const handleSendEmail = () => {
    setIsSending(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsSending(false);
      setEmailSent(true);
      
      toast({
        title: "E-Ticket Sent",
        description: `Your e-ticket has been sent to ${user.email}`,
      });
      
      // Store booking in localStorage
      const bookings = JSON.parse(localStorage.getItem('flyEliteBookings') || '[]');
      bookings.push({
        bookingReference,
        flight,
        user,
        date: new Date().toISOString(),
        promoCode,
        promoDiscount
      });
      localStorage.setItem('flyEliteBookings', JSON.stringify(bookings));
      
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Booking Confirmation</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 mb-6 flex items-center text-green-800">
          <Check className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-medium">Booking Complete!</p>
            <p className="text-sm">Your booking reference: <span className="font-bold">{bookingReference}</span></p>
            {promoCode && promoDiscount && (
              <p className="text-xs mt-1">
                <span className="font-semibold">{promoDiscount}% discount</span> applied with code <span className="font-mono">{promoCode}</span>
              </p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div id="e-ticket">
            <ETicket 
              flight={flight}
              user={user}
              bookingReference={bookingReference}
              promoCode={promoCode}
              promoDiscount={promoDiscount}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleDownloadTicket}
            disabled={isDownloading}
            className={`px-6 py-2 border border-primary-600 text-primary-600 rounded-button hover:bg-primary-50 flex items-center justify-center ${
              isDownloading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Download className="w-5 h-5 mr-2" />
            {isDownloading ? 'Downloading PDF...' : 'Download E-ticket (PDF)'}
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isSending || emailSent}
            className={`px-6 py-2 bg-primary-600 text-white rounded-button flex items-center justify-center transition-all duration-300 ${
              emailSent ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-primary-700'
            } ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {emailSent ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Email Sent
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                {isSending ? 'Sending...' : 'Send to Email'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
