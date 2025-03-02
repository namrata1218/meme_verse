import React from "react";
import { Instagram, Github, Twitter, HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="footer-color bg-gray-900 text-white p-6 rounded-md shadow-md text-center">
      <h3 className="text-xl font-semibold">Meme Verse</h3>
      <p className="text-gray-400 text-sm">©2025 MemeVerse. All rights reserved.</p>

     
      <div className="footer-icon  flex items-center justify-center gap-6 p-4">
        <Instagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
        <Github className="w-6 h-6 hover:text-gray-400 cursor-pointer" />
        <Twitter className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
      </div>
      <p>
      Made with ❤️ by the MemeVerse Team
      </p>
    </div>
  );
};

export default Footer;
