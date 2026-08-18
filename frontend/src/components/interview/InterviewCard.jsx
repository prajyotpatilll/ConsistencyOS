import { Pencil, Trash2, Clock } from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const InterviewCard = ({ session, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="rounded-full bg-accent-violet/10 px-2 py-0.5 text-xs font-medium text-accent-violet">
            {session.category}
          </span>
          <p className="mt-1.5 truncate text-sm font-semibold text-ink">
            {session.topic}
          </p>
          {session.subTopic && (
            <p className="truncate text-sm text-muted">{session.subTopic}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(session)}
            aria-label="Edit preparation"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(session)}
            aria-label="Delete preparation"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-coral/10 hover:text-accent-coral"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {session.notes && (
        <p className="mt-3 line-clamp-2 text-sm text-muted">{session.notes}</p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {session.duration} min
        </span>
        <span>{formatDate(session.preparedAt)}</span>
      </div>
    </div>
  );
};

export default InterviewCard;
