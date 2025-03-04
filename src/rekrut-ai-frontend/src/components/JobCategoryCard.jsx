import { motion } from "framer-motion";

const JobCategoryCard = ({ category, active, onClick }) => {
  return (
    <motion.div
      className={`min-w-[120px] sm:min-w-[150px] md:min-w-[180px] flex-shrink-0 rounded-lg cursor-pointer transition-all ${
        active
          ? "border-2 border-blue-500 bg-white shadow-md"
          : "bg-gray-200/60 hover:bg-gray-200/80"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
        <span
          className={`text-xs sm:text-sm md:text-base font-medium whitespace-nowrap truncate w-full text-center ${
            active ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {category}
        </span>
      </div>
    </motion.div>
  );
};

export default JobCategoryCard;
