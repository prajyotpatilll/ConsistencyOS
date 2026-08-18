import { useState } from "react";
import Button from "../common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const DSAForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState({
    problemName: initialData?.problemName || "",
    platform: initialData?.platform || "LeetCode",
    difficulty: initialData?.difficulty || "easy",
    dataStructure: initialData?.dataStructure || "",
    algorithm: initialData?.algorithm || "",
    problemUrl: initialData?.problemUrl || "",
    timeTaken: initialData?.timeTaken || "",
    notes: initialData?.notes || "",
    solvedAt: initialData?.solvedAt
      ? new Date(initialData.solvedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.problemName.trim()) {
      setError("Problem name is required");
      return;
    }
    onSubmit({ ...form, timeTaken: Number(form.timeTaken) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-accent-coral/10 px-3 py-2 text-sm text-accent-coral">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>Problem name</label>
        <input
          type="text"
          className={inputClass}
          value={form.problemName}
          onChange={handleChange("problemName")}
          placeholder="e.g. Two Sum"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Platform</label>
          <select
            className={inputClass}
            value={form.platform}
            onChange={handleChange("platform")}
          >
            {["LeetCode", "GeeksForGeeks", "CodeChef", "Codeforces", "HackerRank", "Other"].map(
              (p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className={labelClass}>Difficulty</label>
          <select
            className={inputClass}
            value={form.difficulty}
            onChange={handleChange("difficulty")}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Data structure</label>
          <input
            type="text"
            className={inputClass}
            value={form.dataStructure}
            onChange={handleChange("dataStructure")}
            placeholder="e.g. Array"
          />
        </div>
        <div>
          <label className={labelClass}>Algorithm</label>
          <input
            type="text"
            className={inputClass}
            value={form.algorithm}
            onChange={handleChange("algorithm")}
            placeholder="e.g. HashMap"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Problem URL</label>
        <input
          type="url"
          className={inputClass}
          value={form.problemUrl}
          onChange={handleChange("problemUrl")}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Time taken (minutes)</label>
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.timeTaken}
            onChange={handleChange("timeTaken")}
            placeholder="25"
          />
        </div>
        <div>
          <label className={labelClass}>Solved date</label>
          <input
            type="date"
            className={inputClass}
            value={form.solvedAt}
            onChange={handleChange("solvedAt")}
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
          placeholder="Approach, gotchas, follow-ups..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {initialData ? "Save changes" : "Add problem"}
        </Button>
      </div>
    </form>
  );
};

export default DSAForm;
