import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetInterview } from "@/features/slices/interviewSlice";
import InterviewCards from "@/components/Fragments/InterviewCard";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetInterview());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <HowItWorks />
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Practice your interview with AI for the best preparation!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We got you covered for any tech-related job interview!
          </p>
        </div>
        <InterviewCards />
        <div className="mt-20 mb-12">
          <FAQAccordion />
        </div>
      </div>
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
