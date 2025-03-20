import React, { useEffect, useState } from 'react';
import './Achievements.css';
import checkinBadge from '../assets/checkinBadge.png';
import { useNavigate } from 'react-router-dom';
import db from '../database.js';
import { account } from '../appwrite';
import { fetchSurveyResponse } from '../services/surveyService'; // Import fetchSurveyResponse

const Achievements = () => {
  const [userId, setUserId] = useState(null);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndSurvey = async () => {
      try {
        // Fetch the logged-in user
        const user = await account.get();
        setUserId(user.$id);

        // Check if the user has completed a survey for today
        const surveyResponse = await fetchSurveyResponse(user.$id);
        setBadgeUnlocked(!!surveyResponse); // Set badgeUnlocked to true if a survey response exists
      } catch (error) {
        console.error('Error fetching user account or survey response:', error);
        navigate('/');
      }
    };

    fetchUserAndSurvey();
  }, [navigate]);

  return (
    <div className="achievements-container">
      <h1 className="achievements-title">My Achievements</h1>
      <div className="badges-section">
        <div className={`badge ${badgeUnlocked ? 'unlocked' : 'locked'}`}>
          <img src={checkinBadge} alt="Check-in Badge" />
          <p>Complete the daily check-in 1 time</p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;