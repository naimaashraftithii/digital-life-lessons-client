import { FaFacebook, FaTiktok, FaTwitter, FaYoutubeSquare } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#1f2937] bg-[#030712] text-[#e5e7eb]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:justify-between">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl 
              bg-[#f97316] text-white font-bold text-sm
              transition-all duration-500 hover:scale-110">
              DL
            </span>

            <span className="text-lg font-semibold tracking-wide text-white">
              Digital Life Lessons
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#9ca3af]">
            A calm space to capture your life lessons, reflect on your journey,
            and learn from others’ stories.
          </p>
        </div>

        {/* Links */}
        <div className="grid flex-1 gap-8 text-sm md:grid-cols-3">

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/public-lessons", label: "Public Lessons" },
                { to: "/dashboard", label: "Dashboard" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="transition-colors duration-300 hover:text-[#22c55e]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
              Legal
            </h3>
            <ul className="space-y-3">
              <li className="text-[#6b7280] cursor-not-allowed">
                Terms &amp; Conditions
              </li>
              <li className="text-[#6b7280] cursor-not-allowed">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
              Connect
            </h3>

            <a
              href="mailto:support@digitallifelessons.com"
              className="mb-4 block text-sm text-[#9ca3af]
              transition-colors duration-300 hover:text-white"
            >
              support@digitallifelessons.com
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-xl">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#1877F2]"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#1DA1F2]"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#9CA3AF]"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#E1306C]"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#69C9D0]"
              >
                <FaTiktok />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:text-[#FF0000]"
              >
                <FaYoutubeSquare />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1f2937]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-xs text-[#6b7280] md:flex-row md:justify-between">
          <p>© {year} Digital Life Lessons. All rights reserved.</p>
          <p className="transition-colors duration-300 hover:text-[#22c55e]">
            Built for mindful reflection ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
