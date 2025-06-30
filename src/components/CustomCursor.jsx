import React, { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorMode, setCursorMode] = useState("default");
  const [showCode, setShowCode] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [trail, setTrail] = useState([]);
  // Simple code snippets for different elements
  const codeSnippets = {
    link: [
      "navigate(destination)",
      "window.location = url",
      "router.push(path)",
      "href.click()",
      "goto(newPage)"
    ],
    button: [
      "onClick(event)",
      "execute(command)",
      "trigger(action)",
      "dispatch(event)",
      "handleClick()"
    ],
    code: [
      "const result = await fetch()",
      "function create() { return magic }",
      "export { wisdom } from './mind'",
      "if (code) { enhance() }",
      "compile.success()"
    ],
    text: [
      "console.log('reading...')",
      "process.mind(thoughts)",
      "return inspiration",
      "parse(content)",
      "understand(meaning)"
    ],
    interactive: [
      "onClick(event)",
      "execute(command)",
      "trigger(action)",
      "interact(user)",
      "respond(input)"
    ]
  };

  // Create subtle particles on click
  const createParticle = useCallback((x, y) => {
    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 1,
      decay: 0.02 + Math.random() * 0.01,
      size: 2 + Math.random() * 3
    }));
    
    setParticles(prev => [...prev, ...newParticles].slice(-15));
  }, []);
  // Create ripple effect on click
  const createRipple = useCallback((x, y) => {
    const newRipple = {
      id: Math.random(),
      x,
      y,
      radius: 0,
      maxRadius: 80 + Math.random() * 40,
      opacity: 0.9,
      decay: 0.015
    };
    
    setRipples(prev => [...prev, newRipple].slice(-5));
  }, []);
  // Detect cursor mode based on element
  const detectCursorMode = useCallback((element) => {
    if (!element) return "default";
    
    const tagName = element.tagName?.toLowerCase();
    const classList = element.classList;
    const textContent = element.textContent?.toLowerCase();
    
    // Enhanced detection for better responsiveness
    if (classList.contains('code') || tagName === 'code' || classList.contains('terminal') || 
        classList.contains('file-tab') || classList.contains('code-line')) {
      return "code";
    }
    if (tagName === 'a' || tagName === 'button' || classList.contains('btn') || 
        classList.contains('social-link') || classList.contains('nav-link')) {
      return "interactive";
    }
    if (classList.contains('text') || tagName === 'p' || tagName === 'h1' || 
        tagName === 'h2' || tagName === 'h3' || tagName === 'span') {
      return "text";
    }
    
    return "default";
  }, []);

  // Update particles animation
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - particle.decay,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        }))
        .filter(particle => particle.life > 0)
      );      setRipples(prev => prev
        .map(ripple => ({
          ...ripple,
          radius: ripple.radius + 3,
          opacity: ripple.opacity - ripple.decay
        }))
        .filter(ripple => ripple.opacity > 0 && ripple.radius < ripple.maxRadius)
      );
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);
  // Mouse movement tracking - Optimized for performance
  useEffect(() => {
    let lastMouseMove = 0;
    
    const handleMouseMove = (e) => {
      // Throttle mouse move events for better performance
      const now = Date.now();
      if (now - lastMouseMove < 8) return; // Limit to ~120fps
      lastMouseMove = now;
      
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target;
      const mode = detectCursorMode(target);
      setCursorMode(mode);
      
      // Show code snippet for interactive elements (debounced)
      if (mode !== "default" && codeSnippets[mode]) {
        const snippets = codeSnippets[mode];
        setCurrentCode(snippets[Math.floor(Math.random() * snippets.length)]);
        setShowCode(true);
      } else {
        setShowCode(false);
      }
    };

    const handleMouseEnter = (e) => {
      if (e.target.tagName && e.target.tagName !== 'BODY') {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.tagName === 'BODY') {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      createParticle(mousePos.current.x, mousePos.current.y);
      createRipple(mousePos.current.x, mousePos.current.y);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [detectCursorMode, createParticle, createRipple]);  // Smooth cursor movement with trail - Optimized for responsiveness
  useEffect(() => {
    let animationId;
    
    const animateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      
      // Increased lerp factor for more responsive movement
      cursorPos.current.x += dx * 0.6; // Increased from 0.15 to 0.6
      cursorPos.current.y += dy * 0.6;
      
      // Simplified velocity calculation
      velocity.current.x = dx * 0.2;
      velocity.current.y = dy * 0.2;
      
      // Reduce trail points for better performance
      setTrail(prev => [
        ...prev.slice(-3), // Reduced from 5 to 3 trail points
        {
          x: cursorPos.current.x,
          y: cursorPos.current.y,
          opacity: 0.3, // Reduced opacity for subtlety
          id: Math.random()
        }
      ]);
      
      if (cursorRef.current) {
        // Use transform3d for hardware acceleration
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }
      
      animationId = requestAnimationFrame(animateCursor);
    };
    
    animationId = requestAnimationFrame(animateCursor);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorMode} ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        {/* Main cursor dot */}
        <div className="cursor-dot"></div>
        
        {/* Outer ring */}
        <div className="cursor-ring"></div>
        
        {/* Code snippet display */}
        {showCode && (
          <div className="cursor-code">
            {currentCode}
          </div>
        )}
          {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="cursor-particle"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
        
        {/* Ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="cursor-ripple"
            style={{
              left: ripple.x - ripple.radius,
              top: ripple.y - ripple.radius,
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              opacity: ripple.opacity,
            }}
          />
        ))}
        
        {/* Subtle Trail */}
        {trail.map((point, index) => (
          <div
            key={point.id}
            className="cursor-trail-point"
            style={{
              left: point.x,
              top: point.y,
              opacity: point.opacity * (index / trail.length),
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CustomCursor;
