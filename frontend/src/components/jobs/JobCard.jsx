import { Pencil, Trash2, MapPin } from "lucide-react";

const statusStyles = {
  applied: "bg-brand-50 text-brand-700",
  oa: "bg-accent-violet/10 text-accent-violet",
  interview: "bg-accent-amber/10 text-accent-amber",
  final_round: "bg-accent-amber/10 text-accent-amber",
  offer: "bg-accent-teal/10 text-accent-teal",
  rejected: "bg-accent-coral/10 text-accent-coral",
  withdrawn: "bg-canvas text-muted",
};

const statusLabels = {
  applied: "Applied",
  oa: "Online Assessment",
  interview: "Interview",
  final_round: "Final Round",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {job.companyName}
          </p>
          <p className="truncate text-sm text-muted">{job.position}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[job.status]}`}
        >
          {statusLabels[job.status]}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>{job.platform}</span>
        {job.location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {job.location}
          </span>
        )}
        <span>Applied {formatDate(job.appliedAt)}</span>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 border-t border-border pt-3">
        <button
          onClick={() => onEdit(job)}
          aria-label="Edit application"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <Pencil className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          onClick={() => onDelete(job)}
          aria-label="Delete application"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-coral/10 hover:text-accent-coral"
        >
          <Trash2 className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
