import React from 'react'
import logo from '../assets/logo.jpg'

const Header = ({ title, subtitle }) => {
  return (
    <header id="header">
      <img src={logo} alt="Investment Calculator Logo" />
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
};

export default Header;
