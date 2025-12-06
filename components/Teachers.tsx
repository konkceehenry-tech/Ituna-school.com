


import React from 'react';
import { getTeachers } from '../services/database';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { Teacher } from '../types';

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col group transition-transform transform hover:scale-105">
    <img src={teacher.image} alt={`Portrait of ${teacher.name}`} className="w-full h-64 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
      <p className="text-sky-400 mb-4">{teacher.title}</p>
      <p className="text-gray-400 text-sm mb-6 flex-grow">{teacher.bio.substring(0, 100)}...</p>
      <a 
        href={`/#/teachers/${teacher.id}`} 
        className="text-white font-semibold inline-flex items-center mt-auto rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-gray-900 self-start"
      >
        View Profile
        <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

const Teachers: React.FC = () => {
  const teachers = getTeachers();
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-gray-400 uppercase tracking-widest">Faculty</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Meet Our Team
          </h2>
          <p className="text-gray-300 mt-4">
            Our dedicated and experienced educators are the heart of Ituna secondary School.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;