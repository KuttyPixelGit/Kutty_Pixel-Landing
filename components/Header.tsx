import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SoundOnIcon from './icons/SoundOnIcon';
import SoundOffIcon from './icons/SoundOffIcon';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, isSoundEnabled, setIsSoundEnabled }) => {
  const baseClasses = "p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110";
  const darkModeClasses = "bg-black/30 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20";
  const lightModeClasses = "bg-white/70 border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/20";

  return (
    <header className="fixed top-6 right-6 z-50 flex gap-3">
      <button
        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
        aria-label={isSoundEnabled ? "Mute sound" : "Unmute sound"}
        className={`${baseClasses} ${isDarkMode ? darkModeClasses : lightModeClasses}`}
      >
        {isSoundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={`${baseClasses} ${isDarkMode ? darkModeClasses : lightModeClasses}`}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
};

export default Header;