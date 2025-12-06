
import React, { useState } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribed) return;

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (validateEmail(email)) {
      setIsSubscribed(true);
      setEmail('');
      setError('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000); // Reset form after 5 seconds
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  const inputClassName = `w-full px-6 py-3 text-black rounded-l-full focus:outline-none placeholder:text-gray-500 relative focus:z-10 transition-all duration-300 ${
    error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-sky-500'
  }`;

  return (
    <section 
      className="relative py-20 md:py-32 text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=1&random=3')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to get the latest news about our curriculum, events, and student achievements directly to your inbox.
        </p>
        
        {isSubscribed ? (
           <div className="max-w-md mx-auto text-center success-animation">
            <div className="inline-block bg-green-500/20 p-4 rounded-full">
              <CheckCircleIcon className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mt-4">Subscription Confirmed!</h3>
            <p className="text-gray-300 mt-2">You're on the list. Keep an eye on your inbox for the latest updates.</p>
          </div>
        ) : (
            <form 
              className="max-w-md mx-auto"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex relative">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input 
                  id="email-input"
                  type="email" 
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={handleChange}
                  className={inputClassName}
                  aria-invalid={!!error}
                  aria-describedby="email-error"
                />
                <button 
                  type="submit"
                  className="bg-white text-black font-semibold px-8 py-3 rounded-r-full hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-800"
                >
                  Subscribe
                </button>
              </div>
              {error && <p id="email-error" className="text-red-500 text-sm mt-2" role="alert">{error}</p>}
            </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
