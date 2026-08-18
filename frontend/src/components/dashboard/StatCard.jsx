const colorMap = {
  brand: "bg-brand-50 text-brand-600",
  teal: "bg-accent-teal/10 text-accent-teal",
  amber: "bg-accent-amber/10 text-accent-amber",
  violet: "bg-accent-violet/10 text-accent-violet",
};

const StatCard = ({ icon: Icon, label, value, sublabel, color = "brand" }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[color]}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </div>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-ink">
        {value}
      </p>
      {sublabel && <p className="mt-0.5 text-xs text-muted">{sublabel}</p>}
    </div>
  );
};

export default StatCard;
