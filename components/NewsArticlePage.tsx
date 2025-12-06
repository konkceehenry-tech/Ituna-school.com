
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getArticleById, getArticles } from '../services/database';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { GoogleGenAI } from "@google/genai";
import { CurrentUser, Article } from '../types';

interface NewsArticlePageProps {
  articleId: string;
  onSearchToggle: () => void;
  currentUser: CurrentUser | null;
  onLogout: () => void;
}

const RelatedArticleCard: React.FC<{ article: Article }> = ({ article }) => (
    <a href={`/#news/${article.id}`} className="bg-gray-900 rounded-lg overflow-hidden flex flex-col group transition-transform transform hover:-translate-y-2 duration-300 shadow-lg hover:shadow-sky-500/20">
        <img src={article.image || `https://picsum.photos/seed/${article.id}/400/300`} alt={article.title} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{article.title}</h4>
            <p className="text-sm text-gray-400 flex-grow">{article.excerpt.substring(0, 80)}...</p>
            <div className="text-sm text-sky-400 font-semibold inline-flex items-center mt-3 self-start">
                Read More
                <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    </a>
);


const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ articleId, onSearchToggle, currentUser, onLogout }) => {
  const [article, setArticle] = useState<Article | null | undefined>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);

  useEffect(() => {
    // This effect handles fetching the main article, related articles, and generating an image
    // whenever the articleId from the URL changes.
    const currentArticle = getArticleById(parseInt(articleId));
    setArticle(currentArticle);

    // Reset states for the new article
    setGeneratedImageUrl(null);
    setRelatedArticles([]);
    setIsGeneratingImage(false);

    if (currentArticle) {
      // Find related articles by subject
      const allArticles = getArticles();
      const related = allArticles
        .filter(a => a.id !== currentArticle.id && a.subject === currentArticle.subject)
        .slice(0, 3);
      setRelatedArticles(related);

      // Generate an image if one doesn't exist
      if (!currentArticle.image) {
        const generateImage = async () => {
          setIsGeneratingImage(true);
          try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
              model: 'imagen-4.0-generate-001',
              prompt: `A high-quality, professional news article header image related to the title: "${currentArticle.title}". The image should be visually appealing and suitable for a school news portal. Do not include any text in the image.`,
              config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
              },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
              const base64ImageBytes = response.generatedImages[0].image.imageBytes;
              const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
              setGeneratedImageUrl(imageUrl);
            } else {
               setGeneratedImageUrl('https://picsum.photos/seed/placeholder/1200/675');
            }
          } catch (error) {
            console.error('Error generating image:', error);
            setGeneratedImageUrl('https://picsum.photos/seed/placeholder/1200/675');
          } finally {
            setIsGeneratingImage(false);
          }
        };

        generateImage();
      }
    }
  }, [articleId]);

  if (!article) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
        <main className="flex-grow container mx-auto px-6 py-32 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-300">The article you are looking for does not exist.</p>
          <a href="#news-section" className="mt-8 inline-flex items-center text-sky-400 font-semibold group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black">
            <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to News
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans">
      <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8">
            <a href="#news-section" className="inline-flex items-center text-sky-400 font-semibold group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-300 focus-visible:ring-offset-black">
              <ArrowLeftIcon className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to News
            </a>
          </div>
          <article>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
            <div className="flex items-center text-gray-400 mb-6">
              <p>By {article.author}</p>
              <span className="mx-2">•</span>
              <p>{article.date}</p>
            </div>
            
            {isGeneratingImage ? (
                <div className="w-full h-auto max-h-96 aspect-video bg-gray-800 animate-pulse rounded-lg shadow-2xl mb-8"></div>
            ) : (
                (article.image || generatedImageUrl) && (
                    <img 
                        src={article.image || generatedImageUrl!} 
                        alt={article.title} 
                        className="w-full h-auto max-h-96 object-cover rounded-lg shadow-2xl mb-8" 
                    />
                )
            )}

            <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </article>
           
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map(related => (
                  <RelatedArticleCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsArticlePage;
