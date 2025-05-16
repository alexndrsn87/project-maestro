
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <AuthForm />
      <Footer />
    </div>
  );
};

export default Index;
