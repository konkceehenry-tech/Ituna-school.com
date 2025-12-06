
import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const About: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
           <p className="text-sm text-gray-400 uppercase tracking-widest">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Unlock Your Potential with the Best Tutors Here
          </h2>
          <p className="text-gray-300 mb-6">
            Our platform provides access to a network of highly qualified tutors and mentors. Whether you need help with a specific subject or guidance on a long-term project, we have the resources to help you succeed.
          </p>
          <a 
            href="#" 
            className="text-white font-semibold inline-flex items-center group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black"
            aria-label="Learn more about our tutors and mentors"
          >
            Learn More
            <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div>
          <img 
            src="https://picsum.photos/800/600" 
            alt="A student and tutor work together at a table with books and a laptop." 
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
