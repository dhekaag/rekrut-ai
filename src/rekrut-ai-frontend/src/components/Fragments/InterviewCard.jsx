import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useCategories from "@/hooks/useInterviewCategories";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CardSkeleton } from "./CardSkeleton";

const InterviewCards = () => {
  const { data, isLoading } = useCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 sm:py-10 md:py-12 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full sm:w-1/3 md:w-1/4 aspect-square mb-4 sm:mb-0">
            <CardSkeleton size="small" />
          </div>
          <div className="w-full sm:w-1/3 md:w-2/5 aspect-square mb-4 sm:mb-0">
            <CardSkeleton size="medium" />
          </div>
          <div className="w-full sm:w-1/3 md:w-1/4 aspect-square">
            <CardSkeleton size="small" />
          </div>
        </div>
      </div>
    );
  }

  const categories = data || [];
  const displayCategories = categories.slice(0, 3);

  return (
    <div className="container mx-auto py-8 sm:py-10 md:py-12 px-4">
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {displayCategories.map((category, index) => {
          const isMiddle = index === 1;

          return (
            <motion.div
              key={category.id}
              custom={index}
              variants={itemVariants}
              className={`w-full sm:w-1/3 ${
                isMiddle ? "md:w-2/5" : "md:w-1/4"
              } aspect-square mb-4 sm:mb-0`}
            >
              <Card className="w-full h-full overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                <motion.div
                  className="relative flex-1 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {category.image_url && (
                    <motion.img
                      src={category.image_url}
                      alt={category.category}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  {!category.image_url && (
                    <motion.div
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-indigo-300 font-bold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        {category.category.charAt(0)}
                      </motion.div>
                    </motion.div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                    whileHover={{ opacity: 0.6 }}
                  ></motion.div>
                </motion.div>
                <CardContent className="p-0">
                  <motion.div
                    className={`text-center ${
                      isMiddle ? "p-3 sm:p-4 md:p-6" : "p-2 sm:p-3 md:p-4"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2
                      className={`${
                        isMiddle
                          ? "text-xl sm:text-2xl md:text-3xl"
                          : "text-base sm:text-lg md:text-xl"
                      } font-bold mb-${isMiddle ? "1 sm:mb-2" : "0.5 sm:mb-1"}`}
                    >
                      {category.category}
                    </h2>
                    <p
                      className={`text-gray-500 ${
                        isMiddle
                          ? "text-sm sm:text-base md:text-lg"
                          : "text-xs sm:text-sm"
                      }`}
                    >
                      Interview
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          whileTap="tap"
          viewport={{ once: true }}
        >
          <Button
            className="bg-gradient-to-r from-[#27809D] to-[#124F62] text-white py-4 sm:py-5 md:py-7 px-5 sm:px-6 md:px-8 rounded-full text-base sm:text-xl md:text-2xl font-bold hover:opacity-90 transition-all"
            size="lg"
          >
            <Link to="/services">Start Practicing</Link>
            <motion.div
              animate={{
                x: [0, 5, 0],
                transition: { repeat: Infinity, duration: 1.5 },
              }}
            >
              <ArrowRight className="ml-2 sm:ml-3 md:ml-4 h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewCards;
