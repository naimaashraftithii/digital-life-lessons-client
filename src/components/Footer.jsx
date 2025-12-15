import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t bg-slate-900 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white font-bold">
              DL
            </span>
            <span className="text-lg font-semibold">
              Digital Life Lessons
            </span>
          </div>
          <p className="text-sm text-slate-400">
            A calm space to capture your life lessons, reflect on your journey,
            and learn from others’ stories.
          </p>
        </div>

        {/* Links */}
        <div className="grid flex-1 gap-6 text-sm md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Explore
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/public-lessons" className="hover:text-white">
                  Public Lessons
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Legal
            </h3>
            <ul className="space-y-1">
              <li>
                <button className="cursor-default text-left text-slate-400">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button className="cursor-default text-left text-slate-400">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Connect
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:support@digitallifelessons.com"
                  className="hover:text-white"
                >
                  support@digitallifelessons.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                {/* X logo – we’ll just use text/icon now */}
                <a
                  href="#"
                  className="text-xs font-semibold uppercase tracking-wide hover:text-white"
                >
                  X
                </a>
                <a href="#" className="text-sm hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-sm hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-xs text-slate-500">
          <p>© {year} Digital Life Lessons. All rights reserved.</p>
          <p>Built for mindful reflection ✨</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
