import React, { useState, useEffect } from 'react';

const CodeProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="horizontal-progress-container">
      <div className="horizontal-progress-bar">
        <div 
          className="horizontal-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default CodeProgress;