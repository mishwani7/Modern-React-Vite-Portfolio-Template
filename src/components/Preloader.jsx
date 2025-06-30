import React, { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showCodeLines, setShowCodeLines] = useState([]);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {    // Animate code lines appearing
    const codeLineTimeouts = [];
    for (let i = 0; i < 5; i++) {
      const timeout = setTimeout(() => {
        setShowCodeLines(prev => [...prev, i]);
      }, i * 100);
      codeLineTimeouts.push(timeout);
    }    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 95);
        
        if (newProgress >= 95) {
          clearInterval(progressInterval);
          
          // Finish progress smoothly
          const finishInterval = setInterval(() => {
            setProgress(current => {              if (current >= 100) {
                clearInterval(finishInterval);
                
                // Start fade out animation
                setIsCompleting(true);
                
                // Complete preloader after fade out
                setTimeout(() => {
                  onComplete();
                }, 300); // Match CSS transition duration
                
                return 100;
              }
              return current + 2;
            });
          }, 50);
        }
        
        return newProgress;
      });
    }, 80);

    return () => {
      clearInterval(progressInterval);
      codeLineTimeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  const codeLines = [
    { line: 1, content: <><span className="comment">// Loading portfolio...</span></> },
    { 
      line: 2, 
      content: (
        <>
          <span className="keyword">const</span>{" "}
          <span className="variable">dev</span>{" "}={" "}
          <span className="keyword">new</span>{" "}
          <span className="function">Developer</span>();
        </>
      )
    },
    { 
      line: 3, 
      content: (
        <>
          <span className="variable">dev</span>.<span className="function">name</span>{" "}={" "}
          <span className="string">'Abu Zar'</span>;
        </>
      )
    },
    { 
      line: 4, 
      content: (
        <>
          <span className="variable">dev</span>.<span className="function">role</span>{" "}={" "}
          <span className="string">'Software Engineer'</span>;
        </>
      )
    },
    { 
      line: 5, 
      content: (
        <>
          <span className="variable">dev</span>.<span className="function">init</span>()
          <span className="cursor"></span>
        </>
      )
    }
  ];  return (
    <div className={`preloader ${isCompleting ? 'fade-out' : ''}`}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button close"></div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
          </div>
          <div className="terminal-title">abu_zar.mishwani</div>
        </div>
        <div className="terminal-body">
          {codeLines.map((codeLine, index) => (
            <div 
              key={codeLine.line}
              className={`code-line ${showCodeLines.includes(index) ? 'show' : ''}`}
            >
              <span className="line-number">{codeLine.line}</span>
              <span className="code-content">
                {codeLine.content}
              </span>
            </div>
          ))}
          <div className="progress-container">
            <div className="progress-label">
              <span>
                Loading
                <span className="loading-dots">
                  <span></span><span></span><span></span>
                </span>
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
