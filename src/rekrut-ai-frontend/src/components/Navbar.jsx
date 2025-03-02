import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

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
            ? "w-11/12 max-w-4xl shadow-lg rounded-full bg-white px-6 py-4"
            : "w-full bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between ${
            isScrolled ? "" : "container mx-auto px-4"
          }`}
        >
          <Link to="/" className="flex items-center">
            <h1 className="font-bold text-2xl">RekrutAI</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary font-semibold" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`font-medium transition-colors hover:text-primary ${
                  isActive("/services")
                    ? "text-primary font-semibold"
                    : "text-gray-700"
                }`}
              >
                Services
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* <Button
              variant="outline"
              className="font-bold text-white bg-[#27809D] hover:bg-[#1F6A80] hover:text-white"
            >
              Sign Up
            </Button> */}
            <Button className="bg-[#123CA4] hover:bg-blue-800 text-white font-bold">
              <Link to={"/services"}>Join Us</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden absolute top-full left-4 right-4 mt-2 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 p-5 transform translate-y-0"
              : "max-h-0 opacity-0 p-0 transform -translate-y-4"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`p-2 rounded-md transition-colors hover:bg-gray-50 ${
                isActive("/") ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`p-2 rounded-md transition-colors hover:bg-gray-50 ${
                isActive("/services") ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              Services
            </Link>
            <hr className="border-gray-200" />
            <div className="flex flex-col space-y-3 pt-2">
              {/* <Button
                variant="outline"
                className="font-bold text-white bg-[#27809D] hover:bg-[#1F6A80] hover:text-white"
              >
                Sign Up
              </Button> */}
              <Button className="bg-[#123CA4] hover:bg-blue-800 text-white font-bold">
                <Link to={"/services"}>Join Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
