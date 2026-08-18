import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Target } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button.jsx";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-medium text-muted";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password");
      return;
    }

    setSubmitting(true);
    try {
      await login(form);
      navigate(from, { replace: true });
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
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted">
            Log in to your Career Tracker
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
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                autoFocus
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" loading={submitting}>
              Log in
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brand-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
