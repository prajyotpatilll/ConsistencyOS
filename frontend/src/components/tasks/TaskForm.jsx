import { useState } from "react";
import { Repeat } from "lucide-react";
import Button from "../common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const TaskForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "custom",
    priority: initialData?.priority || "medium",
    dueDate: initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    isRecurring: initialData?.isRecurring || false,
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleRecurring = () =>
    setForm((prev) => ({ ...prev, isRecurring: !prev.isRecurring }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-accent-coral/10 px-3 py-2 text-sm text-accent-coral">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          className={inputClass}
          value={form.title}
          onChange={handleChange("title")}
          placeholder="e.g. Complete portfolio"
          autoFocus
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={2}
          className={inputClass}
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Optional details"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={handleChange("category")}
          >
            <option value="custom">Custom</option>
            <option value="dsa">DSA</option>
            <option value="job">Job</option>
            <option value="interview">Interview</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Priority</label>
          <select
            className={inputClass}
            value={form.priority}
            onChange={handleChange("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleRecurring}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
          form.isRecurring
            ? "border-brand-400 bg-brand-50"
            : "border-border bg-surface hover:bg-canvas"
        }`}
      >
        <span className="flex items-center gap-2.5">
          <Repeat
            className={`h-4 w-4 ${form.isRecurring ? "text-brand-600" : "text-muted"}`}
            strokeWidth={2}
          />
          <span>
            <span className="block text-sm font-medium text-ink">
              Repeat daily
            </span>
            <span className="block text-xs text-muted">
              Task reappears every day until you turn this off
            </span>
          </span>
        </span>
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
            form.isRecurring ? "bg-brand-500" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              form.isRecurring ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {!form.isRecurring && (
        <div>
          <label className={labelClass}>Due date</label>
          <input
            type="date"
            className={inputClass}
            value={form.dueDate}
            onChange={handleChange("dueDate")}
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {initialData ? "Save changes" : "Add task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
