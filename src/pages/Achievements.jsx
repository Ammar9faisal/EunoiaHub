import React, { useEffect, useState } from 'react';
import './Achievements.css';
import checkinBadge from '../assets/checkinBadge.png';
import visionBadge from '../assets/visionBadge.png'; // import your vision badge image
import { useNavigate } from 'react-router-dom';
import db from '../database.js';
import { account } from '../appwrite';
import { fetchSurveyResponse } from '../services/surveyService';
import { Query } from 'appwrite';

const Achievements = () => {
  const [userId, setUserId] = useState(null);
  const [checkinUnlocked, setCheckinUnlocked] = useState(false);
  const [visionUnlocked, setVisionUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);

        // 1. Check for check-in badge
        const surveyResponse = await fetchSurveyResponse(user.$id);
        setCheckinUnlocked(!!surveyResponse);

        // 2. Check for vision board badge
        const visionEntries = await db.visionboard.list([
          Query.equal('userID', user.$id)
        ]);
        setVisionUnlocked(visionEntries.documents.length > 0);

      } catch (error) {
        console.error('Error fetching achievements:', error);
        navigate('/');
      }
    };

    fetchAchievements();
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="achievements-container">
      <h1 className="achievements-title">My Achievements</h1>
      <div className="badges-section">
        <div className={`badge ${checkinUnlocked ? 'unlocked' : 'locked'}`}>
          <img src={checkinBadge} alt="Check-in Badge" />
          <p>Complete the daily check-in 1 time</p>
        </div>

        <div className={`badge ${visionUnlocked ? 'unlocked' : 'locked'}`}>
          <img src={visionBadge} alt="Vision Badge" />
          <p>Add your first goal to the Vision Board</p>
        </div>
      </div>

      <div className="button-container">
        <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Achievements;