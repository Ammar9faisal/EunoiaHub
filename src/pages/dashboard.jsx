import React from 'react';
import { ArrowUpRight, Rocket, Target, Moon, PieChart, Brain, Bot } from 'lucide-react';
import ChatBot from '../components/chatbot.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import stubDatabase from '../../stubdata.js';
import botPic from '../assets/botPic.png';
import mindfulPic from '../assets/mindfulPic.png';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    console.log(stubDatabase),
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-icon">
            <Rocket className="w-6 h-6" />
          </div>
          <h1 className="dashboard-header-title">Dashboard</h1>
          <h2 className="dashboard-header-subtitle">Welcome back, User!</h2>
        </div>

        <div className="dashboard-content">
          <ChatBot />

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">Earn Badges as you reach milestones and stay motivated</h2>
            <div className="dashboard-badges">
              <Badge icon={<Target className="w-8 h-8" />} color="badge-red" />
              <Badge icon={<Moon className="w-8 h-8" />} color="badge-yellow" />
            </div>
          </section>

          <div className="dashboard-cards">

            {/* 
            Feature will arrive in ITR2
            <DashboardCard         
              title="Macro Tracker"
              description="Track your daily macros effortlessly!"
              icon={<PieChart className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card-purple"
            /> */}
            
            <DashboardCard  
              title="Mindful Check-in"
              description="Complete your daily check-in now"
              icon={<Brain className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image= {mindfulPic}
            />

            <DashboardCard
              title="Wellness bot"
              description="Meet your personal wellness bot!"
              icon={<Bot className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image= {botPic}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, color }) {  //creates construcoor for badges with icon and color
  return (
    <div className={`badge ${color}`}>
      {typeof icon === 'string' ? <span className="text-xl font-semibold">{icon}</span> : icon}
    </div>
  );
}

function DashboardCard({ title, description, image, bgColor, toDo }) {   //creates constructor for dashboard cards with title, description, icon and background color
  return (
    <div className={`dashboard-card ${bgColor}`}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
      </div>
      <img className="dashboard-card-image" src={image}/>
      <p className="dashboard-card-description">{description}</p>
    </div>
  );
}