
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const Stats: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Our Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Empowering Students for a Brighter Future
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <p className="text-6xl font-bold text-white mb-2">98%</p>
            <p className="text-gray-400 mb-4">
              College acceptance rate for our graduating seniors.
            </p>
            <a href="#" className="text-white font-semibold inline-flex items-center group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-gray-900">
              View Success Stories
              <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="flex-1">
            <p className="text-6xl font-bold text-white mb-2">10k+</p>
            <p className="text-gray-400">
              Students have benefited from our advanced learning programs and resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
