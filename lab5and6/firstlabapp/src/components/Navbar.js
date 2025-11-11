import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">My Dashboard</h2>
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Dashboard</li>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
      <div className="navbar-user">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" className="avatar" />
        <span>Kashif</span>
      </div>
    </nav>
  );
}

export default Navbar;
