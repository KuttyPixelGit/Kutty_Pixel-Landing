import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black pointer-events-none" style={{ animation: "fadeOutContainer .4s ease-out 2.4s forwards" }}>
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-7 bg-[#D4AF37]" />
      <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-5 bg-[#FFD700]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-0" style={{ animation: "vignette 0.5s ease-out forwards" }} />
        <div className="relative flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 24, height: 24, border: "2px solid rgba(255,215,0,0.45)", filter: "drop-shadow(0 0 6px rgba(255,215,0,0.35))", animation: "ripple 0.7s ease-out 0.1s both" }} />
          <div style={{ width: "min(90vw, 900px)", perspective: "1000px", transformStyle: "preserve-3d", position: 'relative' }}>
            <div style={{ transformOrigin: "50% 50%", backfaceVisibility: "hidden", willChange: "transform, opacity", animation: "zoomFlip .7s cubic-bezier(.2,.7,.2,1) .1s both" }}>
              <svg viewBox="0 0 1000 200" width="100%" height="100%">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="60%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" stroke="url(#goldGradient)" strokeWidth="2" fill="transparent" strokeDasharray="2200" strokeDashoffset="2200" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, fontSize: 120, letterSpacing: 6, filter: 'none', animation: "textStroke 0.8s ease-out forwards, textFill 0.2s ease-out 0.8s forwards, glowOn .35s ease-out 1.3s forwards" }}>
                  KUTTY • PIXEL
                </text>
              </svg>
              <div className="absolute" style={{ left: '50%', top: '50%', width: 6, height: 6, borderRadius: '9999px', background: 'radial-gradient(circle, #fff, #FFD700 60%, rgba(255,215,0,0) 70%)', boxShadow: '0 0 12px rgba(255,215,0,0.9)', transform: 'translate(260px,-180px)', animation: 'starTravel .6s ease-out .7s forwards', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.7))', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;