import React from 'react';
import { ListIcon } from './icons/ListIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface QuickActionsProps {
  studentName: string;
}

const ActionCard: React.FC<{ href: string; icon: React.ReactNode; title: string; description: string }> = ({ href, icon, title, description }) => (
    <a href={href} className="bg-gray-800 p-6 rounded-lg flex flex-col items-start hover:bg-gray-700 hover:scale-105 transition-all duration-300 group">
        <div className="bg-black/30 p-3 rounded-full mb-4 group-hover:bg-sky-500/20">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 flex-grow">{description}</p>
    </a>
);


const QuickActions: React.FC<QuickActionsProps> = ({ studentName }) => {
    
    const actions = [
        {
            href: '#assignments-section',
            icon: <ListIcon className="w-7 h-7 text-sky-400" />,
            title: 'My Assignments',
            description: 'View, add, and manage your personal tasks and official assignments.'
        },
        {
            href: '#academic-progress-section',
            icon: <ChartBarIcon className="w-7 h-7 text-sky-400" />,
            title: 'Academic Progress',
            description: 'Track your term-by-term performance and grade trends.'
        },
        {
            href: '#our-team',
            icon: <UserGroupIcon className="w-7 h-7 text-sky-400" />,
            title: 'Contact Teachers',
            description: 'Find contact information and profiles for all your teachers.'
        },
        {
            href: '#resources-section',
            icon: <BookOpenIcon className="w-7 h-7 text-sky-400" />,
            title: 'Learning Resources',
            description: 'Access study guides, documents, and materials for your classes.'
        }
    ];

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold text-white mb-4">What would you like to do today?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {actions.map(action => (
                    <ActionCard 
                        key={action.title}
                        href={action.href}
                        icon={action.icon}
                        title={action.title}
                        description={action.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
