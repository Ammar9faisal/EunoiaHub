<<<<<<< HEAD
=======
import React, { useEffect, useState } from 'react';
import './Achievements.css';
import checkinBadge from '../assets/checkinBadge.png';
import visionBadge from '../assets/visionBadge.png';
import { useNavigate } from 'react-router-dom';
import db from '../database.js';
import { account } from '../appwrite';
import { fetchSurveyResponse } from '../services/surveyService';
import { Query } from 'appwrite';
import Sidebar from '../components/Sidebar';

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

        const surveyResponse = await fetchSurveyResponse(user.$id);
        setCheckinUnlocked(!!surveyResponse);

        const visionEntries = await db.visionboard.list([
          Query.equal('userID', user.$id),
        ]);
        setVisionUnlocked(visionEntries.documents.length > 0);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        navigate('/');
      }
    };

    fetchAchievements();
  }, [navigate]);

  return (
    <div className="achievements-page">
      <Sidebar />

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
      </div>
    </div>
  );
};

export default Achievements;
>>>>>>> 1c1b18e (Added sidebar onto Achievements page)
