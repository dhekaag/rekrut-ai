import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import JobCategoryCard from "@/components/JobCategoryCard";
import JobRoleCard from "@/components/JobRoleCard";
import FooterServices from "@/components/FooterService";
import useCategories from "@/hooks/useInterviewCategories";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, y: 20, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 py-12 sm:py-16 px-4 sm:px-8 md:px-10"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={headerVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              variants={headerVariants}
            >
              Practice your interview with AI
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-700"
              variants={headerVariants}
            >
              for the best preparation!
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mb-12 sm:mb-16 px-5 sm:px-10 md:px-12"
            variants={itemVariants}
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -left-2 sm:-left-6 md:-left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full h-10 w-10"
                onClick={() => scroll(categoriesRef, "left")}
                disabled={isLoading}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              ref={categoriesRef}
              className="flex overflow-x-auto scrollbar-hide gap-3 max-w-3xl mx-auto px-4 sm:px-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              variants={itemVariants}
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
                <motion.div
                  className="w-full text-center text-red-500 py-4"
                  variants={itemVariants}
                >
                  Error loading categories. Please try again later.
                </motion.div>
              ) : (
                categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <JobCategoryCard
                      category={category.category}
                      active={
                        selectedCategory?.id === category.id ||
                        (!selectedCategory && categories[0]?.id === category.id)
                      }
                      onClick={() => handleCategorySelect(category)}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 sm:-right-6 md:-right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full h-10 w-10"
                onClick={() => scroll(categoriesRef, "right")}
                disabled={isLoading}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="mb-12 px-2 sm:px-0" variants={itemVariants}>
            <motion.h2
              className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8"
              variants={headerVariants}
            >
              Choose Your Desired Job Role
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6"
              variants={cardContainerVariants}
            >
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
                <motion.div
                  className="w-full col-span-full text-center text-red-500 py-4"
                  variants={itemVariants}
                >
                  Error loading roles. Please try again later.
                </motion.div>
              ) : roles.length > 0 ? (
                roles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                    layoutId={`role-${role.id}`}
                  >
                    <JobRoleCard
                      role={role}
                      colorClass={cardColors[index % cardColors.length]}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="w-full col-span-full text-center text-gray-500 py-8"
                  variants={itemVariants}
                >
                  No job roles available for this category
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <FooterServices />
    </>
  );
};

export default Service;
