
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient text-white py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Manage Your Five-A-Side Games Like a Pro</h1>
          <p className="text-lg md:text-xl mb-8">
            Stop struggling with WhatsApp groups and spreadsheets. FiveASide Manager takes the hassle out of organizing games, balancing teams, and collecting fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-action-orange hover:bg-action-orange/90 text-white text-lg px-6 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white text-lg px-6 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
