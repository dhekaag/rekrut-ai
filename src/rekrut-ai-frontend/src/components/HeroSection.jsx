import React from "react";
import { images } from "@/constants/images";
import { StatsCard } from "./Fragments/StatsCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BadgeButton } from "./Fragments/BadgeButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(39, 128, 157, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const microphoneVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "easeInOut",
        },
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      },
    },
  };

  return (
    <motion.div
      className="w-full bg-gray-50 bg-opacity-70 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <motion.div
            className="flex flex-col gap-6 max-w-xl w-full lg:w-1/2"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <BadgeButton />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-4xl md:text-5xl font-bold my-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                RekrutAI
              </motion.h1>
              <motion.p
                className="text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform your interview preparation with AI-powered practice
                sessions designed to boost your confidence and performance. Our
                cutting-edge platform simulates real interview scenarios,
                providing personalized feedback and actionable insights to help
                you secure your dream job.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2"
              variants={itemVariants}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <StatsCard
                  color="text-figma-primary"
                  bgcolor="bg-figma-primary-light"
                  border="border-figma-primary-lightActive"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <StatsCard
                  color="text-figma-secondary"
                  bgcolor="bg-figma-secondary-light"
                  border="border-figma-secondary-lightActive"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <StatsCard
                  color="text-figma-primary"
                  bgcolor="bg-figma-primary-light"
                  border="border-figma-primary-lightActive"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-4 flex justify-center sm:justify-start"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="bg-figma-primary text-white px-6 sm:px-8 py-4 sm:py-6 h-14 sm:h-16 text-base sm:text-lg rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                  <Link to={"/services"}>Try It Out Now!</Link>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:flex md:justify-center md:items-center md:w-1/3 lg:w-1/2"
            variants={itemVariants}
          >
            <motion.div
              className="relative flex h-36 w-36 md:h-48 md:w-48"
              variants={microphoneVariants}
              whileHover="hover"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-figma-primary opacity-75"></span>
              <motion.div
                className="relative flex justify-center items-center rounded-full h-full w-full bg-figma-primary"
                initial={{ boxShadow: "0px 0px 0px rgba(39, 128, 157, 0.3)" }}
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(39, 128, 157, 0.3)",
                    "0px 0px 20px rgba(39, 128, 157, 0.6)",
                    "0px 0px 0px rgba(39, 128, 157, 0.3)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <motion.img
                  src={images.micHeroImages}
                  alt="Microphone"
                  className="w-20 md:w-28 object-contain"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotateZ: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
