
import React from 'react';

const Discover: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Discover the Future of Ituna
          </h2>
          <p className="text-gray-300 mb-8">
            We are constantly evolving to meet the needs of our students. Explore our upcoming programs, innovative learning tools, and campus expansion plans designed to shape the next generation of leaders.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#"
              className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-black"
            >
              Join Now
            </a>
            <a 
              href="#"
              className="bg-transparent border border-gray-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 hover:border-white transition-colors inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-black"
            >
              Learn More
            </a>
          </div>
        </div>
        <div>
          <img 
            src="https://picsum.photos/800/600?random=2" 
            alt="A diverse group of students collaborating on a project around a table." 
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Discover;
