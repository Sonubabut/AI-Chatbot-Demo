import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="left-logo">
        <img src={"https://test.digitalt3.com/wp-content/uploads/2024/05/DT3_WOBG_LOGO.png"} alt="Logo" />
      </div>
      <div className="right-menu">
        {/* Your menu items can go here */}
        <ul>
          <li className="menu-item"><NavLink to="/">Home</NavLink></li>
          <li className="menu-item"><NavLink to="/chat">Samba Bot</NavLink></li>
          <li className="menu-item"><NavLink to="/about">About Us</NavLink></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
