import { useState, useEffect } from "react";
import "./timeCapsule.css";

export default function TimeCapsule() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");
  const [buried, setBuried] = useState(false);
  const [unlockDate, setUnlockDate] = useState(null);
  const [canOpen, setCanOpen] = useState(false);

  useEffect(() => {
    const storedCapsule = JSON.parse(localStorage.getItem("timeCapsule"));
    if (storedCapsule) {
      setGoals(storedCapsule.goals);
      setUnlockDate(new Date(storedCapsule.unlockDate));
      checkUnlockTime(new Date(storedCapsule.unlockDate));
    }
  }, []);

  const checkUnlockTime = (date) => {
    const now = new Date();
    if (now >= date) {
      setCanOpen(true);
    } else {
      setCanOpen(false);
    }
  };

  const addGoal = () => {
    if (input.trim()) {
      setGoals([...goals, input]);
      setInput("");
    }
  };

  const buryCapsule = () => {
    const unlockTime = new Date();
    unlockTime.setDate(unlockTime.getDate() + 30);
    localStorage.setItem("timeCapsule", JSON.stringify({ goals, unlockDate: unlockTime }));
    setUnlockDate(unlockTime);
    setBuried(true);
  };

  return (
    <div className="time-capsule-container">
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
</div>
  );
}