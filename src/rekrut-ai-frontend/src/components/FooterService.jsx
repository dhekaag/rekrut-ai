import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const FooterServices = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/70 to-transparent opacity-80"></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDUwdjUwSDBWMHoiLz48cGF0aCBkPSJNNTAgNTBMMCAwaDUwdjUweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="max-w-lg text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start">
              Rekrut<span className="text-blue-300">AI</span>
              <div className="ml-2 w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Elevate your career with AI-powered interview preparation. We help
              you succeed in your job interviews through personalized practice.
            </p>
            <Button
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-blue-900 border-none mt-2 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-200 text-center md:text-left">
                Navigation
              </h4>
              <ul className="space-y-3">
                <li className="text-center md:text-left">
                  <Link
                    to="/"
                    className="text-white/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-center md:text-left">
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors duration-200 inline-block"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-white/70 text-sm">
          <div className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} RekrutAI. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors duration-200">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterServices;
