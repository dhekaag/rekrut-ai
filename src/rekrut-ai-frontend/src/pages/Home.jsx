import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetInterview } from "@/features/slices/interviewSlice";
import InterviewCards from "@/components/Fragments/InterviewCard";
import { HeroSection } from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FAQAccordion from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { AboutUs } from "@/components/AboutUs";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetInterview());
  }, [dispatch]);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const sectionVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <HowItWorks />
        </motion.div>

        <motion.div
          className="container mx-auto py-12 px-4"
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="text-center mb-12" variants={sectionVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Practice your interview with AI for the best preparation!
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We got you covered for any tech-related job interview!
            </p>
          </motion.div>

          <InterviewCards />

          <motion.div
            className="mt-20 mb-12"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FAQAccordion />
          </motion.div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AboutUs />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
