import React, { useState, useEffect } from 'react';
import { Rocket, Brain, Bot } from 'lucide-react';
import ChatBot from '../components/chatbot.jsx';
import Sidebar from '../components/sidebar.jsx';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import botPic from '../assets/botPic.png';
import mindfulPic from '../assets/mindfulPic.png';
import { quotes } from '../assets/quotesList.js';
import dailyExercisesPic from '../assets/DE-Dashboard.png';
import bottlePic from '../assets/bottle.png';  // Imported bottle image
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import db from '../database.js';
import { account } from '../appwrite.js';
import { fetchWellnessIndexData } from '../services/dashboardService.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);  
  const [dashboardColor, setDashboardColor] = useState('dashboard-white'); 
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [wellnessIndexData, setWellnessIndexData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        console.log('Logged-in user ID:', user.$id);
      } catch (error) {
        console.error('Error fetching user account:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchUserDocument = async () => {
      if (userId) {
        try {
          const response = await db.users.get(userId);
          setUser(response);
          console.log('User document:', response);
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    fetchUserDocument();
  }, [userId]);

  useEffect(() => {
    const fetchWellnessData = async () => {
      if (userId) {
        try {
          const data = await fetchWellnessIndexData(userId);
          setWellnessIndexData(data);
        } catch (error) {
          console.error('Error fetching wellness index data:', error);
        }
      }
    };

    fetchWellnessData();
  }, [userId]);

  useEffect(() => {
    const startDate = new Date("03/20/2025");
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const index = diffDays % quotes.length;
    setCurrentQuote(quotes[index]);
  }, []);
  
  const toggleChat = () => {
    const chatbot = document.querySelector('.chatbot-container');
    chatbot.classList.toggle('hidden');
  };

  return (
    <div className={`dashboard-container ${dashboardColor}`}>
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-icon">
            <Rocket className="w-6 h-6" />
          </div>
          <h1 className="dashboard-header-title">Dashboard</h1>
          <h2 className="dashboard-header-subtitle">
            Welcome back, {user ? user.name : 'Loading...'}!
          </h2>
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
                <LineChart data={wellnessIndexData} margin={{ top: 5, right: 20, left: 10, bottom: 10 }}>
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

            <DashboardCard
              title="Daily Exercises"
              description="Start your daily wellness exercises now"
              icon={<Rocket className="w-16 h-16 text-gray-600" />}
              bgColor="dashboard-card"
              image={dailyExercisesPic}
              onClick={() => navigate('/DailyExercises')}
            />

            {/* Bottle Dashboard Card */}
            <DashboardCard
              title="Mystery Bottle"
              description="Click to reveal something special!"
              bgColor="dashboard-card"
              image={bottlePic}
              onClick={() => navigate('/messageinabottle')} // Redirect to a new webpage
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, color }) {
  return (
    <div className={`badge ${color}`}>
      {typeof icon === 'string' ? <span className="text-xl font-semibold">{icon}</span> : icon}
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