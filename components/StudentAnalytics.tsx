
import React, { useMemo } from 'react';
import { Student } from '../types';
import { Assignment } from './MyTasks';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { TrendingDownIcon } from './icons/TrendingDownIcon';

interface StudentAnalyticsProps {
  student: Student;
  assignments: Assignment[];
}

const StudentAnalytics: React.FC<StudentAnalyticsProps> = ({ student, assignments }) => {
  // 1. Calculate Assignment Statistics
  const assignmentStats = useMemo(() => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.isComplete).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, percentage };
  }, [assignments]);

  // 2. Get Latest Term Academic Data
  const latestTermData = useMemo(() => {
    if (!student.academicHistory || student.academicHistory.length === 0) return [];
    // Assuming academicHistory is sorted or we take the first one as latest for now
    // In mockData it seems index 0 is Fall 2023 (latest)
    return student.academicHistory[0].records;
  }, [student]);

  // 3. Identify Strengths and Weaknesses
  const insights = useMemo(() => {
    if (latestTermData.length === 0) return { strongest: null, weakest: null };
    
    const sorted = [...latestTermData].sort((a, b) => b.grade - a.grade);
    return {
      strongest: sorted[0],
      weakest: sorted[sorted.length - 1]
    };
  }, [latestTermData]);


  // Chart Helpers
  const renderBarChart = () => {
    if (latestTermData.length === 0) return <p className="text-gray-400">No academic data available.</p>;

    const chartHeight = 200;
    const barWidth = 40;
    const gap = 30;
    const maxGrade = 100;
    const width = latestTermData.length * (barWidth + gap);

    return (
      <div className="overflow-x-auto">
        <svg width={width} height={chartHeight + 30} className="mx-auto">
          {latestTermData.map((record, index) => {
            const barHeight = (record.grade / maxGrade) * chartHeight;
            const x = index * (barWidth + gap);
            const y = chartHeight - barHeight;
            
            // Color coding based on grade
            let fillClass = '#38bdf8'; // sky-400
            if (record.grade >= 90) fillClass = '#4ade80'; // green-400
            else if (record.grade < 70) fillClass = '#f87171'; // red-400

            return (
              <g key={record.subject}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={fillClass}
                  rx="4"
                  className="transition-all duration-500 hover:opacity-80"
                />
                {/* Label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="fill-gray-400 text-xs"
                >
                  {record.subject.substring(0, 3)}
                </text>
                 {/* Grade Value */}
                 <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="fill-white text-xs font-bold"
                >
                  {record.grade}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderDonutChart = () => {
    const size = 160;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (assignmentStats.percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#1f2937" // gray-800
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={assignmentStats.percentage === 100 ? '#4ade80' : '#38bdf8'}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-3xl font-bold text-white">{assignmentStats.percentage}%</span>
                <p className="text-xs text-gray-400">Completed</p>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <p className="text-gray-400 text-sm">Real-time overview of your academic performance.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-gray-400 text-sm mr-2">Calculated Overall GPA:</span>
              <span className="text-white font-bold">{student.overallGrade}%</span>
          </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-sky-500">
            <h3 className="text-gray-400 text-sm uppercase font-bold mb-1">Attendance Rate</h3>
            <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white">{student.attendance}%</span>
                <span className={`text-sm font-semibold flex items-center mb-1 ${student.attendance >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {student.attendance >= 90 ? 'Excellent' : 'Needs Attention'}
                </span>
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
             <h3 className="text-gray-400 text-sm uppercase font-bold mb-1">Total Assignments</h3>
             <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white">{assignmentStats.total}</span>
                <span className="text-sm text-purple-400 font-semibold mb-1 flex items-center">
                   {assignmentStats.pending} Pending
                </span>
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500">
             <h3 className="text-gray-400 text-sm uppercase font-bold mb-1">Class Rank (Est.)</h3>
             <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white">Top 15%</span>
                <span className="text-sm text-green-400 font-semibold mb-1 flex items-center">
                   <TrendingUpIcon className="w-4 h-4 mr-1" /> Rising
                </span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Performance */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">Subject Performance (Latest Term)</h3>
            <div className="flex justify-center items-end h-64">
                {renderBarChart()}
            </div>
        </div>

        {/* Assignment Progress */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
             <h3 className="text-lg font-bold text-white mb-6 self-start w-full">Assignment Completion</h3>
             {renderDonutChart()}
             <div className="mt-6 w-full space-y-3">
                 <div className="flex justify-between items-center text-sm">
                     <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>Completed</span>
                     <span className="font-bold text-white">{assignmentStats.completed}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                     <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-gray-700 mr-2 border border-gray-500"></span>Pending</span>
                     <span className="font-bold text-white">{assignmentStats.pending}</span>
                 </div>
             </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Academic Insights</h3>
          <div className="grid md:grid-cols-2 gap-6">
              {insights.strongest && (
                <div className="flex items-start bg-black/20 p-4 rounded-lg">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4">
                        <TrendingUpIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Strength: {insights.strongest.subject}</h4>
                        <p className="text-gray-400 text-sm mt-1">
                            You are performing exceptionally well in <strong>{insights.strongest.subject}</strong> with a grade of <span className="text-green-400 font-bold">{insights.strongest.grade}%</span>. Keep up the great work!
                        </p>
                    </div>
                </div>
              )}
               {insights.weakest && (
                <div className="flex items-start bg-black/20 p-4 rounded-lg">
                    <div className="bg-red-500/20 p-3 rounded-full mr-4">
                        <TrendingDownIcon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Focus Area: {insights.weakest.subject}</h4>
                        <p className="text-gray-400 text-sm mt-1">
                            Your grade in <strong>{insights.weakest.subject}</strong> is <span className="text-red-400 font-bold">{insights.weakest.grade}%</span>. Consider scheduling extra time with your teacher or using the AI Tools for study assistance.
                        </p>
                    </div>
                </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
