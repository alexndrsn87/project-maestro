
import React from 'react';
import { Calendar, DollarSign, Users, Star, Award, Gift, MessageSquare } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Effortless Organization",
    description: "Create groups, manage players, and schedule games with just a few clicks. No more endless WhatsApp messages.",
    icon: <Calendar className="h-10 w-10 text-pitch-green" />,
    forWhom: "Organizers"
  },
  {
    title: "AI Team Balancing",
    description: "Our AI creates balanced teams based on player ratings and positions, ensuring every match is competitive and fun.",
    icon: <Users className="h-10 w-10 text-pitch-green" />,
    forWhom: "Everyone"
  },
  {
    title: "Simplified Payments",
    description: "Track who's paid and who hasn't. Automatic reminders mean less chasing and more playing.",
    icon: <DollarSign className="h-10 w-10 text-pitch-green" />,
    forWhom: "Organizers"
  },
  {
    title: "Anonymous Player Ratings",
    description: "Rate your teammates and opponents after each game, helping our AI improve team balancing over time.",
    icon: <Star className="h-10 w-10 text-pitch-green" />,
    forWhom: "Players"
  },
  {
    title: "Game Summaries",
    description: "Receive AI-generated match reports after each game, complete with 'Man of the Match' highlights.",
    icon: <Award className="h-10 w-10 text-pitch-green" />,
    forWhom: "Everyone"
  },
  {
    title: "Community Building",
    description: "Build your football community with features like end-of-season kitty management and positive feedback sharing.",
    icon: <Gift className="h-10 w-10 text-pitch-green" />,
    forWhom: "Everyone"
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pitch-green">Features That Make the Difference</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Designed for both organizers and players, FiveASide Manager simplifies every aspect of 5-a-side football.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card border-none shadow-md hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <span className="inline-block bg-pitch-green/10 text-pitch-green rounded-full px-3 py-1 text-sm">
                  For: {feature.forWhom}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
