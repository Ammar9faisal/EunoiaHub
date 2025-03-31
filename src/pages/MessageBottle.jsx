import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import bottleImage from "../assets/bottle.png";
import "../../styles/MessageBottle.css";

export default function MessageInABottle() {
  const [state, setState] = useState({
    messages: [],
    input: "",
    unlockDate: null,
    sent: false,
    opened: false,
  });

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const storedBottle = JSON.parse(localStorage.getItem("messageBottle"));
    if (storedBottle) {
      const savedUnlockDate = new Date(storedBottle.unlockDate);
      setState((prevState) => ({
        ...prevState,
        messages: storedBottle.messages,
        unlockDate: savedUnlockDate,
        sent: true,
      }));
      updateCountdown(savedUnlockDate);
    }
  }, []);

  useEffect(() => {
    if (state.unlockDate) {
      const interval = setInterval(() => {
        updateCountdown(state.unlockDate);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.unlockDate]);

  const updateCountdown = (date) => {
    const now = new Date();
    const diff = date - now;
    if (diff <= 0) {
      setTimeLeft(null);
    } else {
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
  };

  const addMessage = () => {
    if (!state.input.trim()) return;
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, state.input.trim()],
      input: "",
    }));
  };

  const sendBottle = () => {
    if (state.messages.length === 0) return;

    const unlockTime = new Date();
    unlockTime.setDate(unlockTime.getDate() + 30);

    localStorage.setItem("messageBottle", JSON.stringify({
      messages: state.messages,
      unlockDate: unlockTime,
    }));
    setState((prevState) => ({ ...prevState, unlockDate: unlockTime, sent: true }));
    updateCountdown(unlockTime);
  };

  const openBottle = () => setState((prevState) => ({ ...prevState, opened: true }));

  const resetBottle = () => {
    localStorage.removeItem("messageBottle");
    setState({ messages: [], input: "", unlockDate: null, sent: false, opened: false });
  };

  return (
    <div className="message-bottle-page">
      <Sidebar />
      <div className="message-bottle-container">
        {!state.sent ? (
          <>
            <h2 className="message-bottle-title">Send a Message in a Bottle</h2>
            <p className="message-bottle-prompt">What are your plans for this month and what would you like to accomplish?</p>
            <input
              type="text"
              className="message-bottle-input"
              value={state.input}
              onChange={(e) => setState((prevState) => ({ ...prevState, input: e.target.value }))}
              placeholder="Write your message..."
            />
            <button className="message-bottle-button" onClick={addMessage} disabled={!state.input.trim()}>
              Add Message
            </button>
            <button className="message-bottle-button" onClick={sendBottle} disabled={state.messages.length === 0}>
              Send Bottle
            </button>
            <ul className="message-bottle-list">
              {state.messages.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
          </>
        ) : (
          <>
            <h2 className="message-bottle-title">Your Bottle Has Been Sent!</h2>
            {state.opened ? (
              <div>
                <h3>Messages Retrieved from the Bottle:</h3>
                <ul className="message-bottle-list">
                  {state.messages.map((msg, i) => <li key={i}>{msg}</li>)}
                </ul>
                <button className="message-bottle-button" onClick={resetBottle}>Make Another Message</button>
              </div>
            ) : timeLeft ? (
              <>
                <p className="message-bottle-message">
                  Your bottle will wash ashore on <strong>{state.unlockDate.toDateString()}</strong>!
                </p>
                <p className="message-bottle-countdown">
                  Arrives in: <strong>
                    {timeLeft.days} {timeLeft.days === 1 ? "day" : "days"},
                    {timeLeft.hours} {timeLeft.hours === 1 ? "hour" : "hours"},
                    {timeLeft.minutes} {timeLeft.minutes === 1 ? "minute" : "minutes"},
                    {timeLeft.seconds} {timeLeft.seconds === 1 ? "second" : "seconds"}
                  </strong>
                </p>
              </>
            ) : (
              <>
                <p className="message-bottle-message">Your bottle has arrived! Click below to open it.</p>
                <button onClick={openBottle} className="message-bottle-open-button">
                  <img src={bottleImage} alt="Bottle" className="bottle-image" />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

