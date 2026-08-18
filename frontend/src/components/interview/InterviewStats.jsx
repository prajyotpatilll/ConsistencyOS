const InterviewStats = ({ minutesToday, sessionsToday }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <p className="text-sm font-medium text-muted">Today's preparation</p>
      <p className="mt-1 font-display text-3xl font-semibold text-ink">
        {minutesToday} <span className="text-lg font-normal text-muted">min</span>
      </p>
      <p className="mt-1 text-xs text-muted">
        {sessionsToday} {sessionsToday === 1 ? "session" : "sessions"} logged today
      </p>
    </div>
  );
};

export default InterviewStats;
