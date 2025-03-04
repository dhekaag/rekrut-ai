import React, { useEffect, useRef } from "react";
import { Brain, Library, ClipboardList, MessageSquareMore } from "lucide-react";
import BadgeButton from "./Fragments/BadgeButton";
import { aboutUsData } from "@/constants/aboutUsData";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation, useInView } from "framer-motion";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const getIcon = (iconName) => {
    const iconMap = {
      Brain: Brain,
      Library: Library,
      ClipboardList: ClipboardList,
      MessageSquareMore: MessageSquareMore,
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
      </motion.div>
    ) : null;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center flex flex-col items-center mb-16"
          variants={titleVariants}
        >
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-6 text-slate-900 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              About Us
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></div>
          </h1>
          <BadgeButton />
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mt-8 leading-relaxed">
            At RekrutAI, we're committed to making the hiring process easier,
            more efficient, and more effective for both employers and
            candidates. Our AI-powered platform streamlines interviews while
            providing deeper insights into candidate qualifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {aboutUsData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm flex flex-col">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="flex flex-col md:flex-row items-start p-6 h-full">
                    <div className="flex-shrink-0 p-4 mb-4 md:mb-0 bg-blue-100 rounded-xl shadow-inner flex items-center justify-center">
                      {getIcon(item.icon)}
                    </div>
                    <div className="md:ml-6 flex flex-col flex-grow">
                      <h2 className="font-bold text-xl md:text-2xl text-slate-900 mb-3">
                        {item.title}
                      </h2>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className="h-1.5 md:h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-90 rounded-b-md mt-auto"
                    whileHover={{
                      scaleX: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  ></motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-24 text-center" variants={itemVariants}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-2xl md:text-4xl mb-6 text-slate-900">
              Transforming Recruitment Through Innovation
            </h2>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 mx-auto mb-6 rounded-full"
              whileInView={{
                width: ["0%", "100%", "50%"],
                x: ["-50%", "0%", "-25%"],
              }}
              transition={{ duration: 1.5 }}
            ></motion.div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              We believe that technology should enhance human connections, not
              replace them. Our AI tools are designed to support recruiters and
              hiring managers by handling repetitive tasks, providing
              data-driven insights, and allowing them to focus on what matters
              most: finding the right talent for their teams.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
