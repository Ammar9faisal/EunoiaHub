import React from 'react';
import dayjs from 'dayjs';
import './HabitCard.css';

const today = dayjs();
const week = [...Array(7)].map((_, i) =>
  today.subtract(6 - i, 'day').format('YYYY-MM-DD')
);

const HabitCard = ({ habit, updateLog }) => {
  return (
    <div className="habit-card">
      <h2 className="habit-name">{habit.name}</h2>
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
