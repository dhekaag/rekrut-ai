import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedJobAndTopics } from "@/features/slices/interviewSlice";
import { motion } from "framer-motion";

const JobRoleCard = ({ role, colorClass }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorName = colorClass.split("-")[1];

  const buttonColorMap = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    pink: "bg-pink-600 hover:bg-pink-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    amber: "bg-amber-600 hover:bg-amber-700 text-white",
    cyan: "bg-cyan-600 hover:bg-cyan-700 text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };

  const buttonColor =
    buttonColorMap[colorName] || "bg-blue-600 hover:bg-blue-700 text-white";

  const handleStartInterview = () => {
    const topicNames = role.topics.map((topic) => topic.topic);

    dispatch(
      setSelectedJobAndTopics({
        job: role.job,
        topics: topicNames,
      })
    );

    navigate("/services/interview-process");
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.97 },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -5 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const tagVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      y: -3,
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <Card
        className={`rounded-lg shadow-md transition-all cursor-pointer ${colorClass} border-2 flex flex-col h-full overflow-hidden`}
      >
        <motion.div
          className="p-5 flex flex-col h-full"
          variants={contentVariants}
        >
          <motion.div className="mb-3" variants={itemVariants}>
            <motion.h3
              className="text-lg sm:text-xl font-bold text-gray-800 mb-2"
              variants={itemVariants}
            >
              {role.job}
            </motion.h3>
            <motion.p
              className="text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3"
              variants={itemVariants}
            >
              {role.description}
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {role.topics &&
              role.topics.slice(0, 3).map((topic, index) => (
                <motion.span
                  key={topic.id}
                  className="inline-block bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                  variants={tagVariants}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  {topic.topic}
                </motion.span>
              ))}
          </div>

          <motion.div className="mt-auto" variants={buttonVariants}>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                className={`w-full rounded-md font-medium ${buttonColor} py-2 sm:py-3 transition-transform`}
                onClick={handleStartInterview}
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  Take practice interview
                </motion.span>
                <motion.span
                  className="inline-block ml-1"
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 200 },
                  }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default JobRoleCard;
