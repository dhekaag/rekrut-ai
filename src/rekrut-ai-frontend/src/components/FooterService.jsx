import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FooterServices = () => {
  return (
    <footer className="bg-[#27809D] text-white py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-6">
          <div className="text-center md:text-left max-w-md">
            <h3 className="text-2xl font-bold mb-2">RekrutAI</h3>
            <p className="text-white/90">
              Elevate your career with AI-powered interview preparation
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20 hover:text-white"
            >
              <Facebook size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20 hover:text-white"
            >
              <Twitter size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20 hover:text-white"
            >
              <Instagram size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/20 hover:text-white"
            >
              <Linkedin size={18} />
            </Button>
          </div>
        </div>

        <Separator className="bg-white/20 my-4" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-white/70 text-sm">
          <div className="mb-4 sm:mb-0">
            © 2025 RekrutAI. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterServices;
