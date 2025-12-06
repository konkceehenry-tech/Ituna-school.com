
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { getTeacherById } from '../services/database';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { CurrentUser } from '../types';

interface TeacherProfilePageProps {
  teacherId: string;
  onSearchToggle: () => void;
  currentUser: CurrentUser | null;
  onLogout: () => void;
}

const InfoItem: React.FC<{ icon: React.ReactNode, children: React.ReactNode }> = ({ icon, children }) => (
    <li className="flex items-start space-x-3">
        <span className="flex-shrink-0 w-6 h-6 text-sky-400 pt-1">{icon}</span>
        <span className="text-gray-300">{children}</span>
    </li>
);

const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({ teacherId, onSearchToggle, currentUser, onLogout }) => {
  const teacher = getTeacherById(parseInt(teacherId));

  if (!teacher) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
        <main className="flex-grow container mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Teacher Not Found</h1>
          <p className="text-gray-300">The profile you are looking for does not exist.</p>
          <a href="#our-team" className="mt-8 inline-flex items-center text-sky-400 font-semibold group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black">
            <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Our Team
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans">
      <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-8">
            <a href="#our-team" className="inline-flex items-center text-sky-400 font-semibold group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black">
              <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Our Team
            </a>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-2xl p-8 md:p-12">
             <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                <div className="md:col-span-1">
                    <img 
                        src={teacher.image}
                        alt={`Professional portrait of ${teacher.name}`}
                        className="rounded-lg w-full aspect-square object-cover shadow-lg"
                    />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{teacher.name}</h1>
                    <p className="text-2xl text-sky-400 mt-2 mb-6">{teacher.title}</p>
                    <p className="text-gray-300 text-lg leading-relaxed">{teacher.bio}</p>
                </div>
            </div>

            <div className="border-t border-gray-700 my-10"></div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Professional Details */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <BookOpenIcon className="w-7 h-7 mr-3 text-sky-400" />
                                Subjects Taught
                            </h2>
                            <ul className="space-y-2 list-disc list-inside text-gray-300">
                                {teacher.subjects.map((subject, index) => (
                                   <li key={index}>{subject}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <BriefcaseIcon className="w-7 h-7 mr-3 text-sky-400" />
                                Qualifications
                            </h2>
                            <ul className="space-y-2 list-disc list-inside text-gray-300">
                                {teacher.qualifications.map((qual, index) => (
                                   <li key={index}>{qual}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Contact
                    </h2>
                    <ul className="space-y-4">
                        <InfoItem icon={<EmailIcon />}>
                           <a href={`mailto:${teacher.email}`} className="hover:text-sky-300 transition-colors break-all" aria-label={`Email ${teacher.name} at ${teacher.email}`}>{teacher.email}</a>
                        </InfoItem>
                         <InfoItem icon={<PhoneIcon />}>
                           <a href={`tel:${teacher.phone.replace(/[\s()-]/g, '')}`} className="hover:text-sky-300 transition-colors" aria-label={`Call ${teacher.name} at ${teacher.phone}`}>{teacher.phone}</a>
                        </InfoItem>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeacherProfilePage;