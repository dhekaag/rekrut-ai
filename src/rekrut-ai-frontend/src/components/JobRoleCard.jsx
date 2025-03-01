import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JobRoleCard = ({ role, colorClass }) => {
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

  return (
    <Card
      className={`rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${colorClass} border-2`}
    >
      <div className="p-5">
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{role.job}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {role.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {role.topics &&
              role.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic.id}
                  className="inline-block bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                >
                  {topic.topic}
                </span>
              ))}
          </div>

          <div className="mt-4 text-center">
            <Button className={`w-full rounded-md font-medium ${buttonColor}`}>
              Take practice interview
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobRoleCard;
