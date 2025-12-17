import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Email এবং Password দুটোই দিন");
      return;
    }

    try {
      setSubmitting(true);
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed. আবার চেষ্টা করুন");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setSubmitting(true);
      await googleSignIn();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
      <p className="mt-1 text-sm text-slate-600">
        Login করে আপনার life lessons এ ফিরে যান।
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 focus-within:border-primary">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••"
              className="w-full text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          disabled={submitting}
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        disabled={submitting}
        onClick={handleGoogleLogin}
        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
      >
        Continue with Google
      </button>

      <p className="mt-5 text-sm text-slate-600">
        নতুন এখানে?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
