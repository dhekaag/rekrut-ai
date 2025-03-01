import { useState } from "react";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full bg-gradient-to-t from-[#27809D] via-[#27809D]/60 to-[#FEFEFF] py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1
          className={`text-7xl md:text-8xl lg:text-9xl font-medium text-white opacity-60 tracking-wider transition-all duration-700 ${
            isHovered ? "opacity-80 scale-105 tracking-widest" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          RekrutAi
        </h1>

        <div className="mt-16 text-white/70 text-sm">
          © {new Date().getFullYear()} RekrutAi. All rights reserved.
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/4 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white/5 rounded-full"></div>
      </div>
    </div>
  );
}
