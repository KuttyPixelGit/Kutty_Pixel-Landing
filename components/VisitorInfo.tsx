import React, { useState, useEffect } from 'react';
import EyeIcon from './icons/EyeIcon';

interface VisitorInfoProps {
  isDarkMode: boolean;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Initialize or update counts from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastUpdated');
    let storedTodayCount = parseInt(localStorage.getItem('todayCount') || '0');
    let storedWeeklyCount = parseInt(localStorage.getItem('weeklyCount') || '0');
    
    // Base daily increase between 50-60
    const getDailyIncrease = () => 50 + Math.floor(Math.random() * 11);
    // Weekly multiplier between 7-10x
    const getWeeklyMultiplier = () => 7 + Math.floor(Math.random() * 4);

    // Check if it's a new day
    if (storedDate !== today) {
      const isNewWeek = storedDate && (new Date(storedDate).getDay() === 0);
      const dailyIncrease = getDailyIncrease();
      
      // Calculate new counts
      const newTodayCount = storedDate ? dailyIncrease : getDailyIncrease();
      
      // Calculate weekly count to be 7-10x today's count
      const multiplier = getWeeklyMultiplier();
      let newWeeklyCount = newTodayCount * multiplier;
      
      // If not a new week, make sure weekly count is at least 7x today's count
      if (!isNewWeek && storedWeeklyCount > 0) {
        newWeeklyCount = Math.max(storedWeeklyCount, newTodayCount * 7);
      }
      
      // Update state and storage
      setTodayCount(newTodayCount);
      setWeeklyCount(newWeeklyCount);
      localStorage.setItem('todayCount', newTodayCount.toString());
      localStorage.setItem('weeklyCount', newWeeklyCount.toString());
      localStorage.setItem('lastUpdated', today);
    } else {
      // Same day, ensure weekly is at least 7x today's count
      const minWeeklyCount = Math.max(storedWeeklyCount, storedTodayCount * 7);
      setTodayCount(storedTodayCount);
      setWeeklyCount(minWeeklyCount);
      if (minWeeklyCount > storedWeeklyCount) {
        localStorage.setItem('weeklyCount', minWeeklyCount.toString());
      }
    }
    
    setLastUpdated(new Date());

    // Simulate visitor growth over time
    const updateInterval = setInterval(() => {
      setTodayCount(prevToday => {
        const increment = Math.floor(Math.random() * 3) + 1; // 1-3
        const newTodayCount = prevToday + increment;
        localStorage.setItem('todayCount', newTodayCount.toString());
        
        // Update weekly count to be at least 7x today's count
        setWeeklyCount(prevWeekly => {
          const minWeeklyCount = Math.max(prevWeekly, newTodayCount * 7);
          const weeklyIncrement = Math.floor(Math.random() * 3) + 1; // 1-3
          const newWeeklyCount = Math.max(minWeeklyCount, prevWeekly + weeklyIncrement);
          localStorage.setItem('weeklyCount', newWeeklyCount.toString());
          return newWeeklyCount;
        });
        
        return newTodayCount;
      });
      
      // Update the last updated time
      setLastUpdated(new Date());
    }, 15000); // Update every 15 seconds for smoother animation

    // Cleanup interval on component unmount
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const cardClasses = `p-4 rounded-lg backdrop-blur-md border transition-all duration-300 text-white ${
    isDarkMode
      ? "bg-black/50 border-[#D4AF37]/40 hover:border-[#D4AF37]/70"
      : "bg-black/40 border-white/20 hover:border-white/40"
  }`;

  const buttonClasses = `p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
    isDarkMode
      ? "bg-black/50 border-[#D4AF37]/40 text-white hover:bg-[#D4AF37]/20"
      : "bg-black/40 border-white/30 text-white hover:bg-white/20"
  }`;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-300 ease-in-out">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} ${isOpen ? 'rotate-180' : ''}`}
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          <EyeIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Dropdown Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-end gap-3 mt-3">
          {/* Today's Visitors */}
          <div className={`${cardClasses} w-48`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">{todayCount.toLocaleString()}</span>
                <span className="text-xs text-white/80">Visitors Today</span>
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (todayCount % 1000) / 10 + 20)}%` }}
              ></div>
            </div>
          </div>

          {/* Weekly Visitors */}
          <div className={`${cardClasses} w-48`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">{weeklyCount.toLocaleString()}</span>
                <span className="text-xs text-white/80">This Week</span>
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (weeklyCount % 5000) / 50 + 20)}%` }}
              ></div>
            </div>
          </div>

          {/* Growth Indicator */}
          <div className="text-right">
            <span className="text-xs text-white/60">
              {lastUpdated && `Updated: ${lastUpdated.toLocaleTimeString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInfo;