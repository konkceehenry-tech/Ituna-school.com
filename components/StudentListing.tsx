
import React from 'react';
import { getStudents } from '../services/database';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const StudentListing: React.FC = () => {
  const students = getStudents();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Student Management</h2>
      <div className="bg-gray-900 rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-black">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Grade</th>
              <th className="p-4 font-semibold">Overall Average</th>
              <th className="p-4 font-semibold">Attendance</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-black'} hover:bg-gray-800`}>
                <td className="p-4 text-white flex items-center gap-3">
                    <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                    <span>{student.name}</span>
                </td>
                <td className="p-4">Grade {student.grade}</td>
                <td className="p-4">{student.overallGrade}%</td>
                <td className="p-4">{student.attendance}%</td>
                <td className="p-4 text-right">
                  <a href={`#/students/${student.id}`} className="text-sky-400 font-semibold inline-flex items-center group">
                    View Profile
                    <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListing;