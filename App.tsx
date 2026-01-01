import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import EffectsBackground from './components/EffectsBackground';
import LoadingScreen from './components/LoadingScreen';
import GlobalStyles from './components/GlobalStyles';
import { useComingSoon } from './hooks/useComingSoon';
import VisitorInfo from './components/VisitorInfo';
import { Analytics } from '@vercel/analytics/react';

// Lazy load the VideoIntro component
const VideoIntro = lazy(() => import('./components/VideoIntro'));

const App: React.FC = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Always use dark mode
  const isDarkMode = true;

  // Handle video end
  const handleVideoEnd = () => {
    setShowVideo(false);
    // Show loading for a brief moment before showing content
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 1000);
  };

  // Skip video if it takes too long to load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showVideo) {
        console.log('Skipping video due to timeout');
        handleVideoEnd();
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [showVideo]);

  // Handle skip video
  const skipVideo = () => {
    setShowVideo(false);
    setShowContent(true);
    setIsLoading(false);
  };

  // Handle key press for skipping video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipVideo();
      }
    };

    if (showVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVideo]);

  return (
    <>
      <GlobalStyles isDarkMode={isDarkMode} />
      <Analytics />
      <EffectsBackground isDarkMode={isDarkMode} />
      
      {showVideo && (
        <Suspense fallback={
          <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="w-16 h-16 border-4 border-t-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <VideoIntro 
            onVideoEnd={handleVideoEnd} 
            isDarkMode={isDarkMode} 
          />
        </Suspense>
      )}

      {!showVideo && (
        <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <Header isDarkMode={isDarkMode} />
          <main>
            <MainContent isDarkMode={isDarkMode} showContent={showContent} />
            <Footer isDarkMode={isDarkMode} />
          </main>
          <VisitorInfo isDarkMode={isDarkMode} />
        </div>
      )}
    </>
  );
};

export default App;