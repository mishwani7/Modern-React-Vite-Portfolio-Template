import React, { useEffect, useState, useRef } from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ThemeTransition from "./components/ThemeTransition";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Biography from "./components/Biography";
import SocialSection from "./components/SocialSection";
import Footer from "./components/Footer";
import CodeParticles from "./components/CodeParticles";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);
  const [showThemeTransition, setShowThemeTransition] = useState(false);
  const [themeTransitionData, setThemeTransitionData] = useState({});

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
    document.body.classList.add("loading");
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Set up transition data
    setThemeTransitionData({
      background: newTheme === "dark" ? "#0a0a0f" : "#ffffff",
      text: newTheme === "dark" ? "Dark Mode Activated" : "Light Mode Activated",
      icon: newTheme === "dark" ? "moon" : "sun"
    });
    
    setShowThemeTransition(true);
      // Change theme after overlay covers screen
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.body.setAttribute("data-theme", newTheme);
    }, 850);
      // Hide transition after showing message
    setTimeout(() => {
      setShowThemeTransition(false);
    }, 3000);
  };

  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.classList.add("loaded");
    document.body.classList.remove("loading");
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <CustomCursor />      <ThemeTransition 
        show={showThemeTransition}
        data={themeTransitionData}
      />
      <CodeParticles />
      
      <Header onThemeToggle={handleThemeToggle} theme={theme} />
      
      <main className="main">
        <Hero />
        <Biography />
        <SocialSection />
      </main>
      
      <Footer />
    </>
  );
};

export default App;