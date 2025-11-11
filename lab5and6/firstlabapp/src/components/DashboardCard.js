import React from 'react';
import './DashboardCard.css';

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DashboardCard;
