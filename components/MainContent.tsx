import React, { useRef, useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

// Countdown Timer Component - Compact Design
const CountdownTimer = ({ targetDate, isDarkMode }: { targetDate: Date, isDarkMode: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeItems = [
    { value: timeLeft.days, label: 'd' },
    { value: timeLeft.hours, label: 'h' },
    { value: timeLeft.minutes, label: 'm' },
    { value: timeLeft.seconds, label: 's' },
  ];

  return (
    <div className={`mb-8 w-full max-w-2xl mx-auto group ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className="flex items-center justify-center gap-1 mb-8">
        <span className="text-sm font-medium tracking-wider text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">LAUNCHING IN</span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {timeItems.map((item, index) => (
          <div key={item.label} className="flex items-center">
            <div 
              className="relative flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-24"
              style={{
                perspective: '1000px',
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Holographic Display */}
              <div 
                className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)' 
                    : 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 255, 255, 0.3) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.25)',
                  borderRadius: '8px',
                  boxShadow: isDarkMode 
                    ? '0 0 20px rgba(255, 215, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.3)' 
                    : '0 0 15px rgba(255, 215, 0, 0.15)',
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px) rotateX(5deg)',
                  animation: 'hologramPulse 6s ease-in-out infinite',
                }}
              >
                {/* Holographic Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.4) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
                    animation: 'gridPulse 8s ease-in-out infinite',
                  }}
                />
                
                {/* Holographic Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3), transparent 70%)',
                    filter: 'blur(8px)',
                    animation: 'hologramGlow 4s ease-in-out infinite',
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                
                {/* Digital Number Display */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
                  <div className="relative">
                    <span 
                      className={`text-3xl sm:text-4xl font-mono font-bold ${isDarkMode ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}
                      style={{
                        textShadow: isDarkMode 
                          ? '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 184, 28, 0.6)' 
                          : '0 0 5px rgba(212, 175, 0, 0.8)',
                        position: 'relative',
                        zIndex: 2,
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '0.1em',
                        animation: 'digitalFlicker 3s ease-in-out infinite',
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    {/* Scanline Effect */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%)',
                        animation: 'scanline 3s linear infinite',
                        pointerEvents: 'none',
                        zIndex: 3
                      }}
                    />
                  </div>
                  
                  <span 
                    className={`text-[10px] sm:text-xs font-medium mt-1 tracking-wider ${isDarkMode ? 'text-[#FFE44D]' : 'text-[#B8860B]'}`}
                    style={{
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      textShadow: isDarkMode ? '0 0 8px rgba(255, 215, 0, 0.7)' : '0 0 3px rgba(184, 134, 11, 0.5)',
                      opacity: 0.9,
                      position: 'relative',
                      zIndex: 2,
                      fontVariant: 'small-caps'
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                
                {/* Holographic Edge Glow */}
                <div 
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(255, 215, 0, 0.4)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    animation: 'edgePulse 4s ease-in-out infinite',
                    zIndex: 1
                  }}
                />
                
                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '2px',
                      height: '2px',
                      background: 'rgba(255, 215, 0, 0.7)',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0,
                      animation: `particleFloat 6s ease-in-out infinite ${Math.random() * 3}s`,
                      filter: 'blur(0.5px)',
                      boxShadow: '0 0 8px 2px rgba(255, 215, 0, 0.8)'
                    }}
                  />
                ))}
              </div>
              
              {/* Colons between time units */}
              {index < timeItems.length - 1 && (
                <div 
                  className={`absolute -right-2 sm:-right-3 text-2xl font-bold text-[#FFD700]`}
                  style={{
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                    marginTop: '-0.5rem',
                    filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.9))',
                    zIndex: 10,
                    animation: 'colonPulse 2s ease-in-out infinite',
                    textStroke: '1px rgba(255, 215, 0, 0.7)',
                    WebkitTextStroke: '1px rgba(255, 215, 0, 0.7)'
                  }}
                >
                  :
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface HeroSectionProps {
  isDarkMode: boolean;
  showContent: boolean;
}

const MainContent: React.FC<HeroSectionProps> = ({ isDarkMode, showContent }) => {
  const fullHeadline = "SOMETHING PIXEL-PERFECT IS COMING...";
  const { typewriterText } = useTypewriter(fullHeadline, showContent);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 3;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dx, y: dy });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="mb-16" style={{ animation: showContent ? "zoomFlip .7s cubic-bezier(.2,.7,.2,1) both" : "", transformStyle: 'preserve-3d' }}>
        <div className="relative inline-block">
          <div className="absolute" style={{ right: '-80px', top: '-50px', width: 5, height: 5, borderRadius: '9999px', background: 'radial-gradient(circle, #ffffff 0%, #FFE680 30%, #FFD700 60%, rgba(255,215,0,0) 70%)', boxShadow: '0 0 12px rgba(255,215,0,0.95), 0 0 20px rgba(212,175,55,0.55)', transform: 'translate(0,0)', animation: showContent ? 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate' : 'none', filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85))', pointerEvents: 'none' }} />
          <img src="/logo.png" alt="Kutty Pixel Inc." className="h-24 md:h-36 lg:h-48 w-auto mx-auto" style={{ filter: 'none', borderRadius: 16, transform: `perspective(900px) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 8}deg) translateZ(6px)`, animation: `${showContent ? 'heroGlowOn .35s ease-out .65s forwards, logoGlowPulse 4s ease-in-out 1.05s infinite alternate' : 'none'}` }} />
        </div>
      </div>
      <div className="text-center mb-12 w-full max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black leading-tight mb-4 font-mono text-center" style={{ color: "#D4AF37", textShadow: isDarkMode ? "0 1px 0 #B89422, 0 2px 0 #A17E1E, 0 3px 2px rgba(0,0,0,0.35), 0 0 14px rgba(212,175,55,0.25)" : "0 1px 0 #A77C13, 0 2px 0 #916D10, 0 3px 2px rgba(0,0,0,0.15), 0 0 8px rgba(184,134,11,0.15)", transform: `perspective(900px) rotateX(${tilt.y * -3}deg) rotateY(${tilt.x * 4}deg)`, letterSpacing: "0.02em", lineHeight: "1.2", wordSpacing: "0.1em" }}>
          {typewriterText === fullHeadline ? fullHeadline.slice(0, -3) : typewriterText}
          {typewriterText === fullHeadline && (<>..<span style={{ color: isDarkMode ? "#D4AF37" : "#B8860B", animation: "dotsBlink 1s steps(1,end) infinite" }}>.</span></>)}
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl font-light max-w-5xl mx-auto leading-relaxed mt-8 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} style={{ textShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.6)" : "none", animation: "textFloat 4s ease-in-out infinite" }}>
          Where <span className={`font-bold ${isDarkMode ? "text-[#D4AF37]" : "text-[#B8860B]"}`}>AI meets Art</span>.<br />
          Where <span className={`font-bold ${isDarkMode ? "text-[#D4AF37]" : "text-[#B8860B]"}`}>Creativity gets upgraded</span>.
        </p>
        <CountdownTimer 
          targetDate={new Date('2026-08-01T00:00:00')} 
          isDarkMode={isDarkMode} 
        />
        <div className="mt-4">
          <p className={`text-lg md:text-xl lg:text-2xl font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Contact us at: <a href="mailto:contact@kuttypixel.ca" className={`font-bold ${isDarkMode ? "text-[#D4AF37] hover:text-[#FFD700]" : "text-[#B8860B] hover:text-[#DAA520]"}`}>contact@kuttypixel.ca</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
