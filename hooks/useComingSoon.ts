import { useState, useEffect } from "react";

export function useComingSoon() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const isDarkMode = true; // Always use dark mode

  useEffect(() => {
    // Force dark mode on initial load
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    // Loading sequence timers
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 400); // Short delay for content fade-in
    }, 2800); // Corresponds to loading animation duration

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return {
    isDarkMode,
    isLoading,
    showContent,
  };
}
