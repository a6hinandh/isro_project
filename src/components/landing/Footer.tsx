import { Link } from "react-router-dom";
import { Mail, Satellite } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const columns = [
  {
    heading: "Astra-Q",
    links: [
      { label: "Chat", to: "/chat" },
      { label: "KG Explorer", to: "/explorer" },
      { label: "Satellites", to: "/satellites" },
      { label: "Learn More", to: "/learn-more" },
    ],
  },
  {
    heading: "Data",
    links: [
      { label: "Global Search", to: "/search" },
      { label: "MOSDAC Portal", href: "https://www.mosdac.gov.in" },
      { label: "ISRO", href: "https://www.isro.gov.in" },
    ],
  },
];

export function Footer() {
  return (
    <GlassPanel className="rounded-b-none p-6 sm:p-10">
      <footer>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h5 className="mb-3 font-semibold text-white">{col.heading}</h5>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"to" in link && link.to ? (
                      <Link
                        to={link.to}
                        className="text-slate-400 transition-colors hover:text-accent-300"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 transition-colors hover:text-accent-300"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className="mb-3 flex items-center gap-2 font-semibold text-white">
              <Satellite size={16} className="text-accent-400" /> About
            </h5>
            <p className="text-sm leading-relaxed text-slate-400">
              An open-source AI assistant for exploring ISRO&apos;s MOSDAC satellite
              data through conversation, search, and knowledge-graph visualization.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            © 2026 Astra-Q · Built with ❤️ for ISRO enthusiasts
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-400 transition-colors hover:text-white"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              aria-label="Email"
              className="text-slate-400 transition-colors hover:text-white"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </GlassPanel>
  );
}
