import { Pencil, Trash2, Check, Repeat } from "lucide-react";

const priorityStyles = {
  low: "bg-canvas text-muted",
  medium: "bg-accent-amber/10 text-accent-amber",
  high: "bg-accent-coral/10 text-accent-coral",
};

const formatDate = (date) => {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const isDone = task.completedToday ?? task.completed;

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card transition-opacity ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => onToggle(task)}
        aria-label={isDone ? "Mark incomplete" : "Mark complete"}
        className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          isDone
            ? "border-brand-500 bg-brand-500 text-white"
            : "border-border text-transparent hover:border-brand-400"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium text-ink ${
            isDone ? "line-through" : ""
          }`}
        >
          {task.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-canvas px-2 py-0.5 text-xs font-medium capitalize text-muted">
            {task.category}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
          {task.isRecurring ? (
            <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              <Repeat className="h-3 w-3" strokeWidth={2.25} />
              Daily
            </span>
          ) : (
            <span className="text-xs text-muted">
              Due {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <Pencil className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-coral/10 hover:text-accent-coral"
        >
          <Trash2 className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
