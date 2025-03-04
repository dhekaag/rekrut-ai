import { useState } from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const bubbleVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: {
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const titleVariants = {
    initial: {
      opacity: 0.6,
      y: 20,
    },
    animate: {
      opacity: 0.6,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      opacity: 0.9,
      scale: 1.05,
      textShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
      letterSpacing: "0.1em",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const copyrightVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 0.7,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-t from-[#27809D] via-[#27809D]/60 to-[#FEFEFF] py-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-medium text-white tracking-wider"
          variants={titleVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          RekrutAi
        </motion.h1>

        <motion.div
          className="mt-16 text-white text-sm"
          variants={copyrightVariants}
          initial="initial"
          animate="animate"
        >
          © {new Date().getFullYear()} RekrutAi. All rights reserved.
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full"
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          custom={0}
        ></motion.div>
        <motion.div
          className="absolute top-1/4 -right-10 w-32 h-32 bg-white/5 rounded-full"
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          custom={1}
          style={{ animationDelay: "1s" }}
          transition={{ delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 left-1/4 w-24 h-24 bg-white/5 rounded-full"
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          custom={2}
          style={{ animationDelay: "2s" }}
          transition={{ delay: 1 }}
        ></motion.div>

        {/* Additional subtle floating bubbles */}
        <motion.div
          className="absolute bottom-20 right-1/4 w-16 h-16 bg-white/5 rounded-full"
          initial={{ y: 0, opacity: 0.3 }}
          animate={{
            y: -20,
            opacity: [0.1, 0.3, 0.1],
            transition: {
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
                ease: "easeInOut",
              },
              opacity: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
                ease: "easeInOut",
              },
            },
          }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 left-1/3 w-12 h-12 bg-white/5 rounded-full"
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: -15,
            opacity: [0.1, 0.2, 0.1],
            transition: {
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3.5,
                ease: "easeInOut",
              },
              opacity: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2.5,
                ease: "easeInOut",
              },
            },
          }}
        ></motion.div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent to-[#27809D]/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
    </motion.div>
  );
};
