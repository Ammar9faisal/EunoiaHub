import { useState, useEffect } from "react";

export default function TimeCapsule() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");
  const [buried, setBuried] = useState(false);
  const [unlockDate, setUnlockDate] = useState(null);
  const [canOpen, setCanOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const storedCapsule = JSON.parse(localStorage.getItem("timeCapsule"));
    if (storedCapsule) {
      const savedUnlockDate = new Date(storedCapsule.unlockDate);
      setGoals(storedCapsule.goals);
      setUnlockDate(savedUnlockDate);
      setBuried(true);
      updateCountdown(savedUnlockDate);
    }
  }, []);

  useEffect(() => {
    if (unlockDate) {
      const interval = setInterval(() => updateCountdown(unlockDate), 1000);
      return () => clearInterval(interval); 
    }
  }, [unlockDate]);

  const updateCountdown = (date) => {
    const now = new Date();
    const difference = date - now;
    if (difference <= 0) {
      setCanOpen(true);
      setTimeLeft(null);
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
  };

  const addGoal = () => {
    if (input.trim()) {
      setGoals([...goals, input]);
      setInput("");
    }
  };

  const buryCapsule = () => {
    if (goals.length === 0) return;
    
    const unlockTime = new Date();
    unlockTime.setMinutes(unlockTime.getMinutes() + 1); // Set to 1 minute for testing
    
    localStorage.setItem("timeCapsule", JSON.stringify({ goals, unlockDate: unlockTime }));
    
    setUnlockDate(unlockTime);
    setBuried(true);
    updateCountdown(unlockTime);
  };
  

  return (
    <div className="time-capsule-container">
      {!buried ? (
        <>
          <h2 className="time-capsule-title">Create Your Time Capsule</h2>
          <input
            type="text"
            className="time-capsule-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a goal..."
          />
          <button className="time-capsule-button" onClick={addGoal}>Add Goal</button>
          <button className="time-capsule-button" onClick={buryCapsule} disabled={goals.length === 0}>
            Bury Capsule
          </button>
          <ul className="time-capsule-list">
            {goals.map((goal, i) => <li key={i}>{goal}</li>)}
          </ul>
        </>
      ) : (
        <>
          <h2 className="time-capsule-title">Time Capsule Buried!</h2>
          {canOpen ? (
            <div>
              <h3>Your Goals:</h3>
              <ul className="time-capsule-list">
                {goals.map((goal, i) => <li key={i}>{goal}</li>)}
              </ul>
            </div>
          ) : (
            <>
              <p className="time-capsule-message">
                Come back on <strong>{unlockDate.toDateString()}</strong> to open your time capsule!
              </p>
              {timeLeft && (
                <div className="time-capsule-countdown">
                  <p>
                    Unlocks in: <strong>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</strong>
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
