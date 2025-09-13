import React, { useState, useEffect } from 'react';
import EyeIcon from './icons/EyeIcon';

interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  timezone: string;
  utc_offset: string;
  languages: string;
  org: string;
}

interface VisitorInfoProps {
  isDarkMode: boolean;
}

const VisitorInfo: React.FC<VisitorInfoProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentLocations, setRecentLocations] = useState<string[]>([]);

  // Function to format location string
  const formatLocation = (data: VisitorData) => {
    return `${data.city || 'Unknown'}, ${data.country_code || 'XX'}`;
  };

  // Function to get visitor's IP and location
  const fetchVisitorData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://ipapi.co/json/');
      const data: VisitorData = await response.json();
      
      if (data) {
        setVisitorData(data);
        
        // Add to recent locations if not already present
        const locationStr = formatLocation(data);
        setRecentLocations(prev => {
          const updated = [...new Set([locationStr, ...prev])];
          return updated.slice(0, 5); // Keep only 5 most recent unique locations
        });
        
        // Simulate increasing visitor count (in a real app, this would come from your analytics)
        setVisitorCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching visitor data:', error);
      // Fallback to random data if API fails
      setVisitorCount(prev => prev + 1);
      setRecentLocations(prev => {
        const fallbackLocations = [
          'New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Dubai, AE'
        ];
        return [...new Set([...fallbackLocations, ...prev])].slice(0, 5);
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchVisitorData();

    // Update visitor count periodically (simulating real-time updates)
    const countInterval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // Update every 30 seconds

    // Simulate new visitors from different locations
    const locationInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to add a new location
        setRecentLocations(prev => {
          const newLoc = `${['New', 'San', 'Los', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 6)]} ${['York', 'Francisco', 'Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 6)]}, ${['US', 'UK', 'CA', 'AU', 'JP', 'DE'][Math.floor(Math.random() * 6)]}`;
          return [...new Set([newLoc, ...prev])].slice(0, 5);
        });
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(countInterval);
      clearInterval(locationInterval);
    };
  }, []);


  const cardClasses = `p-3 rounded-lg text-xs whitespace-nowrap backdrop-blur-md border transition-all duration-300 ${
    isDarkMode
      ? "bg-black/30 border-[#D4AF37]/30 hover:border-[#D4AF37]/60"
      : "bg-white/70 border-[#B8860B]/40 hover:border-[#B8860B]/70"
  }`;

  const buttonClasses = `p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
    isDarkMode
      ? "bg-black/30 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20"
      : "bg-white/70 border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/20"
  }`;

  const labelTextClasses = isDarkMode ? "text-gray-400" : "text-gray-500";
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-300 ease-in-out">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? 'bg-black/30 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20'
            : 'bg-white/70 border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/20'
        } ${isOpen ? 'rotate-180' : ''}`}
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <EyeIcon className="w-5 h-5" />
        </div>
      </button>

      {/* Dropdown Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-end gap-2 mt-2">
          {/* Visitor Count */}
          <div className={`${cardClasses} flex items-center gap-2`}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold">{visitorCount.toLocaleString()}</span>
                <span className="text-[10px] px-1 py-0.5 rounded-full bg-green-500/10 text-green-400">+{Math.floor(visitorCount * 0.1)} today</span>
              </div>
              <span className="text-[10px] text-gray-400">Total Visitors</span>
            </div>
          </div>

          {/* Current Location */}
          {!isLoading && visitorData && (
            <div className={`${cardClasses} flex items-center gap-2`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span>Live from</span>
                  <span className="font-medium">
                    {visitorData.city || 'Unknown'}, {visitorData.country_code || 'XX'}
                  </span>
                  <span className="text-[10px] px-1 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                    {visitorData.timezone?.split('/').pop()?.replace('_', ' ') || 'UTC'}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">
                  {visitorData.org || 'Network'} • {visitorData.ip || 'IP Hidden'}
                </span>
              </div>
            </div>
          )}

          {/* Recent Visitors */}
          {recentLocations.length > 0 && (
            <div className={`${cardClasses} w-64`}>
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <span className="text-[10px]">RECENT VISITORS</span>
                <div className="flex-1 h-px bg-gray-400/20"></div>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {recentLocations.map((loc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-green-400' : 'bg-gray-400/50'}`}></div>
                    <span className="truncate">{loc}</span>
                    {i === 0 && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 flex-shrink-0">Now</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorInfo;