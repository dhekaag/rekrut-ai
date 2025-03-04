import Lottie from "lottie-react";
import animationData from "@/assets/animations/404.json";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Framer Motion variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 relative"
      >
        <motion.div variants={itemVariants} className="max-w-md mx-auto mb-8">
          <Lottie animationData={animationData} loop={true} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-extrabold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Page Not Found
        </motion.h1>

        <motion.div variants={itemVariants} className="max-w-lg">
          <p className="text-gray-600 text-lg mb-2">
            The page you are looking for doesn't exist.
          </p>
          <p className="text-gray-600 text-lg mb-8">
            Or it's currently under development.{" "}
            <motion.span
              className="font-medium"
              animate={{ color: ["#4299e1", "#9f7aea", "#4299e1"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Coming Soon!
            </motion.span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-300/30 px-6 py-5 gap-2 rounded-xl"
            >
              <Link to="/">
                <Home size={16} />
                Return Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="gap-2 border-2 border-gray-300 px-6 py-5 rounded-xl hover:border-gray-400 transition-all"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-sm mt-10 flex items-center justify-center gap-2"
        >
          <Mail size={14} />
          If you believe this is a mistake, please contact support.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
