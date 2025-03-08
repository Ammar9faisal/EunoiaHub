import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visionboard.css";

export default function VisionBoard() {
  const navigate = useNavigate();
  
  // Load saved vision board items from local storage
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("visionBoard")) || [];
  });

  const [newNote, setNewNote] = useState("");

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("visionBoard", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="visionboard-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
      <h1>My Vision Board</h1>
      
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your goal..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Add Goal</button>
      </div>

      <div className="grid-container">
        {notes.map((note, index) => (
          <div key={index} className="sticky-note">
            <p>{note}</p>
            <button className="delete-btn" onClick={() => deleteNote(index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
