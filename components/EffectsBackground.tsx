import React, { useEffect, useMemo, useRef, useState } from "react";

const Particles = ({ color = "#D4AF37", count = 80, intensity = 1 }) => {
  const dots = useMemo(() => Array.from({ length: count }).map((_, i) => i), [count]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: color,
            opacity: Math.max(0.05, (Math.random() * 0.4 + 0.1) * intensity),
            animation: `particleFloat ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
          }}
        />)
      )}
    </div>
  );
};

const EffectsBackground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const translate = (factor: number) => `translate(${mouse.x * factor}px, ${mouse.y * factor}px)`;

  return (
    <div className="fixed inset-0 -z-10">
      <div className={`fixed inset-0 pointer-events-none ${isDarkMode ? "bg-gradient-to-br from-black via-gray-950 to-black" : "bg-gradient-to-br from-white via-gray-50 to-gray-100"}`} />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-36 -left-36 w-80 h-80 rounded-full blur-2xl opacity-10" style={{ backgroundColor: isDarkMode ? "#D4AF37" : "#B8860B", transform: translate(12) }} />
        <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full blur-2xl opacity-6" style={{ backgroundColor: isDarkMode ? "#FFD700" : "#DAA520", transform: translate(-10) }} />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-xl opacity-5" style={{ backgroundColor: isDarkMode ? "#FFA500" : "#FF8C00", transform: translate(8) }} />
      </div>
      <Particles color={isDarkMode ? "#D4AF37" : "#B8860B"} count={isDarkMode ? 80 : 40} intensity={isDarkMode ? 1 : 0.5} />
      <div className="fixed inset-0" style={{ background: isDarkMode ? "radial-gradient(600px circle at 20% 20%, rgba(212,175,55,0.06), transparent 40%), radial-gradient(800px circle at 80% 80%, rgba(255,215,0,0.04), transparent 50%)" : "radial-gradient(600px circle at 20% 20%, rgba(0,0,0,0.03), transparent 40%), radial-gradient(800px circle at 80% 80%, rgba(0,0,0,0.02), transparent 50%)" }} />
    </div>
  );
};

export default EffectsBackground;