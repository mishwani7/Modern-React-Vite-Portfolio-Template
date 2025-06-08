import React, { useEffect, useState } from "react";

const ThemeTransition = ({ show, data }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!show) return;

    const overlay = document.querySelector('.theme-transition-overlay');
    if (!overlay) return;

    // Reset classes and line counter
    overlay.classList.remove("sliding-in", "sliding-out");
    overlay.style.transform = "";
    overlay.style.transition = "";
    setCurrentLine(0);

    // Start sliding animation
    overlay.classList.add("sliding-in");// Simulate code execution line by line with slightly increased timing
    const codeLines = [
      { delay: 600, line: 1 },
      { delay: 800, line: 2 },
      { delay: 1000, line: 3 },
      { delay: 1200, line: 4 },
      { delay: 1400, line: 5 }
    ];

    const lineTimeouts = codeLines.map(({ delay, line }) =>
      setTimeout(() => setCurrentLine(line), delay)
    );

    // Hide transition after showing message
    const hideTimeout = setTimeout(() => {
      overlay.classList.remove("sliding-in");
      overlay.classList.add("sliding-out");

      // Reset overlay after slide down completes
      const resetTimeout = setTimeout(() => {
        overlay.style.transform = "translateY(100%)";
        overlay.classList.remove("sliding-out");
        setCurrentLine(0);

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
    }, 2200); // Adjusted to 2200ms

    return () => {
      clearTimeout(hideTimeout);
      lineTimeouts.forEach(clearTimeout);
    };
  }, [show]);

  // Cursor blinking effect
  useEffect(() => {
    if (!show) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [show]);

  if (!show) return null;

  const getThemeMode = () => data.icon === "moon" ? "dark" : "light";
  const themeMode = getThemeMode();
  return (
    <div 
      className="theme-transition-overlay"
      style={{ background: data.background }}
    >
      <div className="theme-transition-editor">
        {/* Editor Header */}
        <div className="transition-editor-header">
          <div className="transition-editor-tabs">
            <div className="transition-editor-tab active">
              <span className="tab-icon">⚡</span>
              <span className="tab-name">theme-switcher.js</span>
              <span className="tab-close">×</span>
            </div>
          </div>
          <div className="transition-editor-controls">
            <span className="control-dot red"></span>
            <span className="control-dot yellow"></span>
            <span className="control-dot green"></span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="transition-editor-content">          <div className="transition-line-numbers">
            <span className="line-number">1</span>
            <span className="line-number">2</span>
            <span className="line-number">3</span>
            <span className="line-number">4</span>
            <span className="line-number">5</span>
          </div>
          
          <div className="transition-code-content">
            <div className={`code-line ${currentLine >= 1 ? 'executed' : ''}`}>
              <span className="code-comment">// Initializing theme switch...</span>
            </div>
            <div className={`code-line ${currentLine >= 2 ? 'executed' : ''}`}>
              <span className="code-keyword">const</span>
              <span className="code-variable"> currentTheme</span>
              <span className="code-operator"> = </span>
              <span className="code-string">"{themeMode}"</span>
              <span className="code-punctuation">;</span>
            </div>
            <div className={`code-line ${currentLine >= 3 ? 'executed' : ''}`}>
              <span className="code-function">switchTheme</span>
              <span className="code-punctuation">(</span>
              <span className="code-variable">currentTheme</span>
              <span className="code-punctuation">);</span>
            </div>
            <div className={`code-line ${currentLine >= 4 ? 'executed' : ''}`}>
              <span className="code-function">updateUI</span>
              <span className="code-punctuation">();</span>
            </div>
            <div className={`code-line ${currentLine >= 5 ? 'executed' : ''}`}>
              <span className="code-comment">// {data.text} ✓</span>
              {currentLine >= 5 && showCursor && <span className="code-cursor">|</span>}
            </div>
          </div>
        </div>

        {/* Editor Status Bar */}
        <div className="transition-editor-status">
          <div className="status-left">
            <span className="status-item">
              <span className="status-icon">{themeMode === 'dark' ? '🌙' : '☀️'}</span>
              Theme: {themeMode}
            </span>            <span className="status-item">
              ⚡ {currentLine}/5 lines executed
            </span>
          </div>
          <div className="status-right">
            <span className="status-item">JavaScript</span>
            <span className="status-item">UTF-8</span>
            <span className="status-item">Ln {Math.max(currentLine, 1)}, Col 1</span>
          </div>
        </div>
      </div>

      {/* Compact Mobile Version */}
      <div className="theme-transition-mobile">
        <div className="mobile-terminal">
          <div className="mobile-terminal-header">
            <span className="mobile-terminal-title">⚡ Theme Switch</span>
            <div className="mobile-terminal-controls">
              <span className="mobile-dot red"></span>
              <span className="mobile-dot yellow"></span>
              <span className="mobile-dot green"></span>
            </div>
          </div>
          <div className="mobile-terminal-body">
            <div className={`mobile-code-line ${currentLine >= 1 ? 'executed' : ''}`}>
              <span className="mobile-prompt">$</span>
              <span className="mobile-command">theme --switch {themeMode}</span>
            </div>
            <div className={`mobile-code-line ${currentLine >= 2 ? 'executed' : ''}`}>
              <span className="mobile-output">✓ Loading theme configuration...</span>
            </div>
            <div className={`mobile-code-line ${currentLine >= 3 ? 'executed' : ''}`}>
              <span className="mobile-output">✓ Updating interface...</span>
            </div>            <div className={`mobile-code-line ${currentLine >= 4 ? 'executed' : ''}`}>
              <span className="mobile-output">✓ {data.text}</span>
            </div>
            <div className={`mobile-code-line ${currentLine >= 5 ? 'executed' : ''}`}>
              <span className="mobile-prompt">$</span>
              {currentLine >= 5 && showCursor && <span className="mobile-cursor">_</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeTransition;
