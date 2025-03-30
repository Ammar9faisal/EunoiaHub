import React, { useState, useEffect } from 'react';
import stubDatabase from '../stubDatabase';
import HabitCard from '../components/HabitCard';
import { Sidebar } from '../components/Sidebar.jsx';
import './HabitTracker.css';

const WEEK_DAYS = 7;

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load habits on mount
  useEffect(() => {
    const allHabits = stubDatabase.getCollection('habitLogs') || [];
    const uniqueHabits = Array.from(new Map(allHabits.map(h => [h.$id, h])).values());
    setHabits(uniqueHabits);
  }, []);

  // Add new habit
  const handleAddHabit = () => {
    const trimmed = newHabit.trim();
    if (!trimmed) return;

    const exists = habits.some(h => h.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return;

    const habit = {
      $id: Date.now().toString(),
      userId: 'user123',
      name: trimmed,
      logs: {}
    };
    stubDatabase.createDocument('db', 'habitLogs', habit.$id, habit, []);
    setHabits(prev => [...prev, habit]);
    setNewHabit('');
  };

  // Update habit log
  const updateLog = (habitId, date, status) => {
    const updated = habits.map(habit => {
      if (habit.$id === habitId) {
        const logs = { ...habit.logs, [date]: status };
        stubDatabase.updateDocument('db', 'habitLogs', habitId, { logs }, []);
        return { ...habit, logs };
      }
      return habit;
    });
    setHabits(updated);
  };

  // Delete habit
  const deleteHabit = (habitId) => {
    stubDatabase.deleteDocument('db', 'habitLogs', habitId);
    setHabits(habits.filter(h => h.$id !== habitId));
  };

  const isResetEnabled = () => {
    return habits.every(habit => {
      const logValues = Object.values(habit.logs || {});
      return logValues.length === WEEK_DAYS && logValues.every(val => ['yes', 'no', 'skip'].includes(val));
    });
  };

  const handleReset = () => {
    if (!isResetEnabled()) {
      setErrorMessage('⚠️ Cannot reset: Each habit must have a log for all 7 days.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const resetHabits = habits.map(habit => {
      const cleared = { ...habit, logs: {} };
      stubDatabase.updateDocument('db', 'habitLogs', habit.$id, { logs: {} }, []);
      return cleared;
    });
    setHabits(resetHabits);
    setErrorMessage('');
  };

  return (
    <div className="habit-page">
      <Sidebar />

      <div className="habit-container">
        <h1 className="habit-title">Weekly Habit Tracker</h1>
        <p className="habit-description">
          Track your daily progress and stay consistent with your goals.
        </p>

        <div className="habit-instructions-box">
          <strong>How It Works:</strong>
          <ul>
            <li>✅ First click: <strong>Done</strong> — You completed the habit</li>
            <li>❌ Second click: <strong>Not Done</strong> — You didn’t complete it</li>
            <li>➖ Third click: <strong>Skipped</strong> — You intentionally skipped or it didn’t apply</li>
          </ul>
          <p>Your logs are saved automatically and persist until you reset the week.</p>
        </div>

        <div className="habit-controls">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
            className="habit-input"
          />
          <button onClick={handleAddHabit} className="habit-add-button">Add</button>

          <div className="tooltip-wrapper">
            <button
              onClick={handleReset}
              className={`habit-reset-button ${isResetEnabled() ? '' : 'disabled'}`}
              disabled={!isResetEnabled()}
            >
              Reset for New Week
            </button>
            {!isResetEnabled() && (
              <span className="tooltip-text">⚠ Complete logs for all habits before resetting</span>
            )}
          </div>
        </div>

        {errorMessage && <p className="habit-error-message">{errorMessage}</p>}

        <div>
          {habits.map((habit) => (
            <HabitCard
              key={habit.$id}
              habit={habit}
              updateLog={updateLog}
              deleteHabit={deleteHabit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
