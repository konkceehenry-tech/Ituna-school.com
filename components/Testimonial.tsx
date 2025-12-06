import React from 'react';

const Testimonial: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <svg className="w-12 h-12 text-gray-600 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.333 8A5.333 5.333 0 004 13.333v9.334A5.333 5.333 0 009.333 28h9.334A5.333 5.333 0 0024 22.667V14.5L18.667 8H9.333zm16 0A5.333 5.333 0 0020 13.333v9.334A5.333 5.333 0 0025.333 28H28V14.5L22.667 8h-2.667z"></path>
        </svg>
        <p className="text-2xl md:text-3xl font-light text-gray-200 max-w-4xl mx-auto mb-8">
          "Ituna has the best platform for sharing your knowledge. Their structure provides an effective way to teach and engage with students on a deeper, more meaningful level."
        </p>
        <img 
          src="https://picsum.photos/100/100?face" 
          alt="Photo of Jane Doe, Lead Educator" 
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h4 className="text-lg font-semibold text-white">Jane Doe</h4>
        <p className="text-gray-400">Lead Educator</p>
      </div>
    </section>
  );
};

export default Testimonial;
