function StreakBadge({ streakCount }) {
  if (streakCount === 0) {
    return (
      <div className="streak-badge">
        <p>No streak yet. Start your journey today!</p>
      </div>
    );
  }

  return (
    <div className="streak-badge">
      <span role="img" aria-label="fire">🔥</span>
      <p>{streakCount}-Day Streak!</p>
    </div>
  );
}

export default StreakBadge;