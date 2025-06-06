import backgroundImage from '../assets/Purple.png';
import React, { useState, useEffect } from 'react';
import '../../styles/Survey.css';
import { useNavigate } from 'react-router-dom'; //navigation to another page
import { questions, handleNext, handleBack, handleNumberClick, fetchSurveyResponse, fetchMostRecentWellnessIndex } from '../services/surveyService';
import { account } from '../appwrite';
import Sidebar from '../components/Sidebar.jsx'; // Import the Sidebar component

const Survey = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState(new Array(questions.length).fill(null));
  const [showWarning, setShowWarning] = useState(false); // State to show warning message
  const [userId, setUserId] = useState(null); // State to store the user ID
  const [wellnessIndex, setWellnessIndex] = useState(null); // State to store the wellness index
  const navigate = useNavigate(); //hook to navigate to another page

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        const surveyResponse = await fetchSurveyResponse(user.$id);
        if (surveyResponse) {
          setCurrentPage(8); // If the survey has already been completed, go to the completion page 
        }
      } catch (error) {
        console.error('Error fetching user account or survey response:', error);
        navigate('/login'); // Redirect to login if not logged in
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchWellnessIndex = async () => {
      if (userId) {
        const index = await fetchMostRecentWellnessIndex(userId);
        setWellnessIndex(index);
      }
    };

    fetchWellnessIndex();
  }, [userId]);

  const renderProgressBar = () => {
    return (
      <div className="survey-progress-bar">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`survey-dash ${index + 1 === currentPage ? 'survey-active-dash' : ''}`}
          ></div>
        ))}
      </div>
    );
  };

  const renderScale = () => {  //rendering the scale of 1-10
    return (
      <div className="survey-scale-container">
        <div className="survey-scale-numbers">
          {[...Array(10)].map((_, i) => (
            <div className="survey-number-group" key={i}>
              <div
                className="survey-number"
                style={{
                  backgroundColor: responses[currentPage - 1] === i + 1 ? '#54166e' : '#9c27b0',
                }}
                onClick={() => {
                  handleNumberClick(i + 1, currentPage, responses, setResponses);
                  setShowWarning(false); // Hide warning when a number is selected
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="survey-scale-emojis">
          <div className="survey-number-group"><span className="survey-emoji">😔</span></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"><span className="survey-emoji">😐</span></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"><span className="survey-emoji">😊</span></div>
        </div>
      </div>
    );
  };

  return (  //returning the survey page
    <div className="survey-wrapper">
      <Sidebar />
      <div className="survey-main">
        <div className="survey-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
          {currentPage === 0 ? (
            <div className="survey-container">
              <div className="survey-header-bar">
                <div className="survey-header-text">Check in with yourself!</div>
              </div>
              <div className="survey-intro-text">
                Rate how you’re feeling on a scale of 1 to 10 and track your mental well-being over time.
              </div>
              <div className="survey-emoji-scale">
                <div className="survey-emoji-row">
                  <span className="survey-emoji">😄</span>
                  <span className="survey-emoji">😊</span>
                  <span className="survey-emoji">🙂</span>
                  <span className="survey-emoji">😐</span>
                  <span className="survey-emoji">😕</span>
                  <span className="survey-emoji">😣</span>
                  <span className="survey-emoji">😢</span>
                  <span className="survey-emoji">😭</span>
                </div>
                <div className="survey-gradient-bar"></div>
              </div>
              <button className="survey-next-button" onClick={() => handleNext(0, responses, setResponses, setCurrentPage, navigate, userId)}>Next</button>
            </div>
          ) : currentPage === 8 ? (
            <div className="survey-container">
              <div className="survey-header-bar">
                <div className="survey-header-text">Daily Check-In Completed!</div>
              </div>
              <div className="survey-completion-text">
                {(() => {
                  if (wellnessIndex === null) {
                    return 'Loading your wellness index...';
                  }
                  if (wellnessIndex <= 5) {
                    return `Your average score is ${wellnessIndex.toFixed(2)} today 😔. It’s okay to have tough days, try talking to a friend or some meditation. Take care of yourself, see you tomorrow!`;
                  } else if (wellnessIndex <= 7) {
                    return `Your average score is ${wellnessIndex.toFixed(2)} today 🙂. You’re doing alright—keep going! `;
                  } else {
                    return `Your average score is ${wellnessIndex.toFixed(2)} today 😊. Great job! You’re doing well—keep up the positive vibes! `;
                  }
                })()}
              </div>
              <button className="survey-dashboard-button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            </div>
          ) : (
            <div className="survey-container">
              {renderProgressBar()}
              <div className="survey-header-bar">
                <div className="survey-header-text">Question {currentPage}</div>
              </div>
              <div className="survey-question">{questions[currentPage - 1].text}</div>
              {renderScale()}
              {showWarning && <div className="survey-warning">Please select an answer before proceeding.</div>}
              <button
                className="survey-next-button"
                onClick={() => {
                  if (!responses[currentPage - 1]) {
                    setShowWarning(true);
                  } else {
                    handleNext(currentPage, responses, setResponses, setCurrentPage, navigate, userId);
                  }
                }}
              >
                {currentPage === 7 ? 'Finish' : 'Next'}
              </button>
              {currentPage > 1 && (
                <button className="survey-back-button" onClick={() => handleBack(currentPage, setCurrentPage)}>Back</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Survey;