
import React, { useState, useEffect, useRef } from 'react';
import { getArticles, getResources, getTeachers, getStudents } from '../services/database';
import { Article, Resource, Teacher, Student } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

interface SearchOverlayProps {
    onClose: () => void;
}

const allResources = getResources();
const resourceSubjects = ['all', ...Array.from(new Set(allResources.map(r => r.subject)))];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newsStartDate, setNewsStartDate] = useState('');
    const [newsEndDate, setNewsEndDate] = useState('');
    const [resourceSubject, setResourceSubject] = useState('all');
    const [results, setResults] = useState<{ news: Article[]; resources: Resource[]; teachers: Teacher[]; students: Student[] }>({ news: [], resources: [], teachers: [], students: [] });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        const hasSearchTerm = searchTerm.trim().length >= 2;
        const hasFilters = newsStartDate !== '' || newsEndDate !== '' || resourceSubject !== 'all';

        if (!hasSearchTerm && !hasFilters) {
            setResults({ news: [], resources: [], teachers: [], students: [] });
            return;
        }

        const lowercasedTerm = searchTerm.toLowerCase();

        const allArticles = getArticles();
        const allResourcesData = getResources();
        const allTeachers = getTeachers();
        const allStudents = getStudents();

        const filteredNews = allArticles.filter(
            article => {
                const searchMatch = hasSearchTerm ? (
                    article.title.toLowerCase().includes(lowercasedTerm) ||
                    article.excerpt.toLowerCase().includes(lowercasedTerm) ||
                    article.subject.toLowerCase().includes(lowercasedTerm)
                ) : true;

                const articleDate = new Date(article.date);
                const endDate = newsEndDate ? new Date(newsEndDate) : null;
                if (endDate) endDate.setDate(endDate.getDate() + 1);

                const startMatch = newsStartDate ? articleDate >= new Date(newsStartDate) : true;
                const endMatch = newsEndDate && endDate ? articleDate < endDate : true;

                return searchMatch && startMatch && endMatch;
            }
        );

        const filteredResources = allResourcesData.filter(
            resource => {
                const searchMatch = hasSearchTerm ? (
                    resource.fileName.toLowerCase().includes(lowercasedTerm) ||
                    resource.subject.toLowerCase().includes(lowercasedTerm) ||
                    resource.uploader.toLowerCase().includes(lowercasedTerm)
                ) : true;
                
                const subjectMatch = resourceSubject === 'all' ? true : resource.subject === resourceSubject;

                return searchMatch && subjectMatch;
            }
        );
        
        const filteredTeachers = hasSearchTerm ? allTeachers.filter(
            teacher =>
                teacher.name.toLowerCase().includes(lowercasedTerm)
        ) : [];

        const filteredStudents = hasSearchTerm ? allStudents.filter(
            student =>
                student.name.toLowerCase().includes(lowercasedTerm)
        ) : [];

        setResults({ news: filteredNews, resources: filteredResources, teachers: filteredTeachers, students: filteredStudents });
    }, [searchTerm, newsStartDate, newsEndDate, resourceSubject]);
    
    const handleClearFilters = () => {
        setNewsStartDate('');
        setNewsEndDate('');
        setResourceSubject('all');
    };

    const handleResultClick = (id: string | null, url?: string) => {
        onClose();
        setTimeout(() => {
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            if (url) {
                // Allow time for scroll to be noticeable before navigating if we also scrolled
                const navDelay = id ? 800 : 0;
                setTimeout(() => {
                    window.location.hash = url;
                }, navDelay);
            }
        }, 150); // Delay for overlay close animation
    };

    const highlightMatch = (text: string, highlight: string): React.ReactNode => {
        if (!highlight.trim()) {
            return text;
        }
        // Escape special characters for use in RegExp
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedHighlight})`, 'gi');
        
        const parts = text.split(regex);
        
        return (
            <span>
                {parts.map((part, i) =>
                    // Delimiters (the matched parts) are at odd indices
                    i % 2 === 1 ? (
                        <strong key={i} className="text-sky-400 font-bold">
                            {part}
                        </strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };
    
    const hasActiveSearch = searchTerm.trim().length >= 2 || newsStartDate || newsEndDate || resourceSubject !== 'all';
    const noResultsFound = hasActiveSearch && results.news.length === 0 && results.resources.length === 0 && results.teachers.length === 0 && results.students.length === 0;


    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-start pt-12 md:pt-20" 
            role="dialog" 
            aria-modal="true"
        >
            <div className="relative bg-gray-900 rounded-lg w-full max-w-2xl mx-4">
                <div className="p-4 md:p-6">
                    <div className="flex items-center">
                        <input
                            ref={inputRef}
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search news, resources, people..."
                            className="w-full bg-gray-800 text-white text-lg px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            aria-label="Search site content"
                        />
                        <button 
                            onClick={onClose} 
                            className="ml-4 p-2 text-gray-400 hover:text-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                            aria-label="Close search"
                        >
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase">Filter News by Date</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <input type="date" aria-label="Start date" value={newsStartDate} onChange={e => setNewsStartDate(e.target.value)} className="w-full bg-gray-700 text-white px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-500" />
                                    <span className="text-gray-400">to</span>
                                    <input type="date" aria-label="End date" value={newsEndDate} onChange={e => setNewsEndDate(e.target.value)} className="w-full bg-gray-700 text-white px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-500" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="resource-subject-filter" className="text-xs font-bold text-gray-400 uppercase">Filter Resources by Subject</label>
                                <select id="resource-subject-filter" value={resourceSubject} onChange={e => setResourceSubject(e.target.value)} className="w-full bg-gray-700 text-white px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 mt-1">
                                    {resourceSubjects.map(subject => <option key={subject} value={subject}>{subject === 'all' ? 'All Subjects' : subject}</option>)}
                                </select>
                            </div>
                        </div>
                        <button onClick={handleClearFilters} className="text-xs text-sky-400 hover:underline mt-3 focus:outline-none focus-visible:ring-1 rounded focus-visible:ring-sky-400">
                           Clear Filters
                        </button>
                    </div>


                    <div className="mt-4 max-h-[55vh] overflow-y-auto">
                        {noResultsFound && (
                            <p className="text-center text-gray-400 py-4">No results found for your criteria.</p>
                        )}
                        
                        {results.news.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 flex items-center"><NewspaperIcon className="w-5 h-5 mr-2" /> News</h3>
                                <ul>
                                    {results.news.map(article => (
                                        <li key={`news-${article.id}`}>
                                            <a href={`/#news/${article.id}`} onClick={(e) => { e.preventDefault(); handleResultClick('news-section', `#/news/${article.id}`); }} className="block w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                                                <p className="font-semibold text-white">{highlightMatch(article.title, searchTerm)}</p>
                                                <p className="text-sm text-gray-300 truncate">{highlightMatch(article.excerpt, searchTerm)}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {results.resources.length > 0 && (
                             <div className="mb-6">
                                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 flex items-center"><DocumentTextIcon className="w-5 h-5 mr-2" /> Resources</h3>
                                <ul>
                                    {results.resources.map(resource => (
                                        <li key={`resource-${resource.id}`}>
                                            <button type="button" onClick={() => handleResultClick('resources-section')} className="block w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                                                <p className="font-semibold text-white">{highlightMatch(resource.fileName, searchTerm)}</p>
                                                <p className="text-sm text-gray-300">
                                                    Subject: {highlightMatch(resource.subject, searchTerm)} | Uploaded by: {highlightMatch(resource.uploader, searchTerm)}
                                                </p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {results.teachers.length > 0 && (
                             <div className="mb-6">
                                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 flex items-center"><UserGroupIcon className="w-5 h-5 mr-2" /> Faculty</h3>
                                <ul>
                                    {results.teachers.map(teacher => (
                                        <li key={`teacher-${teacher.id}`}>
                                            <a href={`/#/teachers/${teacher.id}`} onClick={(e) => { e.preventDefault(); handleResultClick('our-team', `#/teachers/${teacher.id}`); }} className="block w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                                                <p className="font-semibold text-white">{highlightMatch(teacher.name, searchTerm)}</p>
                                                <p className="text-sm text-gray-300">{teacher.title}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {results.students.length > 0 && (
                             <div>
                                <h3 className="text-xs uppercase text-gray-400 font-bold mb-3 flex items-center"><UserGroupIcon className="w-5 h-5 mr-2" /> Students</h3>
                                <ul>
                                    {results.students.map(student => (
                                        <li key={`student-${student.id}`}>
                                            <a href={`/#/students/${student.id}`} onClick={(e) => { e.preventDefault(); handleResultClick(null, `#/students/${student.id}`); }} className="block w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                                                <p className="font-semibold text-white">{highlightMatch(student.name, searchTerm)}</p>
                                                <p className="text-sm text-gray-300">Grade {student.grade}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;