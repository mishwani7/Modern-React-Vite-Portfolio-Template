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

    return () => {
      observer.disconnect();
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
    },
    {
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
  ];
  return (
    <div className="container">
      <div className="social-section">
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
              <i className={`${link.icon} fa-icon`}></i>
              <span className="social-text">
                <span className="platform">{link.platform}</span>: "
                <span className="url">{link.username}</span>
                {index < socialLinks.length - 1 ? "," : ""}
              </span>
            </a>
          ))}
        </div>
        <div className="social-closing">{"};"}</div>
      </div>
    </div>
  );
};

export default SocialSection;
