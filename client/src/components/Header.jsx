import React from 'react';

const Header = () => (
  <header>
    <nav className="header">
      <div className="logo">Chain of Hope</div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#get-involved">Get Involved</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="donate-button">Donate</button>
    </nav>
  </header>
);

export default Header;
