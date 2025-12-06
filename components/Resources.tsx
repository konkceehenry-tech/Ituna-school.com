
import React, { useState, useMemo, useEffect } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';
import ConfirmationDialog from './ConfirmationDialog';
import { SortAscIcon } from './icons/SortAscIcon';
import { SortDescIcon } from './icons/SortDescIcon';
import { PdfIcon } from './icons/PdfIcon';
import { DocIcon } from './icons/DocIcon';
import { XlsIcon } from './icons/XlsIcon';
import { PptIcon } from './icons/PptIcon';
import { FileIcon } from './icons/FileIcon';
import { getResources, deleteResource } from '../services/database';
import { Resource } from '../types';

type ActionToConfirm = 
    | { type: 'delete'; resource: Resource }
    | { type: 'upload' }
    | null;

type SortableColumn = 'fileName' | 'subject' | 'uploader' | 'date';

const Resources: React.FC = () => {
    const [allResources, setAllResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState<ActionToConfirm>(null);
    const [sortConfig, setSortConfig] = useState<{ key: SortableColumn; direction: 'ascending' | 'descending' }>({
        key: 'date',
        direction: 'descending',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAllResources(getResources());
            setIsLoading(false);
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const displayedResources = useMemo(() => {
        let filteredItems = [...allResources];

        // Filtering
        const lowercasedTerm = searchTerm.toLowerCase();
        if (lowercasedTerm) {
             filteredItems = filteredItems.filter(resource => 
                resource.fileName.toLowerCase().includes(lowercasedTerm) ||
                resource.subject.toLowerCase().includes(lowercasedTerm) ||
                resource.uploader.toLowerCase().includes(lowercasedTerm)
            );
        }

        // Sorting
        if (sortConfig.key) {
            filteredItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                let comparison = 0;
                if (sortConfig.key === 'date') {
                    // Ascending: Oldest to Newest
                    comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
                } else {
                    // Ascending: A to Z
                    comparison = aValue.localeCompare(bValue);
                }

                if (sortConfig.direction === 'descending') {
                    return comparison * -1;
                }
                return comparison;
            });
        }
        
        return filteredItems;
    }, [allResources, searchTerm, sortConfig]);
    
    const handleSort = (key: SortableColumn) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleDeleteClick = (resource: Resource) => {
        setActionToConfirm({ type: 'delete', resource });
        setIsDialogOpen(true);
    };

    const handleUploadClick = () => {
        setActionToConfirm({ type: 'upload' });
        setIsDialogOpen(true);
    };
    
    const handleConfirm = () => {
        if (!actionToConfirm) return;

        if (actionToConfirm.type === 'delete') {
            deleteResource(actionToConfirm.resource.id);
            setAllResources(getResources()); // Re-fetch from DB
            alert(`Deleted ${actionToConfirm.resource.fileName}`);
        } else if (actionToConfirm.type === 'upload') {
            alert('Upload functionality coming soon!');
        }
        
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setActionToConfirm(null);
    };

    const getDialogContent = () => {
        if (!actionToConfirm) return { title: '', message: ''};
        switch (actionToConfirm.type) {
            case 'delete':
                return {
                    title: 'Confirm Deletion',
                    message: `Are you sure you want to delete "${actionToConfirm.resource.fileName}"? This action cannot be undone.`
                };
            case 'upload':
                 return {
                    title: 'Confirm Upload',
                    message: 'You are about to start the upload process. Do you want to continue?'
                };
            default:
                return { title: '', message: ''};
        }
    };
    
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <PdfIcon />;
            case 'doc':
                return <DocIcon />;
            case 'xls':
                return <XlsIcon />;
            case 'ppt':
                return <PptIcon />;
            default:
                return <FileIcon />;
        }
    };
    
    const tableHeaders: { key: SortableColumn; label: string }[] = [
        { key: 'fileName', label: 'File Name' },
        { key: 'subject', label: 'Subject' },
        { key: 'uploader', label: 'Uploaded By' },
        { key: 'date', label: 'Date' }
    ];

    const SkeletonRow: React.FC = () => (
        <tr className="bg-gray-900">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-800 rounded w-40 animate-pulse"></div>
                </div>
            </td>
            <td className="p-4"><div className="h-5 bg-gray-800 rounded w-24 animate-pulse"></div></td>
            <td className="p-4"><div className="h-5 bg-gray-800 rounded w-32 animate-pulse"></div></td>
            <td className="p-4"><div className="h-5 bg-gray-800 rounded w-20 animate-pulse"></div></td>
            <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse"></div>
                </div>
            </td>
        </tr>
    );


    return (
        <section className="bg-black py-20 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Library</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        Learning Resources
                    </h2>
                    <p className="text-gray-300 mt-4">
                        Find and download course materials, assignments, and study guides.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <fieldset disabled={isLoading} className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                        <div className="relative w-full md:w-auto">
                           <label htmlFor="search-resources" className="sr-only">Search resources</label>
                            <input
                                id="search-resources"
                                type="text"
                                placeholder="Search by name, subject, or teacher..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full md:w-80 bg-gray-900 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
                            />
                        </div>
                        <button 
                          onClick={handleUploadClick}
                          className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-black inline-flex items-center w-full md:w-auto justify-center disabled:opacity-50"
                        >
                            <UploadIcon className="w-5 h-5 mr-2" />
                            Upload Document
                        </button>
                    </fieldset>

                    <div className="bg-gray-900 rounded-lg overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black">
                                <tr>
                                    {tableHeaders.map(({ key, label }) => (
                                        <th key={key} className="p-4 font-semibold">
                                            <button onClick={() => handleSort(key)} className="flex items-center space-x-2 hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-black">
                                                <span>{label}</span>
                                                {sortConfig.key === key && (
                                                    sortConfig.direction === 'ascending' 
                                                        ? <SortAscIcon className="w-4 h-4" /> 
                                                        : <SortDescIcon className="w-4 h-4" />
                                                )}
                                            </button>
                                        </th>
                                    ))}
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={`skeleton-row-${index}`} />)
                                ) : displayedResources.length > 0 ? (
                                    displayedResources.map((resource, index) => (
                                        <tr key={resource.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-black'} hover:bg-gray-800`}>
                                            <td className="p-4 text-white">
                                                <div className="flex items-center gap-3">
                                                    {getFileIcon(resource.type)}
                                                    <span>{resource.fileName}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">{resource.subject}</td>
                                            <td className="p-4">{resource.uploader}</td>
                                            <td className="p-4">{resource.date}</td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => alert(`Downloading ${resource.fileName}`)} className="text-sky-400 hover:text-sky-300 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 inline-block" aria-label={`Download ${resource.fileName}`}>
                                                    <DownloadIcon className="w-6 h-6" />
                                                </button>
                                                <button onClick={() => handleDeleteClick(resource)} className="text-red-500 hover:text-red-400 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 inline-block ml-2" aria-label={`Delete ${resource.fileName}`}>
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                     <tr>
                                        <td colSpan={5} className="text-center text-gray-400 p-8">
                                            No resources found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmationDialog 
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
                title={getDialogContent().title}
                message={getDialogContent().message}
            />
        </section>
    );
};

export default Resources;