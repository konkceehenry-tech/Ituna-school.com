
import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';


const ReportCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-gray-900 p-8 rounded-lg">
        <div className="flex items-center text-white mb-4">
            {icon}
            <h3 className="text-xl font-bold ml-3">{title}</h3>
        </div>
        <div className="text-gray-300">{children}</div>
    </div>
);

const Reports: React.FC = () => {
    return (
        <section className="bg-black py-20 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Analytics</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        School Analytics Dashboard
                    </h2>
                    <p className="text-gray-300 mt-4">
                        An overview of school-wide performance, engagement, and student progress.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <ReportCard icon={<ChartBarIcon className="w-8 h-8 text-sky-400" />} title="Academic Performance">
                        <p className="text-4xl font-bold text-white mb-2">85%</p>
                        <p className="text-gray-400">Average Grade</p>
                        <p className="text-lg text-white mt-4">92% Pass Rate</p>
                        <p className="text-sm text-gray-500">Top Subject: Science</p>
                    </ReportCard>
                     <ReportCard icon={<UserGroupIcon className="w-8 h-8 text-sky-400" />} title="Platform Engagement">
                        <p className="text-4xl font-bold text-white mb-2">95%</p>
                        <p className="text-gray-400">Daily Student Logins</p>
                        <p className="text-lg text-white mt-4">120+</p>
                        <p className="text-sm text-gray-500">Active Clubs & Events</p>
                    </ReportCard>
                     <ReportCard icon={<DocumentTextIcon className="w-8 h-8 text-sky-400" />} title="Resource Contributions">
                        <p className="text-4xl font-bold text-white mb-2">5K+</p>
                        <p className="text-gray-400">Documents Uploaded</p>
                        <p className="text-lg text-white mt-4">12K+</p>
                        <p className="text-sm text-gray-500">Total Downloads</p>
                    </ReportCard>
                </div>

                <div>
                     <div className="text-center max-w-3xl mx-auto mb-12">
                         <h3 className="text-2xl md:text-3xl font-bold">Student Report Spotlight</h3>
                     </div>
                     <div className="bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-8 shadow-2xl">
                        <div className="md:col-span-2">
                            <h4 className="text-2xl font-bold text-white">Mary Phiri</h4>
                            <p className="text-gray-400">Grade: 9</p>
                        </div>
                        <div>
                             <p className="text-gray-400 mb-2">Overall Performance</p>
                             <div className="flex items-center">
                                <p className="text-5xl font-bold text-white mr-4">78%</p>
                                <div className="flex items-center text-green-400">
                                    <TrendingUpIcon className="w-6 h-6"/>
                                    <span className="font-semibold ml-1">Improved by 5%</span>
                                </div>
                             </div>
                             <p className="text-sm text-gray-500 mt-1">Since last term</p>
                        </div>
                         <div>
                            <p className="text-gray-400 mb-2">Engagement</p>
                            <p className="text-2xl font-semibold text-white">Attendance: 92%</p>
                            <p className="text-sm text-white">Contributions: 15 uploads, 28 downloads</p>
                        </div>
                         <div className="md:col-span-2 space-y-4">
                             <div>
                                 <h5 className="font-semibold text-white mb-1">Teacher Comment:</h5>
                                 <p className="text-gray-300 bg-gray-800 p-3 rounded-md italic">“Mary is improving steadily in Mathematics, needs more focus in English essays.”</p>
                             </div>
                             <div>
                                 <h5 className="font-semibold text-white mb-1">Student Feedback:</h5>
                                 <p className="text-gray-300 bg-gray-800 p-3 rounded-md italic">“I enjoy the science lab sessions the most.”</p>
                             </div>
                         </div>
                     </div>
                </div>

            </div>
        </section>
    );
};

export default Reports;
