import React, { useEffect, useState } from 'react';
import '../../styles/Achievements.css';
import checkinBadge from '../assets/checkinBadge.png';
import visionBadge from '../assets/visionBadge.png';
import exerciseBadge from '../assets/exerciseBadge.png';
import reviewBadge from '../assets/reviewBadge.png';
import backgroundImage from '../assets/Purple Background.png';
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
  const [exerciseUnlocked, setExerciseUnlocked] = useState(false);
  const [reviewUnlocked, setReviewUnlocked] = useState(false);
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

        const userDoc = await db.users.get(user.$id);
        setExerciseUnlocked(userDoc.exerciseBadgeUnlocked === true);
        setReviewUnlocked(userDoc.reviewBadgeUnlocked === true);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="achievements-page">
      <Sidebar />
      <div
        className="achievements-container"
        style={{
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: 'cover'
        }}
      >
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

          <div className={`badge ${exerciseUnlocked ? 'unlocked' : 'locked'}`}>
            <img src={exerciseBadge} alt="Exercise Badge" />
            <p>Explore the Daily Exercises</p>
          </div>

          <div className={`badge ${reviewUnlocked ? 'unlocked' : 'locked'}`}>
            <img src={reviewBadge} alt="Review Badge" />
            <p>Submit your first review</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;