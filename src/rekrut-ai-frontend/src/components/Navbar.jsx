import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="h-20"></div>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "w-11/12 max-w-5xl shadow-xl rounded-full bg-white/90 backdrop-blur-md px-6 py-4 border border-gray-100"
            : "w-full bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between ${
            isScrolled ? "" : "container mx-auto px-4"
          }`}
        >
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RekrutAI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 ml-1 animate-pulse"></span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                className={`font-medium transition-all hover:text-blue-600 relative ${
                  isActive("/")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {isActive("/") && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></span>
                )}
                Home
              </Link>
              <Link
                to="/services"
                className={`font-medium transition-all hover:text-blue-600 relative ${
                  isActive("/services")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {isActive("/services") && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></span>
                )}
                Services
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              <Link to={"/services"} className="flex items-center">
                Join Us <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <button
            className={`md:hidden p-2 rounded-full transition-all ${
              isOpen
                ? "bg-red-100 text-red-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-4 right-4 mt-2 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 p-5 transform translate-y-0"
              : "max-h-0 opacity-0 p-0 transform -translate-y-4"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`p-3 rounded-lg transition-colors hover:bg-blue-50 flex items-center ${
                isActive("/")
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {isActive("/") && (
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
              )}
              Home
            </Link>
            <Link
              to="/services"
              className={`p-3 rounded-lg transition-colors hover:bg-blue-50 flex items-center ${
                isActive("/services")
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {isActive("/services") && (
                <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
              )}
              Services
            </Link>
            <hr className="border-gray-200" />
            <div className="flex flex-col space-y-3 pt-2">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-lg shadow-md">
                <Link
                  to={"/services"}
                  className="flex items-center justify-center w-full"
                >
                  Join Us <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
