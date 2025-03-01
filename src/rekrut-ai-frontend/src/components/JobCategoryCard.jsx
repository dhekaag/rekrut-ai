const JobCategoryCard = ({ category, active, onClick }) => {
  return (
    <div
      className={`min-w-[180px] flex-shrink-0 rounded-lg cursor-pointer transition-all ${
        active
          ? "border-2 border-blue-500 bg-white shadow-md"
          : "bg-gray-200/60 hover:bg-gray-200/80"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center p-6">
        <span
          className={`text-sm font-medium ${
            active ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export default JobCategoryCard;
