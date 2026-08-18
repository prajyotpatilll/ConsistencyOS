const JobStats = ({ applications = [] }) => {
  const total = applications.length;
  const interviews = applications.filter((a) =>
    ["interview", "final_round"].includes(a.status)
  ).length;
  const offers = applications.filter((a) => a.status === "offer").length;

  const stats = [
    { label: "Applications", value: total },
    { label: "Interviews", value: interviews },
    { label: "Offers", value: offers },
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

export default JobStats;
