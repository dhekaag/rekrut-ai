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
import { motion } from "framer-motion";

const FAQAccordion = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const fadeInUpVariant = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
      className="w-full mx-auto py-20 bg-gradient-to-b from-blue-50 to-white rounded-3xl"
    >
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14">
          <motion.div className="lg:w-1/3" variants={fadeInUpVariant}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="bg-blue-100 p-2 rounded-lg"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MessageCircleQuestion className="h-6 w-6 text-blue-600" />
              </motion.div>
              <span className="text-blue-600 font-medium">FAQ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Find answers to common questions about how RekrutAI works and how
              it can help you prepare for your next tech interview.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors group"
              >
                <CircleHelp className="mr-2 h-5 w-5" />
                Contact support
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronRight className="ml-1 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <div className="lg:w-3/5 space-y-5">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <motion.div key={index} variants={itemVariant} custom={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white rounded-xl mb-5 border-none overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <AccordionTrigger className="px-8 py-6 hover:no-underline data-[state=open]:bg-blue-50">
                      <span className="text-lg font-semibold text-gray-900 text-left">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-7 pt-2">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 leading-relaxed text-base"
                      >
                        {item.answer}
                      </motion.p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQAccordion;
