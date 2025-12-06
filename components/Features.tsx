
import React from 'react';
import { PenIcon } from './icons/PenIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { UserIcon } from './icons/UserIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
    <div className="bg-gray-200 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    <a 
      href="#" 
      className="font-semibold inline-flex items-center group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
      aria-label={`Learn more about ${title}`}
    >
      Learn More
      <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
);

const Features: React.FC = () => {
  const featuresData = [
    {
      icon: <PenIcon className="w-8 h-8 text-black dark:text-white" />,
      title: 'Personalized Digital Portfolios',
      description: 'Track your academic journey, showcase projects, and set goals with a portfolio that grows with you.',
    },
    {
      icon: <GraduationCapIcon className="w-8 h-8 text-black dark:text-white" />,
      'title': 'Interactive Online Courses',
      description: 'Engage with dynamic course material, collaborative projects, and access resources anytime, anywhere.',
    },
    {
      icon: <UserIcon className="w-8 h-8 text-black dark:text-white" />,
      'title': 'Expert Academic Advising',
      description: 'Connect with dedicated advisors for guidance on course selection, career paths, and college applications.',
    },
  ];

  return (
    <section className="bg-white dark:bg-black py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Choose the essential features that enhance learning and simplified management.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;