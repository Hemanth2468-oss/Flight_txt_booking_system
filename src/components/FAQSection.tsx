
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I book a flight with FlyElite?",
      answer: "You can easily book flights through our website or mobile app. Simply enter your departure and destination cities, select your travel dates, and choose from available flights. You can also contact our customer service for assistance with booking."
    },
    {
      question: "What is the baggage allowance for flights?",
      answer: "Baggage allowance varies based on your ticket class and destination. Generally, Economy passengers are allowed one checked bag (up to 23kg) and one carry-on bag, while Business and First Class passengers can bring additional baggage. You can view specific allowances during the booking process."
    },
    {
      question: "How do I check in for my flight?",
      answer: "You can check in online through our website or mobile app starting 24 hours before your flight and up to 1 hour before departure. You can also check in at the airport using our self-service kiosks or check-in counters. We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights."
    },
    {
      question: "What is the Elite Chip program and how can I join?",
      answer: "Elite Chip is our premium membership program that offers exclusive benefits such as priority boarding, additional baggage allowance, access to lounges, and special discounts. You can join by applying through our website or by reaching a certain number of miles flown with us. There are different tiers with increasing benefits based on your travel frequency."
    },
    {
      question: "Can I modify or cancel my booking?",
      answer: "Yes, you can modify or cancel your booking through the 'Manage Booking' section on our website or app. Changes may be subject to fees depending on your fare type and how close to departure you make the change. Some premium tickets offer more flexibility with changes and cancellations."
    },
    {
      question: "How do I book a private jet charter?",
      answer: "To book a private jet charter, you can browse available jets on our Private Jets page and select the one that meets your requirements. Fill out the charter booking form with your travel details, and our team will contact you to finalize arrangements. You can also reach out to our dedicated charter specialists for a custom quote."
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium hover:no-underline hover:bg-gray-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-10">
            <p className="text-gray-600">Still have questions?</p>
            <a href="#" className="text-primary-600 font-medium hover:underline">Contact our support team</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
