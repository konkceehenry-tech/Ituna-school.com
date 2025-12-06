
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getStudentById, getArticles, updateStudent } from '../services/database';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { PenIcon } from './icons/PenIcon';
import { CurrentUser, Student } from '../types';
import AcademicProgressChart from './AcademicProgressChart';
import { CameraIcon } from './icons/CameraIcon';
import MyAssignments, { Assignment } from './MyTasks';
import CalendarView from './CalendarView';
import { CalendarIcon } from './icons/CalendarIcon';
import { ListIcon } from './icons/ListIcon';
import QuickActions from './QuickActions';
import { UserIcon } from './icons/UserIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import AITools from './AITools';
import StudentAnalytics from './StudentAnalytics';
import { ChartPieIcon } from './icons/ChartPieIcon';

interface StudentProfilePageProps {
  studentId: string;
  onSearchToggle: () => void;
  currentUser: CurrentUser | null;
  onLogout: () => void;
}

type View = 'dashboard' | 'academics' | 'attendance' | 'reports' | 'schedule' | 'ai-tools' | 'analytics';
type ScheduleView = 'list' | 'calendar';

const StatCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 p-4 rounded-lg text-center md:text-left">
        <p className="text-sm text-gray-400 uppercase tracking-wider">{title}</p>
        {children}
    </div>
);

