import React, { useState, useEffect, useRef } from 'react';

const Particles = ({ color = "#D4AF37", count = 80, intensity = 1 }) => {
  const dots = Array.from({ length: count }).map((_, i) => i);
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

interface VideoIntroProps {
  onVideoEnd: () => void;
  isDarkMode: boolean;
}

const VideoIntro: React.FC<VideoIntroProps> = ({ onVideoEnd, isDarkMode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const skipVideo = () => {
    onVideoEnd();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadProgress((bufferedEnd / duration) * 100);
        }
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(error => {
        console.error("Video play failed:", error);
        setError("Autoplay failed. Click the play button to start the video.");
        video.controls = true;
      });
    };

    const handleEnded = () => {
      onVideoEnd();
    };

    const handleError = () => {
      setError("Failed to load video. Please check your connection or try again later.");
      setIsLoading(false);
    };

    // Preload the video
    video.load();

    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Add a timeout to handle cases where the video takes too long to load
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        setError("Video is taking longer than expected to load. You can skip the intro or wait a bit longer.");
      }
    }, 5000);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      clearTimeout(loadTimeout);
    };
  }, [isLoading]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50 p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-white text-lg mb-6">{error}</p>
          <button 
            onClick={skipVideo}
            className="bg-[#D4AF37] hover:bg-[#FFD700] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Skip Intro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-gray-950 to-[#080808]">
        <div className="absolute -top-36 -left-36 w-80 h-80 rounded-full blur-2xl opacity-10" style={{ backgroundColor: "#D4AF37" }} />
        <div className="absolute -bottom-40 -right-32 w-64 h-64 rounded-full blur-2xl opacity-6" style={{ backgroundColor: "#FFD700" }} />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-xl opacity-5" style={{ backgroundColor: "#FFA500" }} />
        <Particles color="#D4AF37" count={80} intensity={1} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(600px circle at 20% 20%, rgba(212,175,55,0.06), transparent 40%), radial-gradient(800px circle at 80% 80%, rgba(255,215,0,0.04), transparent 50%)" }} />
      </div>

      {/* Video container - maintains 16:9 aspect ratio */}
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          muted
          loop={false}
          preload="auto"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
            display: 'block',
            margin: '0 auto'
          }}
        >
          <source src="/2026.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-lg">
            <div className="w-16 h-16 border-4 border-t-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg mb-2">Loading video...</p>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">{Math.round(loadProgress)}% loaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoIntro;
