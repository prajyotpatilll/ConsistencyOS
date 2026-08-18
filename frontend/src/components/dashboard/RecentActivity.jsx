import { Code2, Briefcase, GraduationCap, CheckSquare, Sparkles } from "lucide-react";

const iconMap = {
  dsa: { icon: Code2, color: "text-accent-teal bg-accent-teal/10" },
  job: { icon: Briefcase, color: "text-accent-amber bg-accent-amber/10" },
  interview: { icon: GraduationCap, color: "text-accent-violet bg-accent-violet/10" },
  task: { icon: CheckSquare, color: "text-brand-600 bg-brand-50" },
};

const timeAgo = (date) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const RecentActivity = ({ activity = [] }) => {
  if (activity.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h3 className="font-display text-sm font-semibold text-ink">
          Recent activity
        </h3>
        <div className="mt-6 flex flex-col items-center gap-2 py-6 text-center">
          <Sparkles className="h-5 w-5 text-muted" strokeWidth={1.75} />
          <p className="text-sm text-muted">
            Nothing yet. Log an activity to see it show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h3 className="font-display text-sm font-semibold text-ink">
        Recent activity
      </h3>
      <ul className="mt-4 space-y-1">
        {activity.map((item, idx) => {
          const cfg = iconMap[item.type] || iconMap.task;
          const Icon = cfg.icon;
          return (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-xl px-1.5 py-2.5"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.color}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <p className="flex-1 truncate text-sm text-ink">
                {item.message}
              </p>
              <span className="shrink-0 text-xs text-muted">
                {timeAgo(item.date)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivity;
