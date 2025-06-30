import React, { useEffect, useState, useRef, Suspense } from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ThemeTransition from "./components/ThemeTransition";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CodeParticles from "./components/CodeParticles";
import StructuredData from "./components/StructuredData";

// Lazy load non-critical components for better performance
const Biography = React.lazy(() => import("./components/Biography"));
const SocialSection = React.lazy(() => import("./components/SocialSection"));
const Footer = React.lazy(() => import("./components/Footer"));

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
  };  return (
    <>
      <StructuredData />
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <CustomCursor />
      <ScrollProgress />
      <ThemeTransition 
        show={showThemeTransition}
        data={themeTransitionData}
      />
      <CodeParticles />
        <Header onThemeToggle={handleThemeToggle} theme={theme} />
        <main className="main">
        <Hero />
        <div className="container">
          <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
            <Biography />
          </Suspense>
          <div className="section-connector"></div>
          <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
            <SocialSection />
          </Suspense>
        </div>
      </main>
      
      <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;