const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ studentId, onSearchToggle, currentUser, onLogout }) => {
  const [student, setStudent] = useState<Student | null | undefined>(() => getStudentById(parseInt(studentId)));
  
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableStudent, setEditableStudent] = useState<Student | undefined | null>(student);
  const [scheduleView, setScheduleView] = useState<ScheduleView>('list');
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Finish math homework', subject: 'Mathematics', dueDate: '2023-11-10', priority: 'High', isComplete: false },
    { id: 2, title: 'Prepare for science presentation', subject: 'Science', dueDate: '2023-11-15', priority: 'Medium', isComplete: false },
    { id: 3, title: 'Read chapter 4 of English book', subject: 'English', dueDate: '2023-11-12', priority: 'Low', isComplete: true },
  ]);

  useEffect(() => {
    const currentStudent = getStudentById(parseInt(studentId));
    setStudent(currentStudent);
    setEditableStudent(currentStudent);
  }, [studentId]);

  const isOwnProfile = currentUser?.role === 'student' && currentUser.id === parseInt(studentId);

  const navItems = useMemo(() => {
    const items = [
        { id: 'dashboard', label: 'Dashboard', icon: <UserIcon className="w-5 h-5" /> },
        { id: 'academics', label: 'Academics', icon: <BookOpenIcon className="w-5 h-5" /> },
        { id: 'analytics', label: 'Analytics', icon: <ChartPieIcon className="w-5 h-5" /> },
        { id: 'attendance', label: 'Attendance', icon: <ClipboardCheckIcon className="w-5 h-5" /> },
        { id: 'reports', label: 'Reports', icon: <DocumentTextIcon className="w-5 h-5" /> },
    ];
    if (isOwnProfile) {
        items.push({ id: 'schedule', label: 'My Schedule', icon: <CalendarIcon className="w-5 h-5" /> });
        items.push({ id: 'ai-tools', label: 'AI Tools', icon: <SparklesIcon className="w-5 h-5" /> });
    }
    return items;
  }, [isOwnProfile]);

  const announcements = useMemo(() => {
    if (!student) return [];
    const allArticles = getArticles();
    return allArticles.filter(article => 
        article.subject === 'School News' || 
        article.grade === 'all' || 
        article.grade === String(student.grade)
    ).slice(0, 3);
  }, [student]);

  const calendarEvents = useMemo(() => {
    const parseDate = (dateString: string): Date | null => {
        if (!dateString) return null;
        const parts = dateString.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    const officialAssignmentEvents = (student?.upcomingAssignments ?? [])
        .map(a => {
            const date = parseDate(a.dueDate);
            if (!date) return null;
            return { id: `a-${a.assignmentId}`, title: a.title, date, isOfficial: true };
        }).filter((e): e is NonNullable<typeof e> => e !== null);
    
    const userAssignmentEvents = assignments
        .map(a => {
            const date = parseDate(a.dueDate);
            if (!date) return null;
            return { id: `u-${a.id}`, title: a.title, date, isOfficial: false, isComplete: a.isComplete, priority: a.priority };
        }).filter((e): e is NonNullable<typeof e> => e !== null);

    return [...officialAssignmentEvents, ...userAssignmentEvents];
  }, [student?.upcomingAssignments, assignments]);

  const handleImageUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableStudent(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSaveChanges = () => {
    if (!editableStudent) return;
    updateStudent(editableStudent);
    setStudent(editableStudent);
    setIsEditing(false);
  };
  
  const handleCancelChanges = () => {
    setEditableStudent(student);
    setIsEditing(false);
  };

  const handleAddAssignment = (assignment: Omit<Assignment, 'id' | 'isComplete'>) => {
    const newAssignment: Assignment = { ...assignment, id: Date.now(), isComplete: false };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const handleToggleComplete = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, isComplete: !a.isComplete } : a));
  };

  const handleDeleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  if (!student || !editableStudent) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
        <main className="flex-grow container mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Student Not Found</h1>
          <a href={isOwnProfile ? '#' : '#admin'} className="mt-8 inline-flex items-center text-sky-400 font-semibold group">
            <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
            {isOwnProfile ? 'Back to Home' : 'Back to Dashboard'}
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'text-green-400';
      case 'Absent': return 'text-red-400';
      case 'Late': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const renderContent = () => {
    switch (activeView) {
        case 'dashboard':
            return (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard title="Overall Grade">
                            <p className="text-4xl font-bold text-white mt-1">{student.overallGrade}%</p>
                        </StatCard>
                        <StatCard title="Attendance">
                            <p className="text-4xl font-bold text-white mt-1">{student.attendance}%</p>
                        </StatCard>
                    </div>
                    {isOwnProfile && <QuickActions studentName={student.name} />}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Recent Announcements</h3>
                        <div className="space-y-4">
                            {announcements.map(article => (
                                <a href={`/#news/${article.id}`} key={article.id} className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                                    <p className="font-semibold text-white">{article.title}</p>
                                    <p className="text-sm text-gray-400">{article.date} • by {article.author}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'academics':
            return (
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Academics</h2>
                    <div className="mb-8">
                        <AcademicProgressChart academicHistory={student.academicHistory} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Grade History</h3>
                        {(student.academicHistory ?? []).map(term => (
                            <div key={term.term} className="mb-8">
                            <h4 className="text-lg font-bold text-white mb-4">{term.term}</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                <thead className="bg-black/50">
                                    <tr>
                                    <th className="p-3 font-semibold">Subject</th>
                                    <th className="p-3 font-semibold">Teacher</th>
                                    <th className="p-3 font-semibold text-right">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {term.records.map((record, index) => (
                                    <tr key={index} className="border-b border-gray-700 last:border-b-0">
                                        <td className="p-3">{record.subject}</td>
                                        <td className="p-3">{record.teacher}</td>
                                        <td className="p-3 text-right font-semibold">{record.grade}%</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'analytics':
            return <StudentAnalytics student={student} assignments={assignments} />;
        case 'attendance':
            return (
                 <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Attendance Record</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50">
                            <tr>
                                <th className="p-3 font-semibold">Date</th>
                                <th className="p-3 font-semibold">Status</th>
                                <th className="p-3 font-semibold">Notes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(student.attendanceHistory ?? []).map((record, index) => (
                                <tr key={index} className="border-b border-gray-700 last:border-b-0">
                                <td className="p-3">{record.date}</td>
                                <td className={`p-3 font-semibold ${getStatusColor(record.status)}`}>{record.status}</td>
                                <td className="p-3">{record.notes || '—'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        case 'reports':
            return (
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Progress Reports</h2>
                    <div className="space-y-4">
                        {(student.progressReports ?? []).map((report, index) => (
                            <div key={index} className="bg-black/30 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h4 className="font-bold text-white">{report.term} Report</h4>
                                <p className="text-sm text-gray-400 mb-2">Issued on: {report.date}</p>
                                <p className="text-gray-300 italic">"{report.teacherComment}"</p>
                            </div>
                            <a href={report.downloadUrl} className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-sky-400 transition-colors inline-flex items-center mt-3 md:mt-0 md:ml-4 flex-shrink-0">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                Download
                            </a>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'schedule':
            return (
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">My Schedule</h2>
                        <div className="flex items-center bg-black/30 p-1 rounded-full">
                            <button onClick={() => setScheduleView('list')} className={`px-3 py-1 rounded-full text-sm font-semibold ${scheduleView === 'list' ? 'bg-sky-500 text-white' : 'text-gray-300'}`}><ListIcon className="w-5 h-5 inline-block" /></button>
                            <button onClick={() => setScheduleView('calendar')} className={`px-3 py-1 rounded-full text-sm font-semibold ${scheduleView === 'calendar' ? 'bg-sky-500 text-white' : 'text-gray-300'}`}><CalendarIcon className="w-5 h-5 inline-block" /></button>
                        </div>
                    </div>
                    {scheduleView === 'list' ? (
                        <MyAssignments 
                            assignments={assignments}
                            onAddAssignment={handleAddAssignment}
                            onToggleComplete={handleToggleComplete}
                            onDeleteAssignment={handleDeleteAssignment}
                        />
                    ) : (
                        <CalendarView events={calendarEvents} />
                    )}
                </div>
            );
        case 'ai-tools':
            return <AITools />;
        default:
            return null;
    }
  };

  return (
    <div className="bg-black text-white font-sans">
      <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-8">
            <a href={isOwnProfile ? '#' : '#admin'} className="inline-flex items-center text-sky-400 font-semibold group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black">
              <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
              {isOwnProfile ? 'Back to Home' : 'Back to Dashboard'}
            </a>
          </div>

          {/* Profile Header */}
          <div className="bg-gray-900 rounded-lg shadow-2xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative group">
                  <img src={uploadedImage || student.image} alt={student.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg" />
                  {isOwnProfile && (
                    <>
                      <button onClick={handleImageUploadClick} className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Change profile picture">
                        <CameraIcon className="w-8 h-8 text-white" />
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-3 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{editableStudent.name}</h1>
                <p className="text-xl text-sky-400 mt-1">Grade {editableStudent.grade}</p>

                {isEditing ? (
                  <textarea name="bio" value={editableStudent.bio} onChange={handleInputChange} className="w-full bg-gray-800 text-white rounded-md p-2 mt-4 h-24 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                ) : (
                  <p className="text-gray-300 mt-4 max-w-2xl mx-auto md:mx-0">{editableStudent.bio}</p>
                )}
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-4 text-sm">
                    {isEditing ? (
                         <>
                            <input type="email" name="email" value={editableStudent.email} onChange={handleInputChange} className="w-full sm:w-auto bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            <input type="tel" name="phone" value={editableStudent.phone} onChange={handleInputChange} className="w-full sm:w-auto bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        </>
                    ) : (
                        <>
                            <span className="flex items-center justify-center gap-2"><EmailIcon className="w-5 h-5 text-gray-400" /> <a href={`mailto:${editableStudent.email}`} className="hover:text-sky-300">{editableStudent.email}</a></span>
                            <span className="hidden sm:inline text-gray-600">|</span>
                            <span className="flex items-center justify-center gap-2"><PhoneIcon className="w-5 h-5 text-gray-400" /> <a href={`tel:${editableStudent.phone}`} className="hover:text-sky-300">{editableStudent.phone}</a></span>
                        </>
                    )}
                </div>
                {isOwnProfile && (
                     <div className="mt-4 flex gap-2 justify-center md:justify-start">
                        {isEditing ? (
                            <>
                                <button onClick={handleSaveChanges} className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-sky-400">Save</button>
                                <button onClick={handleCancelChanges} className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-600">Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-600 flex items-center gap-2">
                                <PenIcon className="w-4 h-4" /> Edit Profile
                            </button>
                        )}
                    </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:grid md:grid-cols-4 md:gap-8">
            <aside className="hidden md:block md:col-span-1">
                <nav className="sticky top-28 bg-gray-900 rounded-lg p-4">
                    <ul className="space-y-2">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => setActiveView(item.id as View)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors ${activeView === item.id ? 'bg-sky-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                                >
                                    {item.icon}
                                    <span className="font-semibold">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            
            <div className="md:col-span-3">
                <div className="md:hidden mb-6 border-b border-gray-700">
                    <div className="flex space-x-1 overflow-x-auto">
                         {navItems.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveView(item.id as View)}
                                className={`flex-shrink-0 px-4 py-3 font-semibold text-sm transition-colors ${activeView === item.id ? 'border-b-2 border-sky-400 text-sky-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
                {renderContent()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentProfilePage;
