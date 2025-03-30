import React, { useState, useEffect } from 'react';
import stubDatabase from '../stubDatabase';
import HabitCard from '../components/HabitCard';
import { Sidebar } from '../components/Sidebar.jsx';
import './HabitTracker.css';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // ✅ Fetch once on mount & filter unique IDs
  useEffect(() => {
    const allHabits = stubDatabase.getCollection('habitLogs') || [];

    // Remove duplicates by ID (just in case)
    const uniqueHabits = Array.from(
      new Map(allHabits.map((habit) => [habit.$id, habit])).values()
    );

    setHabits(uniqueHabits);
  }, []);

  // ✅ Add habit only if name is new
  const handleAddHabit = () => {
    const trimmedName = newHabit.trim();
    if (!trimmedName) return;

    // Prevent duplicates based on name
    const exists = habits.some(
      (habit) => habit.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) return;

    const habit = {
      $id: Date.now().toString(),
      userId: 'user123',
      name: trimmedName,
      logs: {}
    };

    stubDatabase.createDocument('db', 'habitLogs', habit.$id, habit, []);
    setHabits((prev) => [...prev, habit]);
    setNewHabit('');
  };

  // ✅ Update log for a specific day
  const updateLog = (habitId, date, status) => {
    const updated = habits.map((habit) => {
      if (habit.$id === habitId) {
        const logs = { ...habit.logs, [date]: status };
        stubDatabase.updateDocument('db', 'habitLogs', habitId, { logs }, []);
        return { ...habit, logs };
      }
      return habit;
    });
    setHabits(updated);
  };

  return (
    <div className="habit-page">
      <Sidebar />

      <div className="habit-container">
        <h1 className="habit-title">Habit Tracker</h1>
        <p className="habit-description">
          Track your daily progress and stay consistent with your goals.
        </p>

        <div className="habit-input-section">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
            className="habit-input"
          />
          <button onClick={handleAddHabit} className="habit-add-button">
            Add
          </button>
        </div>

        <div>
          {habits.map((habit) => (
            <HabitCard key={habit.$id} habit={habit} updateLog={updateLog} />
          ))}
        </div>+
      </div>
    </div>
  );
};

export default HabitTracker;
