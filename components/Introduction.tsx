
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const Introduction: React.FC = () => {
  return (
    <section className="bg-white dark:bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Introduction</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Welcome to Ituna secondary School Where Future Begin
          </h2>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Ituna secondary School is committed to fostering a challenging and supportive environment where students are encouraged to pursue their passions and reach their full potential. Our innovative curriculum and dedicated faculty prepare students for success in college and beyond.
          </p>
          <a href="#" className="font-semibold inline-flex items-center group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black">
            Learn More
            <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Introduction;