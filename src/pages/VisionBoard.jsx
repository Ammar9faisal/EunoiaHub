import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visionboard.css";

export default function VisionBoard() {
  const navigate = useNavigate();

  // Load saved vision board items and images from local storage
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("visionBoard")) || [];
  });

  const [newNote, setNewNote] = useState("");
  const [images, setImages] = useState(() => {
    return JSON.parse(localStorage.getItem("visionBoardImages")) || [];
  });

  // Save notes and images to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("visionBoard", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("visionBoardImages", JSON.stringify(images));
  }, [images]);

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

  // Image uploading (handling multiple images)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        compressImage(reader.result, file.type, (compressedData) => {
          setImages((prevImages) => [...prevImages, compressedData]); // Store the compressed image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Compress the image before saving (better quality, preserve PNG if necessary)
  const compressImage = (base64Str, fileType, callback) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set max width/height to avoid oversized images
      const maxSize = 500; // Increase size slightly for better clarity
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Preserve PNG format if applicable
      const format = fileType.includes("png") ? "image/png" : "image/jpeg";
      const quality = fileType.includes("png") ? 1.0 : 0.9; // PNG = lossless, JPEG = 90%

      const compressedData = canvas.toDataURL(format, quality);
      callback(compressedData);
    };
  };

  // Remove a specific uploaded image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

      {/* Image Upload Section */}
      <div className="image-upload-container">
        <label htmlFor="file-input" className="custom-file-upload">
          <span id="upload-text">Upload an Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="file-input"
          />
        </label>
      </div>

      {/* Display Multiple Uploaded Images with Remove Buttons */}
      <div className="visionboard-images-grid">
        {images.map((img, index) => (
          <div key={index} className="visionboard-image-container">
            <img src={img} alt={`Uploaded ${index}`} className="visionboard-image" />
            <button className="remove-image-btn" onClick={() => removeImage(index)}>
              Remove Image
            </button>
          </div>
        ))}
      </div>

      <div className="grid-container">
        {notes.map((note, index) => (
          <div key={index} className="sticky-note">
            <p>{note}</p>
            <button className="delete-btn" onClick={() => deleteNote(index)}>✔</button>
          </div>
        ))}
      </div>
    </div>
  );
}