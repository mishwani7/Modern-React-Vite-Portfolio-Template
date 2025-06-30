import React, { useEffect, useState, useRef, useCallback } from "react";

const ScrollProgress = () => {
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
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar"
        style={{ 
          width: `${scrollProgress}%`
        }}
      />
    </div>
  );
};

export default ScrollProgress;
