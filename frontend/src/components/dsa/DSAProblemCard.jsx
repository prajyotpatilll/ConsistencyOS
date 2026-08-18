import { Pencil, Trash2, ExternalLink, Clock } from "lucide-react";

const difficultyStyles = {
  easy: "bg-accent-teal/10 text-accent-teal",
  medium: "bg-accent-amber/10 text-accent-amber",
  hard: "bg-accent-coral/10 text-accent-coral",
};

const DSAProblemCard = ({ problem, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {problem.problemName}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${difficultyStyles[problem.difficulty]}`}
            >
              {problem.difficulty}
            </span>
            <span className="text-xs text-muted">{problem.platform}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(problem)}
            aria-label="Edit problem"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(problem)}
            aria-label="Delete problem"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-coral/10 hover:text-accent-coral"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {(problem.dataStructure || problem.algorithm) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {problem.dataStructure && (
            <span className="rounded-md bg-canvas px-2 py-1 text-xs text-muted">
              {problem.dataStructure}
            </span>
          )}
          {problem.algorithm && (
            <span className="rounded-md bg-canvas px-2 py-1 text-xs text-muted">
              {problem.algorithm}
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {problem.timeTaken ? `${problem.timeTaken} min` : "No time logged"}
        </div>
        {problem.problemUrl && (
          <a
            href={problem.problemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
          >
            View <ExternalLink className="h-3 w-3" strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  );
};

export default DSAProblemCard;
