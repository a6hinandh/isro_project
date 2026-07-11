import { useState } from "react";
import { Info, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="glass w-full rounded-none p-6 sm:p-10 border-x-0 border-b-0">
      <footer>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand (Col-span 2) */}
          <div className="sm:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <img
                src="/logo.png"
                alt="AstraQ logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                AstraQ
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              An AI-powered assistant for exploring ISRO&apos;s MOSDAC satellite datasets
              through natural language queries, grounded in real documentation.
            </p>
          </div>

          {/* Column 2: Data Portals */}
          <div>
            <h5 className="mb-3 font-semibold text-white">Data Portals</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.mosdac.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-accent-300"
                >
                  MOSDAC Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.isro.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-accent-300"
                >
                  ISRO
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h5 className="mb-3 font-semibold text-white">Information</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setAboutOpen(true)}
                  className="cursor-pointer text-slate-400 transition-colors hover:text-accent-300 text-left"
                >
                  About the Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTermsOpen(true)}
                  className="cursor-pointer text-slate-400 transition-colors hover:text-accent-300 text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-400">
              © 2026 AstraQ · Satellite Data Assistant
            </p>
            <p className="text-xs text-slate-500">
              Built by AstraMind — a student-led group of data engineers, AI researchers, and space enthusiasts.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/a6hinandh/AstraQ_Frontend"
              target="_blank"
              rel="noreferrer"
              aria-label="Frontend GitHub Repository"
              className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <GithubIcon size={14} />
              <span>Frontend Repo</span>
            </a>
            <a
              href="https://github.com/a6hinandh/AstraQ_Backend"
              target="_blank"
              rel="noreferrer"
              aria-label="Backend GitHub Repository"
              className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <GithubIcon size={14} />
              <span>Backend Repo</span>
            </a>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <Modal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} title="About AstraQ">
        <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <Info className="text-accent-400 size-6" />
            <h3 className="text-base font-bold text-white">Project Scope</h3>
          </div>
          <p>
            AstraQ is an advanced educational retrieval-augmented generation (RAG) and relational metadata assistant built to explore and study ISRO&apos;s MOSDAC satellite data records.
          </p>
          <p>
            By parsing satellite documentation (ATBDs, user manuals) into a localized vector database and extracting structured payload facts into a knowledge graph, AstraQ ensures that its natural language summaries are completely grounded and verifiable.
          </p>
          <p>
            Sessions are managed using Firebase Authentication and persisted privately inside Cloud Firestore.
          </p>
        </div>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal isOpen={termsOpen} onClose={() => setTermsOpen(false)} title="Terms & Conditions">
        <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <ShieldAlert className="text-nebula-400 size-6" />
            <h3 className="text-base font-bold text-white">Usage Guidelines</h3>
          </div>
          <p className="font-semibold text-white">1. Educational Purpose Only</p>
          <p>
            AstraQ is an educational tool for exploring meteorological and oceanographic satellite datasets. It is not affiliated with, sponsored by, or endorsed by ISRO.
          </p>
          <p className="font-semibold text-white">2. Data Processing & Privacy</p>
          <p>
            All user rosters and thread logs are private. The system caches context inside Firestore. Document uploads are processed transiently to extract query context.
          </p>
          <p className="font-semibold text-white">3. Information Fidelity</p>
          <p>
            While responses are heavily grounded in vector-matched MOSDAC files, users should double-check coordinates and scientific metrics on the official MOSDAC portal before deployment.
          </p>
        </div>
      </Modal>
    </div>
  );
}
