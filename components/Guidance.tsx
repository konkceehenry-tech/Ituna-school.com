import React from 'react';

const Guidance: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Early Access Today
          </h2>
          <p className="text-gray-300 mb-8">
            Be the first to experience our new platform features. Sign up now for exclusive access and help shape the future of learning at Ituna.
          </p>
          <div className="flex space-x-4">
             <button 
                onClick={() => alert('Getting started!')}
                className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-black"
             >
                Get Started
            </button>
          </div>
        </div>
        <div>
          <img 
            src="https://picsum.photos/800/600?random=4" 
            alt="A female student smiling while using a laptop in a modern library setting." 
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Guidance;