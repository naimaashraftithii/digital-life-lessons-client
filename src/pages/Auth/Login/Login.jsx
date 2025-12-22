import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import GradientButton from "../../../components/GradientButton";

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
      {/* consistent heading style */}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Welcome back
      </h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Login করে আপনার life lessons এ ফিরে যান।
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-extrabold text-slate-800">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 outline-none shadow-sm focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-extrabold text-slate-800">Password</label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm focus-within:border-indigo-400">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••"
              className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="text-xs font-extrabold text-slate-600 hover:text-slate-900"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* same button style */}
        <GradientButton
          type="submit"
          variant="bluePink"
          disabled={submitting}
          className="w-full py-3"
        >
          {submitting ? "Logging in..." : "Login"}
        </GradientButton>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-extrabold text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <GradientButton
        type="button"
        variant="greenBlue"
        disabled={submitting}
        onClick={handleGoogleLogin}
        className="w-full py-3"
      >
        Continue with Google
      </GradientButton>

      <p className="mt-6 text-sm font-semibold text-slate-600">
        নতুন এখানে?{" "}
        <Link to="/register" className="font-extrabold text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
