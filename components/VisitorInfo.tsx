import React, { useState, useEffect } from 'react';
import EyeIcon from './icons/EyeIcon';

const locations = [
  "Toronto, CA", "New York, US", "London, UK", "Paris, FR", 
  "Tokyo, JP", "Sydney, AU", "Dubai, AE", "Singapore, SG",
  "Berlin, DE", "Mumbai, IN", "Los Angeles, US", "Seoul, KR"
];

interface VisitorInfoProps {
  isDarkMode: boolean;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Initial random values
    setVisitorCount(Math.floor(Math.random() * (250 - 50 + 1) + 50));
    setLocation(locations[Math.floor(Math.random() * locations.length)]);

    // Simulate visitor count fluctuations
    const countInterval = setInterval(() => {
      setVisitorCount(prev => {
        const fluctuation = Math.floor(Math.random() * 5) - 2; // between -2 and +2
        const newCount = prev + fluctuation;
        return newCount > 20 ? newCount : 20; // Ensure it doesn't drop too low
      });
    }, 4000);

    // Simulate location changes
    const locationInterval = setInterval(() => {
      setLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 7000);

    return () => {
      clearInterval(countInterval);
      clearInterval(locationInterval);
    };
  }, []);

  const cardClasses = `p-3 rounded-lg text-xs whitespace-nowrap backdrop-blur-md border ${
    isDarkMode
      ? "bg-black/30 border-[#D4AF37]/30"
      : "bg-white/70 border-[#B8860B]/40"
  }`;

  const buttonClasses = `p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
    isDarkMode
      ? "bg-black/30 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20"
      : "bg-white/70 border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/20"
  }`;

  const boldTextClasses = isDarkMode ? "text-yellow-400" : "text-yellow-700";
  const regularTextClasses = isDarkMode ? "text-gray-300" : "text-gray-600";
  const labelTextClasses = isDarkMode ? "text-gray-400" : "text-gray-500";
  
  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      <div className="relative flex items-center">
        <div className="absolute right-full mr-3 hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100">
           <div className={cardClasses}>
            <p className={`font-bold ${boldTextClasses}`}>
              <span className={labelTextClasses}>LIVE:</span> {visitorCount}
            </p>
            <p className={regularTextClasses}>
               <span className={labelTextClasses}>FROM:</span> {location}
            </p>
           </div>
        </div>
        <div className={buttonClasses}>
          <EyeIcon />
        </div>
      </div>
    </div>
  );
};

export default VisitorInfo;