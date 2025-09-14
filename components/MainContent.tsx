import React, { useRef, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

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
        <div className="mt-10">
        <p className={`text-lg md:text-xl lg:text-2xl font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
          Contact us at: <a href="mailto:contact@kuttypixel.ca" className={`font-bold ${isDarkMode ? "text-[#D4AF37] hover:text-[#FFD700]" : "text-[#B8860B] hover:text-[#DAA520]"}`}>contact@kuttypixel.ca</a>
        </p>
      </div>
      </div>
    </section>
  );
};

export default MainContent;