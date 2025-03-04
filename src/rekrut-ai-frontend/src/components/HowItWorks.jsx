import React from "react";
import { images } from "@/constants/images";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <motion.div
      className="bg-gray-50 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">How Does It Work?</h2>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto rounded-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex justify-center">
              <motion.img
                src={images.interviewProcessImage}
                alt="Interview Process"
                className="w-full rounded-lg"
                initial={{ filter: "blur(5px)" }}
                whileInView={{ filter: "blur(0px)" }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
