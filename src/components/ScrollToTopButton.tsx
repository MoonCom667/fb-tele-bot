import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 to 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button when scrolled down more than 300px
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  // SVG circular progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 sm:left-6 z-40 animate-in fade-in zoom-in-75 duration-300">
      <button
        onClick={scrollToTop}
        aria-label="العودة إلى أعلى الصفحة بسرعة"
        title="العودة إلى الأعلى"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/95 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-700/80 hover:border-amber-400/80 shadow-2xl backdrop-blur-md transition-all duration-300 active:scale-90 hover:-translate-y-1 focus:outline-none"
      >
        {/* SVG Circular Progress Ring */}
        <svg 
          className="absolute -rotate-90 pointer-events-none w-12 h-12"
          viewBox="0 0 48 48"
        >
          {/* Background track circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-slate-800 fill-none"
            strokeWidth="2.5"
          />
          {/* Active progress stroke */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-amber-400 fill-none transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Up Arrow Icon */}
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />

        {/* Floating Tooltip (Desktop) */}
        <span className="pointer-events-none absolute bottom-full mb-2 hidden md:group-hover:flex items-center gap-1 px-2.5 py-1 bg-slate-950/95 text-slate-200 text-[11px] font-bold rounded-lg border border-slate-700 whitespace-nowrap shadow-xl animate-in fade-in duration-200">
          <span>العودة للأعلى</span>
          <span className="text-[10px] font-tech text-amber-400">({Math.round(scrollProgress)}%)</span>
        </span>
      </button>
    </div>
  );
};
