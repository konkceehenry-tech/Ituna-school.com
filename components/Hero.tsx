
import React from 'react';
// FIX: Imported CurrentUser from the correct types file instead of App.tsx
import { CurrentUser } from '../types';

const Hero: React.FC<{ currentUser: CurrentUser | null }> = ({ currentUser }) => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to Ituna secondary<br />School Portal
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your gateway to personalized learning, comprehensive resources, and a vibrant school community.
        </p>
        {!currentUser && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#signup"
              className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-800 w-full sm:w-auto"
            >
              Sign Up
            </a>
            <a 
              href="#login"
              className="bg-transparent border border-gray-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 hover:border-white transition-colors inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-black w-full sm:w-auto"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;