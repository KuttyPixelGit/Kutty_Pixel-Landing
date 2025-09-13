import { useState, useEffect } from "react";
import useSound from './useSound';

export function useComingSoon() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Initialize sound hook
  const ambientSoundUrl = 'https://cdn.pixabay.com/audio/2022/10/24/audio_365925204b.mp3';
  useSound(ambientSoundUrl, isSoundEnabled);

  useEffect(() => {
    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    // Loading sequence timers
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 400); // Short delay for content fade-in
    }, 2800); // Corresponds to loading animation duration

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  // Effect to update class and localStorage when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);


  return {
    isDarkMode,
    setIsDarkMode,
    isSoundEnabled,
    setIsSoundEnabled,
    isLoading,
    showContent,
  };
}
