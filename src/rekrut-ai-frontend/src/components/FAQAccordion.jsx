import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CircleHelp } from "lucide-react";
import { faqData } from "@/constants/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  return (
    <div className="w-full mx-auto py-16 bg-blue-50 rounded-3xl">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-5">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 mb-8">
              Temukan jawaban untuk pertanyaan umum tentang RekrutAI
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group"
            >
              <CircleHelp className="mr-2 h-5 w-5" />
              Masih punya pertanyaan?
              <ChevronRight className="ml-1 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:w-3/5 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl mb-4 border-none overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <span className="text-lg font-medium text-gray-900 text-left">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <p className="text-gray-700">{item.answer}</p>
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
