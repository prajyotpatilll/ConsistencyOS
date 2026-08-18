import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Target } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Target className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Start tracking your career progress
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded-lg bg-accent-coral/10 px-3 py-2 text-sm text-accent-coral">
                {error}
              </p>
            )}

            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                className={inputClass}
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Jane Doe"
                autoFocus
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="At least 6 characters"
              />
            </div>

            <Button type="submit" className="w-full" loading={submitting}>
              Create account
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
