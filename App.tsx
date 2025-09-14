import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import EffectsBackground from './components/EffectsBackground';
import LoadingScreen from './components/LoadingScreen';
import GlobalStyles from './components/GlobalStyles';
import { useComingSoon } from './hooks/useComingSoon';
import VisitorInfo from './components/VisitorInfo';

const App: React.FC = () => {
  const {
    isLoading,
    showContent,
  } = useComingSoon();

  // Always use dark mode
  const isDarkMode = true;

  return (
    <>
      <GlobalStyles isDarkMode={isDarkMode} />
      <EffectsBackground isDarkMode={isDarkMode} />
      
      {isLoading && <LoadingScreen />}

      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Header isDarkMode={isDarkMode} />
        <main>
          <MainContent isDarkMode={isDarkMode} showContent={showContent} />
          <Footer isDarkMode={isDarkMode} />
        </main>
        <VisitorInfo isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default App;