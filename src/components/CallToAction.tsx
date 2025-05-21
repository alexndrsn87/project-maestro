
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleSignUpNow = () => {
    navigate('/signup'); // Or your designated sign-up route
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-pitch-green rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your 5-a-side Experience?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of players and organizers who've made 5-a-side football simpler, fairer, and more fun.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-action-orange hover:bg-action-orange/90 text-white text-lg px-6 py-6"
              onClick={handleSignUpNow}
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white text-lg px-6 py-6">
              See Pricing
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">No credit card required. Free plan available.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
