import React, { useRef, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

interface HeroSectionProps {
  isDarkMode: boolean;
  showContent: boolean;
}

const MainContent: React.FC<HeroSectionProps> = ({ isDarkMode, showContent }) => {
  const fullHeadline = "SOMETHING PIXEL-PERFECT IS COMING...";
  const { typewriterText } = useTypewriter(fullHeadline, showContent);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
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

  const handleNotifySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubmitStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/kuttypixelinc@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email,
          _subject: "New Early Access Subscription!",
          _autoresponse: "Thank you for your interest in Kutty Pixel Inc.! We have received your request and will notify you as soon as we launch. Stay tuned for something pixel-perfect!"
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('sent');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="mb-16" style={{ animation: showContent ? "zoomFlip .7s cubic-bezier(.2,.7,.2,1) both" : "", transformStyle: 'preserve-3d' }}>
        <div className="relative inline-block">
          <div className="absolute" style={{ right: '-120px', top: '-80px', width: 8, height: 8, borderRadius: '9999px', background: 'radial-gradient(circle, #ffffff 0%, #FFE680 30%, #FFD700 60%, rgba(255,215,0,0) 70%)', boxShadow: '0 0 16px rgba(255,215,0,0.95), 0 0 28px rgba(212,175,55,0.55)', transform: 'translate(0,0)', animation: showContent ? 'starTravelHero .5s ease-out .3s forwards, sparklePulse .6s ease-in-out .3s infinite alternate' : 'none', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.85))', pointerEvents: 'none' }} />
          <img src="/logo.png" alt="Kutty Pixel Inc." className="h-40 md:h-56 lg:h-72 w-auto mx-auto" style={{ filter: 'none', borderRadius: 16, transform: `perspective(900px) rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 8}deg) translateZ(6px)`, animation: `${showContent ? 'heroGlowOn .35s ease-out .65s forwards, logoGlowPulse 4s ease-in-out 1.05s infinite alternate' : 'none'}` }} />
        </div>
      </div>
      <div className="text-center mb-12 w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-8 font-mono text-center" style={{ color: "#D4AF37", textShadow: isDarkMode ? "0 1px 0 #B89422, 0 2px 0 #A17E1E, 0 3px 2px rgba(0,0,0,0.35), 0 0 14px rgba(212,175,55,0.25)" : "0 1px 0 #A77C13, 0 2px 0 #916D10, 0 3px 2px rgba(0,0,0,0.15), 0 0 8px rgba(184,134,11,0.15)", transform: `perspective(900px) rotateX(${tilt.y * -3}deg) rotateY(${tilt.x * 4}deg)`, letterSpacing: "0.02em", lineHeight: "1.2", wordSpacing: "0.1em" }}>
          {typewriterText === fullHeadline ? fullHeadline.slice(0, -3) : typewriterText}
          {typewriterText === fullHeadline && (<>..<span style={{ color: isDarkMode ? "#D4AF37" : "#B8860B", animation: "dotsBlink 1s steps(1,end) infinite" }}>.</span></>)}
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl font-light max-w-5xl mx-auto leading-relaxed mt-8 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} style={{ textShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.6)" : "none", animation: "textFloat 4s ease-in-out infinite" }}>
          Where <span className={`font-bold ${isDarkMode ? "text-[#D4AF37]" : "text-[#B8860B]"}`}>AI meets Art</span>.<br />
          Where <span className={`font-bold ${isDarkMode ? "text-[#D4AF37]" : "text-[#B8860B]"}`}>Creativity gets upgraded</span>.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <form onSubmit={handleNotifySubmit} className={`flex w-full max-w-xl rounded-full backdrop-blur-md border px-3 py-2 gap-2 ${isDarkMode ? "bg-black/20 border-[#D4AF37]/30" : "bg-white/60 border-[#B8860B]/30"}`} style={{ boxShadow: isDarkMode ? "0 0 40px rgba(212,175,55,0.10)" : "0 0 40px rgba(184,134,11,0.10)" }}>
            <input type="email" required placeholder="Enter your email for early access" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitStatus === 'sending' || submitStatus === 'sent'} className={`flex-1 bg-transparent outline-none px-4 py-3 text-base rounded-full ${isDarkMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-600"}`} />
            <button type="submit" disabled={submitStatus === 'sending' || submitStatus === 'sent'} className={`px-6 py-3 rounded-full font-semibold transition-colors ${isDarkMode ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black" : "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white"}`} style={{ boxShadow: isDarkMode ? "0 0 30px rgba(212,175,55,0.35)" : "0 0 30px rgba(184,134,11,0.35)" }}>
              {submitStatus === 'sent' ? "Thanks!" : submitStatus === 'sending' ? "Sending..." : "Get Notified"}
            </button>
          </form>
        </div>
         {submitStatus === 'error' && <p className="mt-4 text-red-500">Submission failed. Please try again.</p>}
      </div>
    </section>
  );
};

export default MainContent;