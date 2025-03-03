import backgroundImage from '../assets/Purple.png';
import React, { useState, useEffect } from 'react';
import './Survey.css';
import { useNavigate } from 'react-router-dom'; //navigation to another page
import { questions, handleNext, handleBack, handleNumberClick, happinessIndex } from '../services/surveyService';

import { stubData } from '../stubdata';
const completionStatus = stubData.wellnessIndexDaily.isCompleted; // Get the completion status from stubData

// Here's our main Survey component - think of it as the whole happiness survey experience
const Survey = () => {
  // currentPage tracks which screen we’re on: 0 is the intro, 1-7 are questions, 8 is the completion page
  const [currentPage, setCurrentPage] = useState(0);
  // responses stores the user’s answers as an object, like {1: 5, 2: 3}
  const [responses, setResponses] = useState({});
  const [showWarning, setShowWarning] = useState(false); // State to show warning message
  const navigate = useNavigate(); //hook to navigate to another page

  // Renders the progress bar at the top - shows which question we’re on
  const renderProgressBar = () => {
    return (
      <div className="survey-progress-bar">
        {/* Create 7 dashes, one for each question */}
        {[...Array(7)].map((_, index) => (
          // Highlight the dash for the current page with 'active-dash'
          <div
            key={index}
            className={`survey-dash ${index + 1 === currentPage ? 'survey-active-dash' : ''}`}
          ></div>
        ))}
      </div>
    );
  };

  // Renders the 1-10 scale with numbers and emojis for rating
  const renderScale = () => {
    return (
      <div className="survey-scale-container">

        <div className="survey-scale-numbers">
          {/* Loop to create 10 clickable number buttons */}
          {[...Array(10)].map((_, i) => (
            <div className="survey-number-group" key={i}>
              <div
                className="survey-number"
                // Highlight the selected number by changing its background color
                style={{
                  backgroundColor: responses[currentPage] === i + 1 ? '#54166e' : '#9c27b0',
                }}
                onClick={() => {
                  handleNumberClick(i + 1, currentPage, responses, setResponses);
                  setShowWarning(false); // Hide warning when a number is selected
                }} // Save the rating when clicked
              >
                {i + 1} {/* Display numbers 1-10 */}
              </div>
            </div>
          ))}
        </div>

        {/* Emojis below the scale to give a visual cue */}
        <div className="survey-scale-emojis">
          <div className="survey-number-group"><span className="survey-emoji">😔</span></div> {/* </div>Sad at 1 */}
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"><span className="survey-emoji">😐</span></div> {/* Neutral at 5 */}
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"></div>
          <div className="survey-number-group"><span className="survey-emoji">😊</span></div> {/* Happy at 10 */}
        </div>
      </div>
    );
  };

  // The main rendering logic - decides what to show based on currentPage
  return (
    // Set the background image for the whole survey using our imported image
    <div className="survey-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Intro page (currentPage === 0) */}
      {currentPage === 0 ? (
        <div className="survey-container">
          <div className="survey-header-bar">
            <div className="survey-header-text">Check in with yourself!</div> {/* Big welcoming title */}
          </div>
          <div className="survey-intro-text">
            Rate how you’re feeling on a scale of 1 to 10 and track your mental well-being over time.
          </div>

          {/* Show some emojis and a gradient bar to set the mood */}
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
            <div className="survey-gradient-bar"></div> {/* Fancy color gradient */}
          </div>

          <button className="survey-next-button" onClick={() => handleNext(0, responses, setResponses, setCurrentPage, navigate)}>Next</button> {/* Start the survey */}
        </div>
      ) : currentPage === 8 ? (
        // Completion page (currentPage === 8)

        stubData.wellnessIndexDaily.isCompleted = true,

        <div className="survey-container">
          <div className="survey-header-bar">
            <div className="survey-header-text">Daily Check-In Completed!</div> {/* Completion message */}
          </div>

          <div className="survey-completion-text">
          {(() => {
              stubData.wellnessIndexDaily.isCompleted = true;
              const average = happinessIndex(responses).toFixed(1); // Use happinessIndex from surveyService
              if (average <= 5) {
                return `Your average score is ${average} today 😔. It’s okay to have tough days, try talking to a friend or some meditation. Take care of yourself, see you tomoroow!`;
              } else if (average <= 7) {
                return `Your average score is ${average} today 🙂. You’re doing alright—keep going! `;
              } else {
                return `Your average score is ${average} today 😊. Great job! You’re doing well—keep up the positive vibes! `;
              }
            })()}   
            </div>

          <button className="survey-dashboard-button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button> {/* Button to navigate to dashboard */}
        </div>
      ) : (
        // Question pages (currentPage 1-7)
        <div className="survey-container">
          {renderProgressBar()} {/* Show progress at the top */}
          <div className="survey-header-bar">
            <div className="survey-header-text">Question {currentPage}</div> {/* Display current question number */}
          </div>
          <div className="survey-question">{questions[currentPage - 1].text}</div> {/* Show the question text */}
          {renderScale()} {/* Show the rating scale */}
          {showWarning && <div className="survey-warning">Please select an answer before proceeding.</div>} {/* Show warning if no answer is selected */}
          {/* Next button changes to "Finish" on the last page */}
          <button
            className="survey-next-button"
            onClick={() => {
              if (!responses[currentPage]) {
                setShowWarning(true); // Show warning if no response is selected
              } else {
                handleNext(currentPage, responses, setResponses, setCurrentPage, navigate);
              }
            }}
          >
            {currentPage === 7 ? 'Finish' : 'Next'}
          </button>
          {/* Back button appears starting from page 2 */}
          {currentPage > 1 && (
            <button className="survey-back-button" onClick={() => handleBack(currentPage, setCurrentPage)}>Back</button>
          )}
        </div>
      )}
    </div>
  );
};

// Export the Survey component so we can use it in App.jsx
export default Survey;