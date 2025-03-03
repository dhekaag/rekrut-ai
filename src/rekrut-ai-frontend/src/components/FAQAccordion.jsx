import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CircleHelp, MessageCircleQuestion } from "lucide-react";
import { faqData } from "@/constants/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  return (
    <div className="w-full mx-auto py-20 bg-gradient-to-b from-blue-50 to-white rounded-3xl">
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MessageCircleQuestion className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-600 font-medium">FAQ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Find answers to common questions about how RekrutAI works and how
              it can help you prepare for your next tech interview.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors group"
            >
              <CircleHelp className="mr-2 h-5 w-5" />
              Contact support
              <ChevronRight className="ml-1 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:w-3/5 space-y-5">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl mb-5 border-none overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline data-[state=open]:bg-blue-50">
                    <span className="text-lg font-semibold text-gray-900 text-left">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-7 pt-2">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
