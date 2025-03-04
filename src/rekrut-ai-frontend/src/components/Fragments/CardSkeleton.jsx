import React from "react";
import { motion } from "framer-motion";

export const CardSkeleton = ({ size = "medium" }) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return "h-48 sm:h-56 md:h-64";
      case "medium":
        return "h-56 sm:h-72 md:h-80";
      case "large":
        return "h-64 sm:h-80 md:h-96";
      default:
        return "h-56 sm:h-72 md:h-80";
    }
  };

  const skeletonVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`w-full ${getSize()} rounded-xl bg-gray-200 overflow-hidden relative`}
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{
          x: ["-100%", "100%"],
          transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
        }}
      />
    </motion.div>
  );
};
