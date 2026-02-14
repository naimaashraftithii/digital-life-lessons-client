import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import GradientButton from "../../../components/GradientButton";

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
      toast.error("Name, Email, Password Must be give");
      return;
    }
    if (password.length < 6) {
      toast.error("Password ATLEAST 6 LETTER");
      return;
    }
    if (!hasUpper(password)) {
      toast.error("Password ATLEAST 1 UPPERCASE LETTER");
      return;
    }
    if (!hasLower(password)) {
      toast.error("Password ATLEAST 1  lOWERCASE LETTER");
      return;
    }

    try {
      setSubmitting(true);
      await createUser(email, password);
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
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Create account
      </h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Create Your Profile and write start lessons
      </p>

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-extrabold text-slate-800">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 outline-none shadow-sm focus:border-indigo-400"
          />
        </div>

        <div>
          <label className="text-sm font-extrabold text-slate-800">Photo URL</label>
          <input
            name="photoURL"
            type="url"
            placeholder="https://..."
            className="mt-2 w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 outline-none shadow-sm focus:border-indigo-400"
          />
        </div>

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
              placeholder="Min 6 chars, Upper+Lower"
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

          <p className="mt-2 text-xs font-semibold text-slate-500">
            Password rules: 6+ characters, 1 Uppercase, 1 Lowercase.
          </p>
        </div>

        <GradientButton
          type="submit"
          variant="pinkRed"
          disabled={submitting}
          className="w-full py-3"
        >
          {submitting ? "Creating..." : "Sign up"}
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
        onClick={handleGoogleRegister}
        className="w-full py-3"
      >
        Continue with Google
      </GradientButton>

      <p className="mt-6 text-sm font-semibold text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-extrabold text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
