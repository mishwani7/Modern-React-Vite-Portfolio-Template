import React, { useEffect } from "react";

const ThemeTransition = ({ show, data }) => {
  useEffect(() => {
    if (!show) return;

    const overlay = document.querySelector('.theme-transition-overlay');
    if (!overlay) return;

    // Reset classes
    overlay.classList.remove("sliding-in", "sliding-out");
    overlay.style.transform = "";
    overlay.style.transition = "";

    // Start sliding animation
    overlay.classList.add("sliding-in");

    // Hide transition after showing message
    const hideTimeout = setTimeout(() => {
      overlay.classList.remove("sliding-in");
      overlay.classList.add("sliding-out");

      // Reset overlay after slide down completes
      const resetTimeout = setTimeout(() => {
        overlay.style.transform = "translateY(100%)";
        overlay.classList.remove("sliding-out");

        // After content reset, move to default position without animation
        const repositionTimeout = setTimeout(() => {
          overlay.style.transition = "none";
          overlay.style.transform = "translateY(-100%)";
          
          // Re-enable transitions
          setTimeout(() => {
            overlay.style.transition = "";
          }, 50);
        }, 100);

        return () => clearTimeout(repositionTimeout);
      }, 800);

      return () => clearTimeout(resetTimeout);
    }, 1850);

    return () => clearTimeout(hideTimeout);
  }, [show]);

  if (!show) return null;

  const renderIcon = () => {
    if (data.icon === "moon") {
      return (
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
      );
    } else {
      return (
        <>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
        </>
      );
    }
  };

  return (
    <div 
      className="theme-transition-overlay"
      style={{ background: data.background }}
    >
      <div className="theme-transition-content">
        <svg
          className="theme-transition-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {renderIcon()}
        </svg>
        <div className="theme-transition-text">{data.text}</div>
      </div>
    </div>
  );
};

export default ThemeTransition;
