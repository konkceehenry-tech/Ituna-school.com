

import React from 'react';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';

const Footer: React.FC = () => {
  const footerLinks = {
    'About': ['About Us', 'Courses', 'Instructor', 'Events'],
    'Support': ['Documentation', 'Forums', 'Language', 'Admin Dashboard'],
    'Company': ['Contact Us', 'Our Team', 'Portfolio', 'Blog'],
  };

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, url: 'https://facebook.com/itunahigh' },
    { name: 'Twitter', icon: <TwitterIcon className="w-6 h-6" />, url: 'https://twitter.com/itunahigh' },
    { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, url: 'https://instagram.com/itunahigh' },
    { name: 'LinkedIn', icon: <LinkedInIcon className="w-6 h-6" />, url: 'https://linkedin.com/school/itunahigh' },
  ];

  const renderLink = (link: string) => {
    if (link === 'Admin Dashboard') {
      return <a href="#admin" className="hover:text-black dark:hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900">{link}</a>;
    }
    return <a href="#" className="hover:text-black dark:hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900">{link}</a>;
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Ituna</h3>
            <p>A new way to make the payments easy, reliable and secure.</p>
          </div>
          <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-black dark:text-white mb-4">{title}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link} className="mb-2">
                      {renderLink(link)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Ituna. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map(social => (
              <a 
                key={social.name} 
                href={social.url} 
                className="text-gray-500 hover:text-black dark:hover:text-white transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900" 
                aria-label={`Follow us on ${social.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;