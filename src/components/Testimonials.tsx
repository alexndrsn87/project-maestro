
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp } from 'lucide-react';

const testimonials = [
  {
    quote: "This app has completely transformed how I organize our weekly games. No more chasing people for money or spending hours creating balanced teams.",
    name: "Dave Johnson",
    role: "Group Organizer",
    type: "Organizer"
  },
  {
    quote: "The team balancing is spot on! Since we started using this app, every game has been competitive and much more enjoyable.",
    name: "Sarah Williams",
    role: "Regular Player",
    type: "Player"
  },
  {
    quote: "As someone who plays in multiple groups, I love being able to see all my games in one place. The payment tracking is brilliant too!",
    name: "Mike Thompson",
    role: "Football Enthusiast",
    type: "Player"
  },
  {
    quote: "The post-match ratings make it fun to see how you're performing, and the AI team selection has made our games so much more balanced.",
    name: "Emma Richards",
    role: "Casual Player",
    type: "Player"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-pitch-green text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join hundreds of satisfied organizers and players who've improved their 5-a-side experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-none">
              <CardContent className="p-6">
                <div className="mb-4 text-action-orange">
                  <ThumbsUp className="h-8 w-8" />
                </div>
                <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-action-orange flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm opacity-75">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
