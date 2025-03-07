import React, { useState, useEffect } from "react";
import "./BubbleGame.css";

const BubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      createBubble();
    }, 1000); // New bubble every second

    return () => clearInterval(interval);
  }, []);

  const createBubble = () => {
    const newBubble = {
      id: Math.random(),
      size: Math.floor(Math.random() * 40) + 30, // Random size 30-70px
      left: Math.random() * 90 + "%", // Random horizontal position
    };
    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      removeBubble(newBubble.id);
    }, 5000); // Bubble disappears after 5 sec if not popped
  };

  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
  };

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size + "px",
            height: bubble.size + "px",
            left: bubble.left,
          }}
          onClick={() => removeBubble(bubble.id)}
        />
      ))}
    </div>
  );
};

export default BubbleGame;
