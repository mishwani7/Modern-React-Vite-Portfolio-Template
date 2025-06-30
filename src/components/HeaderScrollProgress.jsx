import React, { useEffect, useState, useRef, useCallback } from "react";

const HeaderScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    
    setScrollProgress(scrollPercent);
  }, []);

  const handleScroll = useCallback(() => {
    // Update immediately without RAF to be more responsive
    updateProgress();
  }, [updateProgress]);

  useEffect(() => {
    // Initial call
    updateProgress();
    
    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [handleScroll, updateProgress]);

  return (
    <div className="header-scroll-progress">
      <div 
        className="header-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="header-progress-glow"></div>
      </div>
    </div>
  );
};

export default HeaderScrollProgress;
