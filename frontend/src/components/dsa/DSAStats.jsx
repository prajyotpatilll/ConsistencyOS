const DSAStats = ({ today, thisWeek, total }) => {
  const stats = [
    { label: "Today", value: today },
    { label: "This week", value: thisWeek },
    { label: "Total", value: total },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-surface p-4 text-center shadow-card"
        >
          <p className="font-display text-2xl font-semibold text-ink">
            {stat.value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DSAStats;
