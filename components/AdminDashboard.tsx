
import React, { useState } from 'react';
import { Logo } from './icons/Logo';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import StudentListing from './StudentListing';


const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('statistics');

    const menuItems = [
        { id: 'statistics', label: 'Statistics', icon: <ChartBarIcon className="w-6 h-6" /> },
        { id: 'users', label: 'Student Management', icon: <UserGroupIcon className="w-6 h-6" /> },
        { id: 'content', label: 'Content Moderation', icon: <ShieldCheckIcon className="w-6 h-6" /> },
        { id: 'resources', label: 'Manage Resources', icon: <DocumentTextIcon className="w-6 h-6" /> },
        { id: 'news', label: 'Manage News', icon: <NewspaperIcon className="w-6 h-6" /> },
    ];
    
    const renderContent = () => {
        switch (activeView) {
            case 'statistics':
                return <div><h2 className="text-2xl font-bold">Statistics</h2><p>Charts and school performance data will be displayed here.</p></div>;
            case 'users':
                return <StudentListing />;
            case 'content':
                return <div><h2 className="text-2xl font-bold">Content Moderation</h2><p>Tools for moderating user-generated content, comments, and feedback will be here.</p></div>;
            case 'resources':
                return <div><h2 className="text-2xl font-bold">Manage Resources</h2><p>A dashboard to upload, edit, and delete learning resources will be here.</p></div>;
            case 'news':
                 return <div><h2 className="text-2xl font-bold">Manage News</h2><p>A dashboard to create, edit, and publish news articles will be here.</p></div>;
            default:
                return <div><h2 className="text-2xl font-bold">Dashboard</h2></div>;
        }
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen flex">
            <aside className="w-64 bg-gray-900 p-6 flex flex-col">
                <div className="mb-8">
                   <a href="#"><Logo /></a>
                </div>
                <nav className="flex-grow">
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.id}>
                                <button 
                                    onClick={() => setActiveView(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left transition-colors ${activeView === item.id ? 'bg-sky-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <a href="#" className="w-full text-center block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </a>
                </div>
            </aside>
            <main className="flex-1 p-10">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                </header>
                <div className="bg-gray-900 p-8 rounded-lg">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;