import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/DashboardCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard">
          <h2>Dashboard Overview</h2>
          <div className="cards-container">
            <DashboardCard title="Total Users" value="1,245" icon="👥" color="#a0d8ef" />
            <DashboardCard title="Active Sessions" value="325" icon="💻" color="#f5b971" />
            <DashboardCard title="Revenue" value="$12,450" icon="💰" color="#9fe6a0" />
            <DashboardCard title="Feedback" value="85" icon="💬" color="#f59fb0" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
