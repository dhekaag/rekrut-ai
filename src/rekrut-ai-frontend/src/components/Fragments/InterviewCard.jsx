import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const InterviewCards = () => {
  const interviews = [
    {
      title: "IT Engineering",
      subtitle: "Interview",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Cloud-based Computing",
      subtitle: "Interview",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "UI/UX Design",
      subtitle: "Interview",
      image:
        "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/4 aspect-square">
          <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={interviews[0].image}
                alt={interviews[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-0">
              <div className="text-center p-4">
                <h2 className="text-xl font-bold mb-1">
                  {interviews[0].title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {interviews[0].subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/5 aspect-square">
          <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={interviews[1].image}
                alt={interviews[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-0">
              <div className="text-center p-6">
                <h2 className="text-3xl font-bold mb-2">
                  {interviews[1].title}
                </h2>
                <p className="text-gray-500 text-lg">
                  {interviews[1].subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/4 aspect-square">
          <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={interviews[2].image}
                alt={interviews[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-0">
              <div className="text-center p-4">
                <h2 className="text-xl font-bold mb-1">
                  {interviews[2].title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {interviews[2].subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button
          className="bg-gradient-to-r from-[#27809D] to-[#124F62] text-white py-7 px-8 rounded-full text-2xl font-bold hover:opacity-90 hover:scale-105 transition-all"
          size="lg"
        >
          Start Practicing
          <ArrowRight className="ml-4 h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default InterviewCards;
