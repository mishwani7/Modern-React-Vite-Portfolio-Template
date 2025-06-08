import React, { useState, useEffect } from "react";

const Hero = () => {
  const [currentLocationText, setCurrentLocationText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  // Dynamic rotating texts for location with proper code syntax
const locationTexts = [
  'location: "Drosh, Chitral, Pakistan"',
  'company: "HindukushSoft Technologies Pvt. Ltd."',
  'role: "Founder, Full-Stack Developer & SEO Specialist"',
  'mission: "Creating Opportunities & Empowering Youth Through Technology"',
  'skills: ["Web & Mobile Development", "SEO", "Leadership"]',
  'passion: "Building Solutions That Uplift Communities"'
];
  // Simple code writing effect
  useEffect(() => {
    const writeCode = async (text) => {
      setIsTyping(true);
      setCurrentLocationText("");
      
      // Simple writing animation
      for (let i = 0; i <= text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 60));
        setCurrentLocationText(text.slice(0, i));
      }
      
      setIsTyping(false);
      
      // Wait before starting next code
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Clear code
      for (let i = text.length; i >= 0; i--) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setCurrentLocationText(text.slice(0, i));
      }
    };    const startCoding = async () => {
      await writeCode(locationTexts[currentIndex]);
      setCurrentIndex((prev) => (prev + 1) % locationTexts.length);
    };

    startCoding();
  }, [currentIndex]);

  // Enhanced cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <section className="hero">
      <div className="container">
        <div className="profile-section">
          <div className="profile-container">
            <div className="profile-border"></div>
            <div className="profile-image">
              <img
                src="https://mishwani.techabu.co/wp-content/uploads/2025/06/abu-zar.mishwani.webp"
                alt="Abu Zar Mishwani"
              />
              <div
                className="status-indicator"
                title="Available for collaboration"
              ></div>
            </div>
            <div className="code-badge">{"{\"dev\"}"}</div>
          </div>          <h1 className="hero-title">Abu Zar Mishwani</h1>
          <p className="hero-role">Software Engineer & Tech Entrepreneur</p>
          <div className="hero-location-container">
            <span className="hero-location code-syntax">
              {currentLocationText}
              <span className={`typing-cursor ${showCursor ? 'visible' : ''} ${isTyping ? 'typing' : ''}`}>_</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
