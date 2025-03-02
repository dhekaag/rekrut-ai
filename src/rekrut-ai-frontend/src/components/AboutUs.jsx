import React from "react";
import { Brain, Library, ClipboardList, MessageSquareMore } from "lucide-react";
import BadgeButton from "./Fragments/BadgeButton";
import { aboutUsData } from "@/constants/aboutUsData";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  const getIcon = (iconName) => {
    const iconMap = {
      Brain: Brain,
      Library: Library,
      ClipboardList: ClipboardList,
      MessageSquareMore: MessageSquareMore,
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
    ) : null;
  };

  return (
    <div className="w-full py-12 md:py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col items-center mb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-slate-900">
            About Us
          </h1>
          <BadgeButton />
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mt-4">
            At RekrutAI, we're committed to making the hiring process easier,
            more efficient, and more effective for both employers and
            candidates. Our AI-powered platform streamlines interviews while
            providing deeper insights into candidate qualifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutUsData.map((item, index) => (
            <Card
              key={index}
              className="border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CardContent className="flex gap-3 md:gap-4 p-4 md:p-6">
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-md h-fit">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h2 className="font-semibold text-lg md:text-xl text-slate-900 mb-1 md:mb-2">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-bold text-2xl md:text-3xl mt-4 mb-4 text-slate-900">
            Transforming Recruitment Through Innovation
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            We believe that technology should enhance human connections, not
            replace them. Our AI tools are designed to support recruiters and
            hiring managers by handling repetitive tasks, providing data-driven
            insights, and allowing them to focus on what matters most: finding
            the right talent for their teams.
          </p>
        </div>
      </div>
    </div>
  );
}
