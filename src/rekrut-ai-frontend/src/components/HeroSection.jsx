import React from "react";
import { images } from "@/constants/images";
import StatsCard from "./Fragments/StatsCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="w-full bg-gray-50 bg-opacity-70 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="bg-blue-50 w-fit px-4 py-2 rounded-full border border-[#123CA4]">
              <span className="text-[#123CA4] font-medium">
                Your Interview Companion
              </span>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold my-5">RekrutAI</h1>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <StatsCard
                color="text-figma-primary"
                bgcolor="bg-figma-primary-light"
                border="border-figma-primary-lightActive"
              />
              <StatsCard
                color="text-figma-secondary"
                bgcolor="bg-figma-secondary-light"
                border="border-figma-secondary-lightActive"
              />
              <StatsCard
                color="text-figma-primary"
                bgcolor="bg-figma-primary-light"
                border="border-figma-primary-lightActive"
              />
            </div>

            <div className="mt-4">
              <Button
                style={{ backgroundColor: "#B6C3E3" }}
                className="text-black px-8 py-6 h-16 text-lg rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Try It Out Now!
                <ArrowRight size={24} />
              </Button>
            </div>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <img
              src={images.micHeroImages}
              alt="Microphone"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
