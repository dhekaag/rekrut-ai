import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInterviewCategories } from "@/hooks/useInterviewCategories";
import { CardSkeleton } from "./CardSkeleton";
import { Link } from "react-router-dom";

const InterviewCards = () => {
  const { data, isLoading } = useInterviewCategories();

  const defaultImages = {
    "Information Technology":
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "Bussiness Operations":
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    Communication:
      "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/4 aspect-square">
            <CardSkeleton size="small" />
          </div>
          <div className="w-full md:w-2/5 aspect-square">
            <CardSkeleton size="medium" />
          </div>
          <div className="w-full md:w-1/4 aspect-square">
            <CardSkeleton size="small" />
          </div>
        </div>
      </div>
    );
  }

  const categories = data?.data || [];
  const displayCategories = categories.slice(0, 3);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {displayCategories.map((category, index) => {
          const isMiddle = index === 1;
          const imageSource =
            category.image_url ||
            defaultImages[category.category] ||
            defaultImages["Communication"];

          return (
            <div
              key={category.id}
              className={`w-full ${
                isMiddle ? "md:w-2/5" : "md:w-1/4"
              } aspect-square`}
            >
              <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={imageSource}
                    alt={category.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-0">
                  <div className={`text-center ${isMiddle ? "p-6" : "p-4"}`}>
                    <h2
                      className={`${
                        isMiddle ? "text-3xl" : "text-xl"
                      } font-bold mb-${isMiddle ? "2" : "1"}`}
                    >
                      {category.category}
                    </h2>
                    <p
                      className={`text-gray-500 ${
                        isMiddle ? "text-lg" : "text-sm"
                      }`}
                    >
                      Interview
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          className="bg-gradient-to-r from-[#27809D] to-[#124F62] text-white py-7 px-8 rounded-full text-2xl font-bold hover:opacity-90 hover:scale-105 transition-all"
          size="lg"
        >
          <Link to="/services">Start Practicing</Link>
          <ArrowRight className="ml-4 h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default InterviewCards;
