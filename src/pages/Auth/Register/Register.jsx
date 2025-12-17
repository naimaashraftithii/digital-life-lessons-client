import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const hasUpper = (str) => /[A-Z]/.test(str);
const hasLower = (str) => /[a-z]/.test(str);

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name || !email || !password) {
      toast.error("Name, Email, Password অবশ্যই দিতে হবে");
      return;
    }

    if (password.length < 6) {
      toast.error("Password কমপক্ষে 6 অক্ষরের হতে হবে");
      return;
    }

    if (!hasUpper(password)) {
      toast.error("Password এ অন্তত ১টি Uppercase letter থাকতে হবে");
      return;
    }

    if (!hasLower(password)) {
      toast.error("Password এ অন্তত ১টি Lowercase letter থাকতে হবে");
      return;
    }

    try {
      setSubmitting(true);

      // create account
      await createUser(email, password);

      // update profile
      await updateUserProfile(name, photoURL);

      toast.success("Account created successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setSubmitting(true);
      await googleSignIn();
      toast.success("Google signup successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
      <p className="mt-1 text-sm text-slate-600">
        আপনার প্রোফাইল তৈরি করুন এবং lessons লিখতে শুরু করুন।
      </p>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Photo URL</label>
          <input
            name="photoURL"
            type="url"
            placeholder="https://..."
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

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
              placeholder="Min 6 chars, Upper+Lower"
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

          <p className="mt-2 text-xs text-slate-500">
            Password rules: 6+ characters, 1 Uppercase, 1 Lowercase.
          </p>
        </div>

        <button
          disabled={submitting}
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Sign up"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        disabled={submitting}
        onClick={handleGoogleRegister}
        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
      >
        Continue with Google
      </button>

      <p className="mt-5 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
