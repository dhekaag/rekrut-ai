import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Smile, Frown, Meh, Home } from "lucide-react";
import {
  selectResults,
  resetInterview,
  selectSelectedJob,
  selectSelectedTopics,
  startProcessingResults,
} from "@/features/slices/interviewSlice";
import { useSubmitResults } from "@/hooks/useInterviewCategories";
import { motion, AnimatePresence } from "framer-motion";

const InterviewResults = () => {
  const results = useSelector(selectResults);
  const selectedJob = useSelector(selectSelectedJob);
  const selectedTopics = useSelector(selectSelectedTopics);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: submitResults } = useSubmitResults();

  const handleQuit = () => {
    dispatch(resetInterview());
    navigate("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 120,
        damping: 8,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: (custom) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  };

  const loadingContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const loadingDotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: {
      y: [0, -10, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  if (!results) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Analyzing Your Interview...
          </motion.h2>
          <motion.div
            className="flex space-x-4 justify-center"
            variants={loadingContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="rounded-full bg-blue-400 h-3 w-3"
              variants={loadingDotVariants}
              custom={0}
            ></motion.div>
            <motion.div
              className="rounded-full bg-blue-400 h-3 w-3"
              variants={loadingDotVariants}
              custom={1}
            ></motion.div>
            <motion.div
              className="rounded-full bg-blue-400 h-3 w-3"
              variants={loadingDotVariants}
              custom={2}
            ></motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Check if we received an error response
  if (results === "AI response is empty") {
    return (
      <motion.div
        className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="max-w-xl w-full bg-white rounded-lg shadow-md p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 12 }}
        >
          <motion.div
            className="text-center mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-red-600">
              Interview Analysis Failed
            </h2>
            <p className="mt-2 text-gray-600">
              We encountered an issue while analyzing your interview responses.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  dispatch(startProcessingResults());
                  submitResults();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleQuit}
                className="border-gray-300"
              >
                Return Home
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Calculate impression percentage from overall_rating (assuming it's on a scale of 1-10)
  const impressionPercentage = (results.overall_rating / 10) * 100;

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-10"
          variants={cardVariants}
        >
          <motion.h1
            className="text-4xl font-bold text-center text-gray-900"
            variants={itemVariants}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Your Interview Results
          </motion.h1>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={handleQuit}
              className="bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2"
            >
              <Home size={16} />
              <span>Quit</span>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="md:col-span-2" variants={cardVariants}>
            <Card className="shadow-sm border-blue-100 h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Evaluation Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div className="mb-4" variants={itemVariants}>
                  <span className="text-gray-600 font-medium">Job Role:</span>
                  <span className="ml-2 text-blue-700">{selectedJob}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTopics.map((topic, index) => (
                      <motion.span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <motion.p
                  className="text-gray-700 leading-relaxed"
                  variants={itemVariants}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {results.summary}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div variants={cardVariants}>
              <Card className="shadow-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Interview Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <motion.span
                      className="font-medium text-gray-700"
                      variants={itemVariants}
                    >
                      Technical Accuracy
                    </motion.span>
                    <motion.span
                      className="font-bold text-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      {results.technical_accuracy}/10
                    </motion.span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      custom={results.technical_accuracy * 10}
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-6 mb-2">
                    <motion.span
                      className="font-medium text-gray-700"
                      variants={itemVariants}
                    >
                      Overall Rating
                    </motion.span>
                    <motion.span
                      className="font-bold text-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      {results.overall_rating}/10
                    </motion.span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500 rounded-full"
                      custom={results.overall_rating * 10}
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="shadow-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    General Impression
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex justify-between mb-2"
                    variants={itemVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <ThumbsDown className="text-yellow-400 h-6 w-6" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Frown className="text-yellow-500 h-6 w-6" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Meh className="text-blue-400 h-6 w-6" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Smile className="text-green-400 h-6 w-6" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <ThumbsUp className="text-green-500 h-6 w-6" />
                    </motion.div>
                  </motion.div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 via-blue-400 to-green-500 rounded-full"
                      custom={impressionPercentage}
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div variants={cardVariants}>
            <Card className="shadow-sm border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.ol
                  className="list-decimal pl-5 space-y-3 text-gray-700"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  {results.strengths.map((strength, index) => (
                    <motion.li
                      key={index}
                      className="leading-relaxed"
                      variants={listItemVariants}
                      custom={index}
                    >
                      {strength}
                    </motion.li>
                  ))}
                </motion.ol>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="shadow-sm border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Skills to Enhance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.ol
                  className="list-decimal pl-5 space-y-3 text-gray-700"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  {results.skills_to_improve.map((skill, index) => (
                    <motion.li
                      key={index}
                      className="leading-relaxed"
                      variants={listItemVariants}
                      custom={index}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex justify-center"
          variants={buttonVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={handleQuit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Finish & Return Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewResults;
