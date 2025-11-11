import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>Dashboard</li>
        <li>Reports</li>
        <li>Analytics</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
