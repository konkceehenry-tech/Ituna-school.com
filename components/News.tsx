
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { getArticles } from '../services/database';
import { Article } from '../types';

const grades = ['all', '9', '10', '11', '12'];
const subjects = ['all', 'Science', 'English', 'Mathematics', 'History', 'Extracurricular', 'School News'];

const News: React.FC = () => {
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [gradeFilter, setGradeFilter] = useState('all');
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAllArticles(getArticles());
            setIsLoading(false);
        }, 500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    const recentArticles = useMemo(() => {
        return [...allArticles]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
    }, [allArticles]);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = allArticles.filter(article => {
            const gradeMatch = gradeFilter === 'all' ? true : (article.grade === gradeFilter || article.grade === 'all');
            const subjectMatch = subjectFilter === 'all' ? true : article.subject === subjectFilter;
            const searchMatch = lowercasedTerm === '' ? true : (
                article.title.toLowerCase().includes(lowercasedTerm) ||
                article.excerpt.toLowerCase().includes(lowercasedTerm)
            );

            return gradeMatch && subjectMatch && searchMatch;
        });
        setFilteredArticles(filtered);
    }, [gradeFilter, subjectFilter, searchTerm, allArticles]);
    
    const handleClearFilters = () => {
        setGradeFilter('all');
        setSubjectFilter('all');
        setSearchTerm('');
    };

    const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
        <div key={article.id} className="bg-black rounded-lg overflow-hidden flex flex-col">
            <img src={article.image || `https://picsum.photos/seed/${article.id}/400/300`} alt={`Image for ${article.title}`} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-400 mb-2">{article.date} • by {article.author}</p>
                <h3 className="text-xl font-bold mb-3 text-white">{article.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{article.excerpt}</p>
                <a href={`/#news/${article.id}`} className="text-sky-400 font-semibold inline-flex items-center group mt-auto">
                    Read More
                    <ArrowRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </div>
    );

    const SkeletonArticleCard: React.FC = () => (
        <div className="bg-black rounded-lg overflow-hidden flex flex-col">
            <div className="w-full h-48 bg-gray-800 animate-pulse"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-5 bg-gray-800 rounded w-1/3 mt-auto animate-pulse"></div>
            </div>
        </div>
    );

    return (
        <section className="bg-gray-900 py-20 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Updates</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        School News & Updates
                    </h2>
                    <p className="text-gray-300 mt-4">
                        Stay informed with the latest articles and stories from our teachers and staff.
                    </p>
                </div>

                <div className="mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center md:text-left">Recent News</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => <SkeletonArticleCard key={`recent-skeleton-${i}`} />)
                        ) : (
                            recentArticles.map(article => (
                                <ArticleCard key={`recent-${article.id}`} article={article} />
                            ))
                        )}
                    </div>
                </div>

                <div className="text-center md:text-left mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">All Articles</h3>
                </div>

                <fieldset disabled={isLoading} className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
                     <div className="relative w-full md:w-auto">
                        <label htmlFor="search-news" className="sr-only">Search articles by keyword</label>
                        <input
                            id="search-news"
                            type="text"
                            placeholder="Search by keyword..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full md:w-72 bg-gray-800 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
                        />
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="grade-filter" className="text-gray-300 font-medium">Grade:</label>
                            <select id="grade-filter" value={gradeFilter} onChange={e => setGradeFilter(e.target.value)} className="bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50">
                                {grades.map(g => <option key={g} value={g}>{g === 'all' ? 'All Grades' : `Grade ${g}`}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="subject-filter" className="text-gray-300 font-medium">Subject:</label>
                            <select id="subject-filter" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="bg-gray-800 border-gray-700 text-white rounded-md p-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50">
                               {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
                            </select>
                        </div>
                        <button onClick={handleClearFilters} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50">Clear Filters</button>
                    </div>
                </fieldset>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonArticleCard key={`all-skeleton-${i}`} />
                        ))}
                    </div>
                ) : filteredArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map(article => (
                           <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 py-8">No articles found matching your criteria.</p>
                )}
            </div>
        </section>
    );
};

export default News;