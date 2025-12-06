
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const faqData = [
  {
    question: 'What are the school hours?',
    answer: 'The school day runs from 8:00 AM to 3:00 PM, Monday through Friday. Extracurricular activities may take place outside of these hours.',
  },
  {
    question: 'How can I track my child\'s academic progress?',
    answer: 'You can monitor your child\'s grades, attendance, and assignments through the Ituna secondary School Portal. Log in with your parent account to access the dashboard.',
  },
  {
    question: 'What is the admission process for new students?',
    answer: 'The admission process begins with an online application, followed by an entrance exam and an interview. Please visit the admissions section of our website for detailed information and deadlines.',
  },
  {
    question: 'What extracurricular activities are offered?',
    answer: 'We offer a wide range of activities, including sports teams (soccer, basketball, swimming), clubs (debate, science, coding), and arts programs (drama, music, painting). A full list is available on the portal.',
  },
  {
    question: 'How can I contact a teacher or administrator?',
    answer: 'You can send a direct message to teachers and staff through the portal\'s messaging system. For urgent matters, please call the school office directly.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-900 py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 uppercase tracking-widest">Help Center</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-black rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <ChevronDownIcon
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openIndex !== index}
              >
                <div className="p-6 pt-0">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;