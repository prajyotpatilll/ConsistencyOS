import { useState } from "react";
import Button from "../common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const JobForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState({
    companyName: initialData?.companyName || "",
    position: initialData?.position || "",
    platform: initialData?.platform || "LinkedIn",
    jobUrl: initialData?.jobUrl || "",
    recruiterEmail: initialData?.recruiterEmail || "",
    location: initialData?.location || "",
    status: initialData?.status || "applied",
    notes: initialData?.notes || "",
    appliedAt: initialData?.appliedAt
      ? new Date(initialData.appliedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.position.trim()) {
      setError("Company and position are required");
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Company</label>
          <input
            type="text"
            className={inputClass}
            value={form.companyName}
            onChange={handleChange("companyName")}
            placeholder="e.g. Google"
            autoFocus
          />
        </div>
        <div>
          <label className={labelClass}>Position</label>
          <input
            type="text"
            className={inputClass}
            value={form.position}
            onChange={handleChange("position")}
            placeholder="e.g. Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Platform</label>
          <select
            className={inputClass}
            value={form.platform}
            onChange={handleChange("platform")}
          >
            {["LinkedIn", "Naukri", "Indeed", "Company Website", "Referral", "Internshala", "Other"].map(
              (p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            value={form.status}
            onChange={handleChange("status")}
          >
            <option value="applied">Applied</option>
            <option value="oa">Online Assessment</option>
            <option value="interview">Interview</option>
            <option value="final_round">Final Round</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Job URL</label>
        <input
          type="url"
          className={inputClass}
          value={form.jobUrl}
          onChange={handleChange("jobUrl")}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Recruiter email</label>
          <input
            type="email"
            className={inputClass}
            value={form.recruiterEmail}
            onChange={handleChange("recruiterEmail")}
            placeholder="Optional"
          />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            className={inputClass}
            value={form.location}
            onChange={handleChange("location")}
            placeholder="e.g. Bangalore"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Applied date</label>
        <input
          type="date"
          className={inputClass}
          value={form.appliedAt}
          onChange={handleChange("appliedAt")}
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          rows={2}
          className={inputClass}
          value={form.notes}
          onChange={handleChange("notes")}
          placeholder="e.g. Applied through referral"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {initialData ? "Save changes" : "Add application"}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
