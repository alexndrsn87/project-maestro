
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Create Your Group",
    description: "Set up your football group in minutes. Add players, set your venue, and define game parameters."
  },
  {
    number: "02",
    title: "Schedule Games",
    description: "Create a new game, set the date, time, and location, then let the app handle player invitations."
  },
  {
    number: "03",
    title: "Players Confirm",
    description: "Players receive notifications and confirm their availability with one tap."
  },
  {
    number: "04",
    title: "AI Creates Teams",
    description: "Our smart algorithm balances teams based on skill level and preferred positions."
  },
  {
    number: "05",
    title: "Play the Game",
    description: "Enjoy a well-balanced match with friends or colleagues."
  },
  {
    number: "06",
    title: "Rate & Review",
    description: "After the match, rate other players anonymously to help improve future team balancing."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pitch-green">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From organizing to playing, FiveASide Manager simplifies every step of the process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <span className="flex items-center justify-center h-12 w-12 rounded-full bg-pitch-green text-white text-xl font-bold">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute h-full w-0.5 bg-gray-200 left-6 top-12 -bottom-12 transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
