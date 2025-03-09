import React, { useState, useEffect } from 'react';
import { Rocket, Brain, Bot } from 'lucide-react';
import ChatBot from '../components/Chatbot.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import botPic from '../assets/botPic.png';
import mindfulPic from '../assets/mindfulPic.png';
import { quotes } from '../assets/quotesList.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { stubData } from '../stubdata.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  const username = stubData.userProfile.username;
  const wellnessIndex = stubData.wellnessIndexDaily.data;
  
  const toggleChat = () => {
    const chatbot = document.querySelector('.chatbot-container');
    chatbot.classList.toggle('hidden');
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-icon">
            <Rocket className="w-6 h-6" />
          </div>
          <h1 className="dashboard-header-title">Dashboard</h1>
          <h2 className="dashboard-header-subtitle">Welcome back, {username}!</h2>
        </div>

        <div className="dashboard-content">
          <ChatBot />

          <section className="daily-quote">
            <div className="overlap-group">
              <p className="quote-text">{currentQuote.quote}</p>
              <div className="overlap">
                <div className="text-wrapper">- {currentQuote.author}</div>
                <div className="div">{currentQuote.date}</div>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">Daily Mindful Check-In Results</h2>
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

          <div className="dashboard-cards">
            <DashboardCard 
              title="Mindful Check-in"
              description="Complete your daily check-in now"
              icon={<Brain className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image={mindfulPic}
              onClick={() => navigate('/survey')}
            />

            <DashboardCard  
              title="Wellness bot"
              description="Meet your personal wellness bot!"
              icon={<Bot className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image={botPic}
              onClick={() => toggleChat()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, image, bgColor, onClick }) {
  return (
    <div className={`dashboard-card ${bgColor}`} onClick={onClick}>  
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
      </div>
      <img className="dashboard-card-image" src={image} alt={title} />
      <p className="dashboard-card-description">{description}</p>
    </div>
  );
}