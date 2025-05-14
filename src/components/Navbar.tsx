
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-pitch-green text-2xl font-bold">FiveASide Manager</h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-dark-text hover:text-pitch-green transition-colors">Features</a>
          <a href="#how-it-works" className="text-dark-text hover:text-pitch-green transition-colors">How It Works</a>
          <a href="#testimonials" className="text-dark-text hover:text-pitch-green transition-colors">Testimonials</a>
        </div>
        <div>
          <Button className="bg-action-orange hover:bg-action-orange/90 text-white">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
