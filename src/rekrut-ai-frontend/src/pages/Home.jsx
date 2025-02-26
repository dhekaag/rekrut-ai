import React from "react";
import InterviewCards from "@/components/Fragments/InterviewCard";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interview Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of industry expert interviews in different
            technology domains
          </p>
        </div>

        <InterviewCards />
      </div>
    </div>
  );
};

export default Home;
