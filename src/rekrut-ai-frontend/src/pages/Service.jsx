import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import JobCategoryCard from "@/components/JobCategoryCard";
import JobRoleCard from "@/components/JobRoleCard";
import FooterServices from "@/components/FooterService";
import useCategories from "@/hooks/useInterviewCategories";

const Service = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoriesRef = useRef(null);

  const { data: categories, isLoading, isError } = useCategories();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const roles = selectedCategory
    ? selectedCategory.options
    : categories && categories.length > 0 && categories[0].options
    ? categories[0].options
    : [];

  const cardColors = [
    "bg-blue-50 border-blue-200",
    "bg-pink-50 border-pink-200",
    "bg-purple-50 border-purple-200",
    "bg-green-50 border-green-200",
    "bg-amber-50 border-amber-200",
    "bg-cyan-50 border-cyan-200",
    "bg-emerald-50 border-emerald-200",
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 py-12 sm:py-16 px-4 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Practice your interview with AI
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700">
              for the best preparation!
            </p>
          </div>

          <div className="relative mb-12 sm:mb-16 px-5 sm:px-10 md:px-12">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -left-2 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full h-10 w-10"
              onClick={() => scroll(categoriesRef, "left")}
              disabled={isLoading}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div
              ref={categoriesRef}
              className="flex overflow-x-auto scrollbar-hide gap-3 max-w-3xl mx-auto px-4 sm:px-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="min-w-[180px] h-[60px] rounded-lg flex-shrink-0"
                    />
                  ))
              ) : isError ? (
                <div className="w-full text-center text-red-500 py-4">
                  Error loading categories. Please try again later.
                </div>
              ) : (
                categories.map((category) => (
                  <JobCategoryCard
                    key={category.id}
                    category={category.category}
                    active={
                      selectedCategory?.id === category.id ||
                      (!selectedCategory && categories[0]?.id === category.id)
                    }
                    onClick={() => handleCategorySelect(category)}
                  />
                ))
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-2 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full h-10 w-10"
              onClick={() => scroll(categoriesRef, "right")}
              disabled={isLoading}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-12 px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              Choose Your Desired Job Role
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {isLoading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-48 rounded-lg flex-shrink-0"
                    />
                  ))
              ) : isError ? (
                <div className="w-full col-span-full text-center text-red-500 py-4">
                  Error loading roles. Please try again later.
                </div>
              ) : roles.length > 0 ? (
                roles.map((role, index) => (
                  <JobRoleCard
                    key={role.id}
                    role={role}
                    colorClass={cardColors[index % cardColors.length]}
                  />
                ))
              ) : (
                <div className="w-full col-span-full text-center text-gray-500 py-8">
                  No job roles available for this category
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterServices />
    </>
  );
};

export default Service;
