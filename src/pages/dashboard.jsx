import React, { useState, useEffect } from 'react';
import { Rocket, Brain, Bot } from 'lucide-react';
import ChatBot from '../components/chatbot.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import botPic from '../assets/botPic.png';
import mindfulPic from '../assets/mindfulPic.png';
import { quotes } from '../assets/quotesList.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import { stubData } from '../stubdata.js';  //--------------------> Importing stubData from stubdata.js

export default function Dashboard() {
  const navigate = useNavigate();

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  const username = stubData.userProfile.username;  //--------------------> Getting username from stubData
  const wellnessIndex = stubData.wellnessIndexDaily.data;  //--------------------> Getting wellnessIndex from stubData
  
  const toggleChat = () => {
    const chatbot = document.querySelector('.chatbot-container');  //toggles open and close the chatbot
    chatbot.classList.toggle('hidden');
}

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">  {/*Main dashboard container*/}
        <div className="dashboard-header">  {/*Displays the header of the dashboard*/}
          <div className="dashboard-header-icon">
            <Rocket className="w-6 h-6" />
          </div>
          <h1 className="dashboard-header-title">Dashboard</h1>
          <h2 className="dashboard-header-subtitle">Welcome back, {username}!</h2>
        </div>

        <div className="dashboard-content">
          <ChatBot />

          <section className="daily-quote">  {/*Displays the daily quote*/}
            <div className="overlap-group">
              <p className="quote-text">{currentQuote.quote}</p>
              <div className="overlap">
                <div className="text-wrapper">- {currentQuote.author}</div>
                <div className="div">{currentQuote.date}</div>
              </div>
            </div>
          </section>

          <section className="dashboard-section">  
            <h2 className="dashboard-section-title">Daily Mindful Check-In Results</h2> {/*Displays the chart*/}
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wellnessIndex} margin={{ top: 5, right: 20, left: 10, bottom: 10 }}>
                  <Label value="Wellness Index" offset={0} position="top" />
                  <XAxis dataKey="day">
                    <Label value="Day" offset={-5} position="bottom" />
                  </XAxis>
                  <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]}>
                    <Label value="Wellness Index" angle={-90} position="Left" />
                  </YAxis>
                  <Line type="monotone" dataKey="wellnessIndex" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* <section className="dashboard-section">     ----------> To be implemented in ITR2
            <h2 className="dashboard-section-title">Earn Badges as you reach milestones and stay motivated</h2>
            <div className="dashboard-badges">
              <Badge icon={<Target className="w-8 h-8" />} color="badge-red" />
              <Badge icon={<Moon className="w-8 h-8" />} color="badge-yellow" />
            </div>
          </section> */}

          <div className="dashboard-cards">

            {/* 
            Feature will arrive in ITR2
            <DashboardCard         
              title="Macro Tracker"
              description="Track your daily macros effortlessly!"
              icon={<PieChart className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card-purple"
            /> */}
            
            <DashboardCard    //creates a dashboard card for the daily check-in
              title="Mindful Check-in"
              description="Complete your daily check-in now"
              icon={<Brain className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image= {mindfulPic}
              onClick={() => navigate('/survey')}
            />

            <DashboardCard  //creates a dashboard card for the wellness bot
              title="Wellness bot"
              description="Meet your personal wellness bot!"
              icon={<Bot className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image= {botPic}
              onClick={() => toggleChat()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, color }) {  //creates constructor for badges with icon and color
  return (
    <div className={`badge ${color}`}>
      {typeof icon === 'string' ? <span className="text-xl font-semibold">{icon}</span> : icon}
    </div>
  );
}

function DashboardCard({ title, description, image, bgColor, onClick }) {   //creates constructor for dashboard cards with title, description, icon and background color
  return (
    <div className={`dashboard-card ${bgColor}`} onClick={onClick}>  
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
      </div>
      <img className="dashboard-card-image" src={image}/>
      <p className="dashboard-card-description">{description}</p>
    </div>
  );
}