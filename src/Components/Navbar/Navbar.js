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
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Smile className="mr-2" /> Meme Verses
        </h1>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/memes">Explorer</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/profile">Profile</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-menu">
          <Link href="/">Home</Link>
          <Link href="/memes">Explorer</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/profile">Profile</Link>
        </div>
      )}
    </nav>
  );
}
