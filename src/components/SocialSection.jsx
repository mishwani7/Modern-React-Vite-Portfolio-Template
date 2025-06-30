import React, { useEffect } from "react";

const SocialSection = () => {
  useEffect(() => {
    // Scroll animations observer for social section
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe social section
    const socialSection = document.querySelector(".social-section");
    if (socialSection) {
      observer.observe(socialSection);
    }

    // Mouse tracking for glow effect
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.social-section.code-editor-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/mishwani7/",
      icon: "fa-brands fa-linkedin",
      platform: "linkedin",
      username: "@mishwani7"
    },
    {
      href: "https://www.x.com/itsabuzarr",
      icon: "fa-brands fa-x-twitter",
      platform: "twitter",
      username: "@itsabuzarr"
    },
    {
      href: "https://www.instagram.com/mishwani7",
      icon: "fa-brands fa-instagram",
      platform: "instagram",
      username: "@mishwani7"
    },
    {
      href: "https://www.facebook.com/abuzar.mishwani/",
      icon: "fa-brands fa-facebook",
      platform: "facebook",
      username: "@abuzar.mishwani"
    },
    {
      href: "https://wa.link/evrjp7",
      icon: "fa-brands fa-whatsapp",
      platform: "whatsapp",
      username: "@personal"
    },
    {
      href: "https://github.com/mishwani7",
      icon: "fa-brands fa-github",
      platform: "github",
      username: "@mishwani7"
    },    {
      href: "https://mishwani.techabu.co/",
      icon: "fa-solid fa-globe",
      platform: "portfolio",
      username: "@projects"
    },
    {
      href: "https://www.buymeacoffee.com/mishwani",
      icon: "fa-solid fa-mug-hot",
      platform: "buymeacoffee",
      username: "@mishwani"
    }
  ];  return (
    <div className="social-section code-editor-card">
        {/* Code Editor Toolbar */}
        <div className="code-editor-toolbar">
          <div className="window-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>          <div className="file-tabs">
            <div className="file-tab active">
              <span className="file-icon">🔗</span>
              <span className="file-name">connect.jsx</span>
              <span className="file-modified">●</span>
            </div>          </div>
        </div>

        {/* Code Editor Content */}
        <div className="code-editor-content">
          <div className="line-numbers">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <span>18</span>
            <span>19</span>
            <span>20</span>
          </div>
          <div className="code-content">
            <div className="code-line">
              <span className="keyword">const</span> <span className="variable">socialConnections</span> = {"{"}
            </div>
            <h3 className="social-title">Connect & Collaborate</h3>
            <p className="social-subtitle">Let's build something amazing together</p>
            <div className="social-grid">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="social-link"
                  rel="noopener noreferrer"
                >
                  <i className={`${link.icon} fa-icon`}></i>                  <span className="social-text">
                    <div className="platform-line">{link.platform}:</div>
                    <div className="url-line">"{link.username}"{index < socialLinks.length - 1 ? "," : ""}</div>
                  </span>
                </a>
              ))}
            </div>
            <div className="social-closing">{"};"}</div>
          </div>
        </div>        {/* Code Editor Footer */}
        <div className="code-editor-footer">
          <div className="footer-left">
            <span className="encoding">UTF-8</span>
          </div><div className="footer-right">
            <span className="cursor-position">Ln 20, Col 2</span>          </div>
        </div>
      </div>
    );
  };
  
  export default SocialSection;
