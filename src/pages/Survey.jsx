import backgroundImage from '../assets/Purple.png';
import React, { useState, useEffect } from 'react';
import './Survey.css';
import { useNavigate } from 'react-router-dom'; //navigation to another page
import { questions, handleNext, handleBack, handleNumberClick } from '../services/surveyService';

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
      <div className="progress-bar">
        {/* Create 7 dashes, one for each question */}
        {[...Array(7)].map((_, index) => (
          // Highlight the dash for the current page with 'active-dash'
          <div
            key={index}
            className={`dash ${index + 1 === currentPage ? 'active-dash' : ''}`}
          ></div>
        ))}
      </div>
    );
  };

  // Renders the 1-10 scale with numbers and emojis for rating
  const renderScale = () => {
    return (
      <div className="scale-container">

        <div className="scale-numbers">
          {/* Loop to create 10 clickable number buttons */}
          {[...Array(10)].map((_, i) => (
            <div className="number-group" key={i}>
              <div
                className="number"
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
        <div className="scale-emojis">
          <div className="number-group"><span className="emoji">😔</span></div> {/* </div>Sad at 1 */}
          <div className="number-group"></div>
          <div className="number-group"></div>
          <div className="number-group"></div>
          <div className="number-group"><span className="emoji">😐</span></div> {/* Neutral at 5 */}
          <div className="number-group"></div>
          <div className="number-group"></div>
          <div className="number-group"></div>
          <div className="number-group"></div>
          <div className="number-group"><span className="emoji">😊</span></div> {/* Happy at 10 */}
        </div>
      </div>
    );
  };

  // The main rendering logic - decides what to show based on currentPage
  return (
    // Set the background image for the whole survey using our imported image
    <div className="body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Intro page (currentPage === 0) */}
      {currentPage === 0 ? (
        <div className="container">
          <div className="header-bar">
            <div className="header-text">Check in with yourself!</div> {/* Big welcoming title */}
          </div>
          <div className="intro-text">
            Rate how you’re feeling on a scale of 1 to 10 and track your mental well-being over time.
          </div>

          {/* Show some emojis and a gradient bar to set the mood */}
          <div className="emoji-scale">
            <div className="emoji-row">
              <span className="emoji">😄</span>
              <span className="emoji">😊</span>
              <span className="emoji">🙂</span>
              <span className="emoji">😐</span>
              <span className="emoji">😕</span>
              <span className="emoji">😣</span>
              <span className="emoji">😢</span>
              <span className="emoji">😭</span>
            </div>
            <div className="gradient-bar"></div> {/* Fancy color gradient */}
          </div>

          <button className="next-button" onClick={() => handleNext(0, responses, setResponses, setCurrentPage, navigate)}>Next</button> {/* Start the survey */}
        </div>
      ) : currentPage === 8 ? (
        // Completion page (currentPage === 8)

        stubData.wellnessIndexDaily.isCompleted = true,

        <div className="container">
          <div className="header-bar">
            <div className="header-text">Daily Check-In Completed!</div> {/* Completion message */}
          </div>

          <div className="completion-text">
            Thank you for completing your daily check-in. Your responses have been recorded.
          </div>

          <button className="dashboard-button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button> {/* Button to navigate to dashboard */}
        </div>
      ) : (
        // Question pages (currentPage 1-7)
        <div className="container">
          {renderProgressBar()} {/* Show progress at the top */}
          <div className="header-bar">
            <div className="header-text">Question {currentPage}</div> {/* Display current question number */}
          </div>
          <div className="question">{questions[currentPage - 1].text}</div> {/* Show the question text */}
          {renderScale()} {/* Show the rating scale */}
          {showWarning && <div className="warning">Please select an answer before proceeding.</div>} {/* Show warning if no answer is selected */}
          {/* Next button changes to "Finish" on the last page */}
          <button
            className="next-button"
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
            <button className="back-button" onClick={() => handleBack(currentPage, setCurrentPage)}>Back</button>
          )}
        </div>
      )}
    </div>
  );
};

// Export the Survey component so we can use it in App.jsx
export default Survey;