


import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Features from './components/Features';
import About from './components/About';
import Stats from './components/Stats';
import Testimonial from './components/Testimonial';
import Discover from './components/Discover';
import Newsletter from './components/Newsletter';
import Guidance from './components/Guidance';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import CampusMap from './components/CampusMap';
import Reports from './components/Reports';
import News from './components/News';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import AdminDashboard from './components/AdminDashboard';
import SearchOverlay from './components/SearchOverlay';
import NewsArticlePage from './components/NewsArticlePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Teachers from './components/Teachers';
import TeacherProfilePage from './components/TeacherProfilePage';
import StudentProfilePage from './components/StudentProfilePage';
import Chatbot from './components/Chatbot';
import { initDB } from './services/database';
import { CurrentUser } from './types';

interface LandingPageProps {
  onSearchToggle: () => void;
  currentUser: CurrentUser | null;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSearchToggle, currentUser, onLogout }) => (
  <div>
    <Header onSearchToggle={onSearchToggle} currentUser={currentUser} onLogout={onLogout} />
    <main>
      <Hero currentUser={currentUser} />
      <AnimatedSection>
        <Introduction />
      </AnimatedSection>
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection id="our-team">
        <Teachers />
      </AnimatedSection>
      <AnimatedSection id="campus-map">
        <CampusMap />
      </AnimatedSection>
      <AnimatedSection>
        <Stats />
      </AnimatedSection>
      <AnimatedSection>
        <Reports />
      </AnimatedSection>
      <AnimatedSection id="news-section">
        <News />
      </AnimatedSection>
      <AnimatedSection id="resources-section">
        <Resources />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonial />
      </AnimatedSection>
      <AnimatedSection>
        <Discover />
      </AnimatedSection>
      <AnimatedSection>
        <Newsletter />
      </AnimatedSection>
      <AnimatedSection>
        <Guidance />
      </AnimatedSection>
      <AnimatedSection id="faq">
        <FAQ />
      </AnimatedSection>
    </main>
    <Footer />
  </div>
);


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    // Initialize the database with mock data if it's the first visit
    initDB();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setRoute(newHash);

      // A "page" route is anything that starts with '#/' or is a special route like '#admin'.
      // Simple anchor links (e.g., '#faq') should be handled by the browser's scroll.
      const isPageRouteChange = newHash.startsWith('#/') || ['#admin', '#login', '#signup'].includes(newHash);

      if (isPageRouteChange) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial route
    setRoute(window.location.hash);
    // On initial load, only scroll to top if it's a "page" route
    if (window.location.hash.startsWith('#/') || ['#admin', '#login', '#signup'].includes(window.location.hash)) {
      window.scrollTo(0, 0);
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleLogin = (user: CurrentUser) => {
    setCurrentUser(user);
    if (user.role === 'student') {
        window.location.hash = `#/students/${user.id}`;
    } else {
        window.location.hash = '#';
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#';
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const renderPage = () => {
    if (route.startsWith('#/news/')) {
        const id = route.split('/')[2];
        return <NewsArticlePage articleId={id} onSearchToggle={handleSearchToggle} currentUser={currentUser} onLogout={handleLogout} />;
    }
     if (route.startsWith('#/teachers/')) {
        const id = route.split('/')[2];
        return <TeacherProfilePage teacherId={id} onSearchToggle={handleSearchToggle} currentUser={currentUser} onLogout={handleLogout} />;
    }
    if (route.startsWith('#/students/')) {
        const id = route.split('/')[2];
        return <StudentProfilePage studentId={id} onSearchToggle={handleSearchToggle} currentUser={currentUser} onLogout={handleLogout} />;
    }
    if (route === '#admin') {
      return <AdminDashboard />;
    }
    if (route === '#login') {
      return <Login onLogin={handleLogin} />;
    }
     if (route === '#signup') {
      return <SignUp />;
    }
    return <LandingPage onSearchToggle={handleSearchToggle} currentUser={currentUser} onLogout={handleLogout} />;
  };

  return (
    <>
      {renderPage()}
      {isSearchOpen && <SearchOverlay onClose={handleSearchToggle} />}
      <Chatbot />
    </>
  );
};

export default App;