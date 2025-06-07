import React from "react";

const Hero = () => {
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
          </div>
          <h1 className="hero-title">Abu Zar Mishwani</h1>
          <p className="hero-role">Software Engineer & Tech Entrepreneur</p>
          <p className="hero-location">Located in Drosh, Chitral, Pakistan</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
