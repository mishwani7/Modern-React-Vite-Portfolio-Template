import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide cursor on touch devices
    if ("ontouchstart" in window) {
      cursor.style.display = "none";
      return;
    }

    let animationFrame;

    // Update mouse position
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth cursor movement
    const updateCursor = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      cursor.style.transform = `translate(${cursorPos.current.x - 12}px, ${cursorPos.current.y - 12}px)`;
      
      animationFrame = requestAnimationFrame(updateCursor);
    };

    // Interactive elements hover effects
    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [onclick], .social-link, .theme-toggle, input, textarea"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor-hover");
        });

        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-hover");
        });
      });
    };

    // Click feedback
    const handleMouseDown = () => {
      cursor.classList.add("cursor-click");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("cursor-click");
    };

    // Hide/show cursor when leaving/entering window
    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    // Initialize
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add hover effects with a delay to ensure DOM is ready
    setTimeout(addHoverEffects, 500);

    updateCursor();

    // Show cursor with fade-in
    setTimeout(() => {
      cursor.style.opacity = "1";
    }, 500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  );
};

export default CustomCursor;
