import { useState } from "react";
import Button from "../common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const categories = [
  "DSA",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "DBMS",
  "OS",
  "Computer Networks",
  "System Design",
  "Behavioral",
  "Other",
];

const InterviewForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState({
    category: initialData?.category || "JavaScript",
    language: initialData?.language || "",
    topic: initialData?.topic || "",
    subTopic: initialData?.subTopic || "",
    duration: initialData?.duration || "",
    notes: initialData?.notes || "",
    preparedAt: initialData?.preparedAt
      ? new Date(initialData.preparedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic.trim()) {
      setError("Topic is required");
      return;
    }
    onSubmit({ ...form, duration: Number(form.duration) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-accent-coral/10 px-3 py-2 text-sm text-accent-coral">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={handleChange("category")}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Language</label>
          <input
            type="text"
            className={inputClass}
            value={form.language}
            onChange={handleChange("language")}
            placeholder="Optional, e.g. JavaScript"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Topic</label>
        <input
          type="text"
          className={inputClass}
          value={form.topic}
          onChange={handleChange("topic")}
          placeholder="e.g. Event Loop"
          autoFocus
        />
      </div>

      <div>
        <label className={labelClass}>Subtopic</label>
        <input
          type="text"
          className={inputClass}
          value={form.subTopic}
          onChange={handleChange("subTopic")}
          placeholder="e.g. Microtasks and Macrotasks"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Duration (minutes)</label>
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.duration}
            onChange={handleChange("duration")}
            placeholder="45"
          />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.preparedAt}
            onChange={handleChange("preparedAt")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          rows={2}
          className={inputClass}
          value={form.notes}
          onChange={handleChange("notes")}
          placeholder="e.g. Need to revise promises"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {initialData ? "Save changes" : "Add preparation"}
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
