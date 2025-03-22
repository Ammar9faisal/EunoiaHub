import { useState, useEffect } from "react";
import waveBackground from "../assets/waves.png"; 
import bottleImage from "../assets/bottle.png"; 
import "./MessageBottle.css";

export default function MessageInABottle() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const [unlockDate, setUnlockDate] = useState(null);
  const [canOpen, setCanOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [opened, setOpened] = useState(false); 

  useEffect(() => {
    const storedBottle = JSON.parse(localStorage.getItem("messageBottle"));
    if (storedBottle) {
      const savedUnlockDate = new Date(storedBottle.unlockDate);
      setMessages(storedBottle.messages);
      setUnlockDate(savedUnlockDate);
      setSent(true);
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

  const addMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  const sendBottle = () => {
    if (messages.length === 0) return;

    const unlockTime = new Date();
    unlockTime.setMinutes(unlockTime.getMinutes() + 1); // Set to 1 minute for testing

    localStorage.setItem("messageBottle", JSON.stringify({ messages, unlockDate: unlockTime }));

    setUnlockDate(unlockTime);
    setSent(true);
    updateCountdown(unlockTime);
  };

  const openBottle = () => {
    setOpened(true); // When user clicks on the bottle, messages will be revealed
  };

  return (
    <div
      className="message-bottle-container"
      style={{
        backgroundImage: `url(${waveBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {!sent ? (
        <>
          <h2 className="message-bottle-title">Send a Message in a Bottle</h2>
          <input
            type="text"
            className="message-bottle-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your message..."
          />
          <button className="message-bottle-button" onClick={addMessage}>Add Message</button>
          <button className="message-bottle-button" onClick={sendBottle} disabled={messages.length === 0}>
            Send Bottle
          </button>
          <ul className="message-bottle-list">
            {messages.map((message, i) => <li key={i}>{message}</li>)}
          </ul>
        </>
      ) : (
        <>
          <h2 className="message-bottle-title">Your Bottle Has Been Sent!</h2>
          {canOpen && !opened ? (
            <>
              <p className="message-bottle-message">
                Your bottle has arrived! Click below to open it and retrieve your messages.
              </p>
              <button onClick={openBottle} className="message-bottle-open-button">
                <img src={bottleImage} alt="Bottle" className="bottle-image" />
              </button>
            </>
          ) : opened ? (
            <div>
              <h3>Messages Retrieved from the Bottle:</h3>
              <ul className="message-bottle-list">
                {messages.map((message, i) => <li key={i}>{message}</li>)}
              </ul>
            </div>
          ) : (
            <>
              <p className="message-bottle-message">
                Your bottle will wash ashore on <strong>{unlockDate.toDateString()}</strong>! Come back then to read your messages.
              </p>
              {timeLeft && (
                <div className="message-bottle-countdown">
                  <p>
                    Your bottle arrives in: <strong>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</strong>
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
