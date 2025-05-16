import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Clean up the listener on component unmount
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-dark-text">Hi, {user.email}</span>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button className="bg-action-orange hover:bg-action-orange/90 text-white">
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
