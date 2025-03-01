"use client"; // Ensures the component only runs on the client side

import { useState, useEffect } from "react";
import { Smile, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null; 

  return (
    <nav className="bg-gray-900  p-4">
      <div className=" text-white mx-auto flex justify-between items-center">
       
        <h1 className="text-xl font-bold flex items-center">
          <Smile className="mr-2" /> Meme Verses
        </h1>

      
        <div className="  hidden md:flex space-x-6">
          <Link href="/" className=" hover:text-gray-400">Home</Link>
          <Link href="/memes" className="hover:text-gray-400">Explorer</Link>
          <Link href="/upload" className="hover:text-gray-400">Upload</Link>
          <Link href="/leaderboard" className="hover:text-gray-400">Leaderboard</Link>
          <Link href="/profile" className="hover:text-gray-400">Profile</Link>
        </div>

      
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

  
      {isOpen && (
        <div className="md:hidden text-white   py-4 text-center">
          <Link href="/" className="block py-2 hover:text-gray-400">Home</Link>
          <Link href="/memes" className="block py-2 hover:text-gray-400">Explorer</Link>
          <Link href="/upload" className="block py-2 hover:text-gray-400">Upload</Link>
          <Link href="/leaderboard" className="block py-2 hover:text-gray-400">Leaderboard</Link>
          <Link href="/profile" className="block py-2 hover:text-gray-400">Profile</Link>
        </div>
      )}
    </nav>
  );
}
