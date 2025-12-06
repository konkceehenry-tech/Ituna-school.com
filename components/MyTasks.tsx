import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

export type Priority = 'Low' | 'Medium' | 'High';

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  isComplete: boolean;
}

interface MyAssignmentsProps {
  assignments: Assignment[];
  onAddAssignment: (assignment: Omit<Assignment, 'id' | 'isComplete'>) => void;
  onToggleComplete: (id: number) => void;
  onDeleteAssignment: (id: number) => void;
}

const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education', 'Other'];

const MyAssignments: React.FC<MyAssignmentsProps> = ({ assignments, onAddAssignment, onToggleComplete, onDeleteAssignment }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    onAddAssignment({
      title,
      subject,
      dueDate,
      priority,
    });

    setTitle('');
    setSubject('');
    setDueDate('');
    setPriority('Medium');
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    // Use UTC methods to avoid timezone shift issues with date-only strings
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
  };


  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">My Assignments</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-black/30 rounded-lg items-end">
        <div className="lg:col-span-2">
            <label htmlFor="assignment-title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              id="assignment-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Essay on WWII"
              className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
        </div>
        <div>
            <label htmlFor="assignment-subject" className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
            <select
                id="assignment-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
            >
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="assignment-due-date" className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
            <input
              id="assignment-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
        </div>
        <div className="flex gap-4 items-end">
            <div className="flex-grow">
                 <label htmlFor="assignment-priority" className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                <select
                  id="assignment-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
            </div>
            <button type="submit" className="bg-sky-500 text-white font-semibold p-2.5 rounded-md hover:bg-sky-400 transition-colors inline-flex items-center justify-center" aria-label="Add Assignment">
              <PlusIcon className="w-5 h-5" />
            </button>
        </div>
      </form>

      <ul className="space-y-3">
        {assignments.map(assignment => (
          <li
            key={assignment.id}
            className={`flex items-center gap-4 p-3 rounded-md transition-colors ${
              assignment.isComplete ? 'bg-gray-900' : 'bg-black/30'
            }`}
          >
            <input
              type="checkbox"
              checked={assignment.isComplete}
              onChange={() => onToggleComplete(assignment.id)}
              className="form-checkbox h-5 w-5 text-sky-500 bg-gray-700 border-gray-600 rounded focus:ring-sky-500"
              aria-labelledby={`assignment-title-${assignment.id}`}
            />
            <div className="flex-grow">
              <p
                id={`assignment-title-${assignment.id}`}
                className={`text-white transition-all ${
                  assignment.isComplete ? 'line-through text-gray-500' : ''
                }`}
              >
                {assignment.title}
              </p>
              <p className={`text-sm transition-all ${
                  assignment.isComplete ? 'line-through text-gray-600' : 'text-gray-400'
                }`}>
                {assignment.subject} • {formatDate(assignment.dueDate)}
              </p>
            </div>
            <div className={`flex-shrink-0 text-xs text-white font-semibold px-2 py-1 rounded-full ${getPriorityColor(assignment.priority)}`}>
              {assignment.priority}
            </div>
            <button
              onClick={() => onDeleteAssignment(assignment.id)}
              className="flex-shrink-0 text-gray-500 hover:text-red-500 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={`Delete assignment: ${assignment.title}`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </li>
        ))}
        {assignments.length === 0 && (
            <p className="text-center text-gray-400 py-4">You have no assignments. Add one above to get started!</p>
        )}
      </ul>
    </div>
  );
};

export default MyAssignments;