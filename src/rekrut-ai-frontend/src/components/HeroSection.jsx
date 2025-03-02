import React from "react";
import { images } from "@/constants/images";
import { StatsCard } from "./Fragments/StatsCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BadgeButton from "./Fragments/BadgeButton";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="w-full bg-gray-50 bg-opacity-70 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-6 max-w-xl w-full lg:w-1/2">
            <BadgeButton />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold my-5">RekrutAI</h1>
              <p className="text-gray-700 leading-relaxed">
                Transform your interview preparation with AI-powered practice
                sessions designed to boost your confidence and performance. Our
                cutting-edge platform simulates real interview scenarios,
                providing personalized feedback and actionable insights to help
                you secure your dream job.
              </p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
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
            <div className="mt-4 flex justify-center sm:justify-start">
              <Button className="bg-figma-primary text-white px-6 sm:px-8 py-4 sm:py-6 h-14 sm:h-16 text-base sm:text-lg rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                <Link to={"/services"}>Try It Out Now!</Link>
                <ArrowRight size={20} className="sm:w-6 sm:h-6" />
              </Button>
            </div>
          </div>
          <div className="md:flex md:justify-center md:items-center md:w-1/3 lg:w-1/2">
            <div className="relative flex h-36 w-36 md:h-48 md:w-48">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-figma-primary opacity-75"></span>
              <div className="relative flex justify-center items-center rounded-full h-full w-full bg-figma-primary">
                <img
                  src={images.micHeroImages}
                  alt="Microphone"
                  className="w-20 md:w-28 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
