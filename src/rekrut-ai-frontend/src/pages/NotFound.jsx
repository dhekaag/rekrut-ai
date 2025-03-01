import Lottie from "lottie-react";
import animationData from "@/assets/animations/404.json";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto mb-4">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>

      <div className="max-w-lg">
        <p className="text-gray-600 text-lg mb-2">
          The page you are looking for doesn't exist.
        </p>
        <p className="text-gray-600 text-lg mb-8">
          Or it's currently under development.{" "}
          <span className="font-medium">Coming Soon!</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Link to="/">
            <Home size={16} />
            Return Home
          </Link>
        </Button>

        <Button variant="outline" className="gap-2" onClick={handleGoBack}>
          <ArrowLeft size={16} />
          Go Back
        </Button>
      </div>

      <p className="text-gray-500 text-sm mt-10">
        If you believe this is a mistake, please contact support.
      </p>
    </div>
  );
};

export default NotFound;
