import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visionboard.css";
import { fetchUserAndVisionBoard, addNote, deleteNote } from '../services/visionBoardService';

export default function VisionBoard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);  //array of notes
  const [newNote, setNewNote] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {   //fetching the user and vision board
    fetchUserAndVisionBoard(setUserId, setNotes);
  }, []);

  const handleAddNote = () => {  //adding a note
    addNote(userId, newNote, notes, setNotes, setNewNote);
  };

  const handleDeleteNote = (index) => {  //deleting a note
    deleteNote(index, notes, setNotes, userId);
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
        <button onClick={handleAddNote}>Add Goal</button>
      </div>

      <div className="grid-container">
        {notes.map((note, index) => (
          <div key={index} className="sticky-note">
            <p>{note}</p>
            <button className="delete-btn" onClick={() => handleDeleteNote(index)}>✔</button>
          </div>
        ))}
      </div>
    </div>
  );
}