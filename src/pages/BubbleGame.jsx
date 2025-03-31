import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/BubbleGame.css";



const BubbleGame = () => {
    const [bubbles, setBubbles] = useState([]);
    const [score, setScore] = useState(0); // Initialize score state
    const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || 0);

    const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => {
      createBubble();
    }, 2000); // New bubble every 2 second

    return () => clearInterval(interval);
  }, []);

  const createBubble = () => {
    const newBubble = {
      id: Math.random(),
      size: Math.floor(Math.random() * 40) + 30, // Random size 30-70px
      left: Math.random() * 90 + "%", // Random horizontal position
      popped: false, // Added 'popped' to each new bubble
    };
    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
        if (!newBubble.popped) removeBubble(newBubble.id); // Remove bubble after 8 sec if not popped
      }, 8000); // Bubble disappears after 8 sec
    };

  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
  };

  const handleBubbleClick = (id) => {
     // Increment the score when a bubble is popped
     setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('bestScore', newScore); // Save the best score to localStorage
        }
        return newScore;
      });

      // Mark the bubble as popped and trigger the pop animation
    setBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === id ? { ...bubble, popped: true } : bubble
        )
      );

    // After pop animation ends, remove the bubble
    setTimeout(() => {
      removeBubble(id);
    }, 200); // Match with the duration of the pop animation (0.5s)
  };
  
  // Handle the back to dashboard button click
  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="bubble-container">
         <div className="bubble-score-container">
        <span>Score: {score}</span>
        <span>Best Score: {bestScore}</span>
      </div>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size + "px",
            height: bubble.size + "px",
            left: bubble.left,
          }}
          onClick={() => handleBubbleClick(bubble.id)} // Trigger pop on click
        />
      ))}


      {/* Add the "Back to Dashboard" button */}
      <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default BubbleGame;