import React from 'react';

const GlobalStyles: React.FC<{ isDarkMode: boolean }> = () => {
  // The isDarkMode prop is not directly used here because theme-specific styles
  // are handled via the `html.dark` class selector, which is toggled in `useComingSoon.ts`.
  // This approach aligns with Tailwind CSS's dark mode strategy.
  return (
    <style>{`
      body {
        /* Smooth scrolling for anchor links */
        scroll-behavior: smooth;
      }
      
      @keyframes zoomFlip {
        0% { transform: scale(0.8) rotateY(90deg); opacity: 0; }
        100% { transform: scale(1) rotateY(0deg); opacity: 1; }
      }
      @keyframes starTravelHero {
        0% { transform: translate(0, 0) scale(0); opacity: 0; }
        100% { transform: translate(-20px, 20px) scale(1); opacity: 1; }
      }
      @keyframes sparklePulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
      }
      @keyframes heroGlowOn {
        from { filter: drop-shadow(0 0 0px rgba(212,175,55,0)); }
        to { filter: drop-shadow(0 0 16px rgba(212,175,55,0.45)); }
      }
      @keyframes logoGlowPulse {
        0%, 100% { 
          box-shadow: 0 0 10px 2px rgba(212,175,55,0.6), 
                      0 0 20px 5px rgba(212,175,55,0.4); 
        }
        50% { 
          box-shadow: 0 0 15px 4px rgba(212,175,55,0.8), 
                      0 0 30px 10px rgba(212,175,55,0.5);
        }
      }
      @keyframes logoGlowPulseLight {
        0%, 100% { 
          box-shadow: 0 0 10px 2px rgba(184, 134, 11, 0.5), 
                      0 0 20px 5px rgba(184, 134, 11, 0.3);
        }
        50% { 
          box-shadow: 0 0 15px 4px rgba(184, 134, 11, 0.7), 
                      0 0 30px 10px rgba(184, 134, 11, 0.4);
        }
      }
      @keyframes dotsBlink {
        50% {
          opacity: 0;
        }
      }
      @keyframes textFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes fadeOutContainer {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes vignette {
        from { opacity: 0; }
        to { opacity: 0.7; }
      }
      @keyframes ripple {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(4); opacity: 0; }
      }
      @keyframes textStroke {
        to { stroke-dashoffset: 0; }
      }
      @keyframes textFill {
        to { fill: url(#goldGradient); stroke-width: 0; }
      }
      @keyframes glowOn {
        to { filter: drop-shadow(0 0 8px rgba(255,215,0,0.7)); }
      }
      @keyframes starTravel {
        0% { transform: translate(260px, -180px) scale(0); opacity: 0; }
        100% { transform: translate(380px, -120px) scale(1); opacity: 1; }
      }
      @keyframes successPulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 0 0 15px rgba(74, 222, 128, 0);
        }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
        }
        50% {
          box-shadow: 0 15px 50px rgba(212, 175, 55, 0.6);
        }
      }
      
      @keyframes glowPulseDark {
        0%, 100% {
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.15), 0 0 30px rgba(212, 175, 55, 0.1);
        }
        50% {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2);
        }
      }
      
      @keyframes glowPulseLight {
        0%, 100% {
          box-shadow: 0 0 15px rgba(184, 134, 11, 0.15), 0 0 30px rgba(184, 134, 11, 0.1);
        }
        50% {
          box-shadow: 0 0 20px rgba(184, 134, 11, 0.3), 0 0 40px rgba(184, 134, 11, 0.2);
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
      @keyframes particleFloat {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
      }
      
      @keyframes glassFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes neonPulse {
        0%, 100% { 
          opacity: 0.8;
          box-shadow: inset 0 0 10px rgba(212, 175, 55, 0.2), 0 0 15px rgba(212, 175, 55, 0.2);
        }
        50% { 
          opacity: 1;
          box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.4), 0 0 25px rgba(212, 175, 55, 0.4);
        }
      }
      
      @keyframes innerGlow {
        0% { opacity: 0.5; transform: scale(0.95); }
        100% { opacity: 0.8; transform: scale(1.05); }
      }
      
      @keyframes textGlow {
        0%, 100% { 
          text-shadow: 0 0 10px rgba(255, 230, 128, 0.5), 0 0 20px rgba(212, 175, 55, 0.3);
        }
        50% { 
          text-shadow: 0 0 15px rgba(255, 230, 128, 0.8), 0 0 30px rgba(212, 175, 55, 0.5);
        }
      }
      
      @keyframes hologramPulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.3);
          transform: perspective(1000px) rotateX(5deg);
        }
        50% {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.4);
          transform: perspective(1000px) rotateX(5deg) translateY(-2px);
        }
      }
      
      @keyframes gridPulse {
        0%, 100% {
          opacity: 0.2;
          transform: scale(1);
        }
        50% {
          opacity: 0.4;
          transform: scale(1.02);
        }
      }
      
      @keyframes hologramGlow {
        0%, 100% {
          opacity: 0.3;
          transform: scale(0.98);
        }
        50% {
          opacity: 0.5;
          transform: scale(1.02);
        }
      }
      
      @keyframes digitalFlicker {
        0%, 2%, 4%, 6%, 8%, 10%, 12%, 14%, 16%, 100% {
          opacity: 1;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.9), 0 0 25px rgba(255, 184, 28, 0.7);
        }
        1%, 3%, 5%, 7%, 9%, 11%, 13%, 15% {
          opacity: 0.9;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.7), 0 0 15px rgba(255, 184, 28, 0.5);
        }
      }
      
      @keyframes scanline {
        0% {
          transform: translateY(-100%);
          opacity: 0.5;
        }
        100% {
          transform: translateY(100%);
          opacity: 0;
        }
      }
      
      @keyframes edgePulse {
        0%, 100% {
          box-shadow: inset 0 0 10px rgba(255, 215, 0, 0.3);
          border-color: rgba(255, 215, 0, 0.3);
        }
        50% {
          box-shadow: inset 0 0 25px rgba(255, 215, 0, 0.5);
          border-color: rgba(255, 215, 0, 0.5);
        }
      }
      
      @keyframes colonPulse {
        0%, 100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.1);
        }
      }
      
      @keyframes particleFloat {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-80px) translateX(10px);
          opacity: 0;
        }
      }
      
      @keyframes crystalFloat {
        0%, 100% { 
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
        }
        25% { 
          transform: rotateX(5deg) rotateY(10deg) rotateZ(2deg); 
        }
        50% { 
          transform: rotateX(-5deg) rotateY(-10deg) rotateZ(-2deg); 
        }
        75% { 
          transform: rotateX(5deg) rotateY(-5deg) rotateZ(3deg); 
        }
      }
      
      @keyframes textShine {
        0% { 
          background-position: 0% 50%;
          filter: brightness(0.9);
        }
        100% { 
          background-position: 100% 50%;
          filter: brightness(1.1);
        }
      }
      
      @keyframes edgeGlow {
        0%, 100% { 
          opacity: 0.2;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        }
        50% { 
          opacity: 0.5;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        }
      }
      
      @keyframes lightReflection {
        0%, 100% { 
          opacity: 0;
          transform: 'translateZ(15px) translate(-50%, -50%)';
        }
        20%, 80% { 
          opacity: 0.6;
          transform: 'translateZ(15px) translate(0, 0)';
        }
        50% { 
          opacity: 0.8;
          transform: 'translateZ(15px) translate(20%, 20%)';
        }
      }
      
      @keyframes crystalPulse {
        0%, 100% { 
          transform: scale(1);
          opacity: 0.8;
        }
        50% { 
          transform: scale(1.1);
          opacity: 1;
        }
      }
      
      @keyframes liquidShine {
        0% {
          transform: translateX(-100%) rotate(-45deg);
          opacity: 0;
        }
        20% {
          opacity: 0.3;
        }
        40% {
          opacity: 0.1;
        }
        60% {
          opacity: 0.05;
        }
        80% {
          opacity: 0.01;
        }
        100% {
          transform: translateX(100%) rotate(-45deg);
          opacity: 0;
        }
      }
      
      @keyframes mercuryPulse {
        0%, 100% {
          box-shadow: 
            0 0 10px rgba(212, 175, 55, 0.3),
            0 0 20px rgba(212, 175, 55, 0.2),
            inset 0 2px 3px rgba(255, 255, 255, 0.1);
        }
        50% {
          box-shadow: 
            0 0 15px rgba(212, 175, 55, 0.4),
            0 0 30px rgba(212, 175, 55, 0.3),
            inset 0 2px 3px rgba(255, 255, 255, 0.2);
        }
      }

      /* Custom scrollbar for dark mode */
      html.dark ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      html.dark ::-webkit-scrollbar-track {
        background: #111;
      }
      html.dark ::-webkit-scrollbar-thumb {
        background-color: #D4AF37;
        border-radius: 10px;
        border: 3px solid #111;
      }
      html.dark ::-webkit-scrollbar-thumb:hover {
        background-color: #FFD700;
      }

      /* Custom scrollbar for light mode */
      html:not(.dark) ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      html:not(.dark) ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      html:not(.dark) ::-webkit-scrollbar-thumb {
        background-color: #B8860B;
        border-radius: 10px;
        border: 3px solid #f1f1f1;
      }
      html:not(.dark) ::-webkit-scrollbar-thumb:hover {
        background-color: #DAA520;
      }
    `}</style>
  );
};

export default GlobalStyles;
