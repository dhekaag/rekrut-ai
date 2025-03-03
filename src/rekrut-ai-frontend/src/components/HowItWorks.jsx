import React from "react";
import { images } from "@/constants/images";

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">How Does It Work?</h2>
        </div>

        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-center">
              <img
                src={images.interviewProcessImage}
                alt="Interview Process"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
