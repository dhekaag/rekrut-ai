import React from "react";
import InterviewCards from "@/components/Fragments/InterviewCard";
import FAQAccordion from "@/components/FAQAccordion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
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
    </div>
  );
};

export default Home;
