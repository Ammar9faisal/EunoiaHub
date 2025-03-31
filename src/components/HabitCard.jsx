import React from 'react';
import dayjs from 'dayjs';
import './HabitCard.css';

const today = dayjs();
const week = [...Array(7)].map((_, i) =>
  today.subtract(6 - i, 'day').format('YYYY-MM-DD')
);
const dayLabels = [...Array(7)].map((_, i) =>
  today.subtract(6 - i, 'day').format('ddd')
);

const HabitCard = ({ habit, updateLog, deleteHabit }) => {
  return (
    <div className="habit-card">
      <div className="habit-header">
        <h2 className="habit-name">{habit.name}</h2>
        <button className="habit-delete-button" onClick={() => deleteHabit(habit.$id)}>
          Delete Habit
        </button>
      </div>

      <div className="habit-day-labels">
        {dayLabels.map((label, idx) => (
          <div key={idx} className="habit-day-label">
            {label}
          </div>
        ))}
      </div>

      <div className="habit-grid">
        {week.map((date) => {
          const status = habit.logs[date] || '';
          return (
            <button
              key={date}
              onClick={() => {
                const next =
                  status === 'yes'
                    ? 'no'
                    : status === 'no'
                    ? 'skip'
                    : 'yes';
                updateLog(habit.$id, date, next);
              }}
              className={`habit-day-btn ${
                status === 'yes'
                  ? 'habit-day-yes'
                  : status === 'no'
                  ? 'habit-day-no'
                  : status === 'skip'
                  ? 'habit-day-skip'
                  : 'habit-day-empty'
              }`}
              title={date}
            >
              {status === 'yes'
                ? '✔'
                : status === 'no'
                ? '✖'
                : status === 'skip'
                ? '-'
                : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HabitCard;