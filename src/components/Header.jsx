import React from "react";

const Header = ({ onThemeToggle, theme }) => {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#" className="logo">abu_zar.mishwani</a>
        <button className="theme-toggle" onClick={onThemeToggle}>
          <svg
            className="theme-icon light"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg
            className="theme-icon dark"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
