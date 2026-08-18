const ProgressCard = ({ completed, total, progress }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-muted">Today's progress</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">
            {completed}
            <span className="text-lg font-normal text-muted"> / {total} tasks</span>
          </p>
        </div>
        <span className="font-display text-2xl font-semibold text-brand-600">
          {progress}%
        </span>
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-canvas">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted">
        {total === 0
          ? "Add a task today to start tracking progress."
          : progress === 100
          ? "All caught up. Nice work."
          : "Keep going, you're making progress."}
      </p>
    </div>
  );
};

export default ProgressCard;
