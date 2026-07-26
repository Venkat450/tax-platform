import { useNavigate } from 'react-router-dom';
import {
  Sparkles, FileSearch, ShieldCheck, MessagesSquare, History, ArrowRight,
} from 'lucide-react';
import { useApp, ROLE_OPTIONS } from '../context/AppContext';
import type { Role } from '../data/mockData';
import { sampleFields } from '../data/mockData';
import { DocExcerpt } from '../components/FieldReview';

const ROLE_DOT: Record<Role, string> = {
  cpa: 'bg-indigo-500', client: 'bg-blue-500', reviewer: 'bg-violet-500',
  admin: 'bg-orange-500', business_owner: 'bg-pink-500', seasonal_staff: 'bg-cyan-600',
};

const ROLE_BLURB: Record<Role, string> = {
  cpa: 'Reviews AI-extracted values, verifies clean ones, and asks clients for anything unclear.',
  client: 'Tracks return status and responds to whatever the firm still needs — nothing more.',
  reviewer: 'Signs off on fields flagged for senior review before they can move forward.',
  admin: 'Sees activity across every preparer and return in the firm.',
  business_owner: 'Reviews their own entity return with the same document-backed detail as staff.',
  seasonal_staff: 'Limited permissions — can confirm clean extractions but not override or reject.',
};

const FEATURES = [
  {
    icon: FileSearch,
    title: 'Source traceability',
    body: 'Every AI-extracted value links to the exact document, page, section, and raw text it came from — never a number without a receipt.',
  },
  {
    icon: ShieldCheck,
    title: 'Permissions, not just roles',
    body: 'A preparer can verify a clean extraction. Only a senior reviewer can sign off a flagged one. The UI enforces the same logic it shows you.',
  },
  {
    icon: MessagesSquare,
    title: 'Collaborative clarification',
    body: 'Internal notes stay internal. Client-facing questions are linked to the exact field or document they concern — reachable from either side.',
  },
  {
    icon: History,
    title: 'Full audit trail',
    body: 'Every override, rejection, or approval is logged with who, when, and why — and every action can be undone within a 30-second window.',
  },
];

const featuredField = sampleFields[0]; // W-2 Box 1 → Line 1a

export default function WelcomePage() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const enterAs = (role: Role) => {
    setRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #818cf8 0%, #4338ca 100%)' }}>
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">TaxFlow</span>
          </div>
          <button
            onClick={() => enterAs('cpa')}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Enter prototype →
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-100" style={{ background: 'linear-gradient(180deg, #fafbff 0%, #ffffff 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Every number the AI extracts has a receipt.
          </h1>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            A working prototype for AI-assisted tax review — source traceability, reviewer permissions,
            collaborative clarification, and a full audit trail, not just a demo dashboard.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => enterAs('cpa')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
            >
              Enter as a CPA <ArrowRight size={14} />
            </button>
            <button
              onClick={() => enterAs('client')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Enter as a Client
            </button>
          </div>
        </div>
      </section>

      {/* Live demo teaser */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Real evidence, not a mockup
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Source document</p>
            {featuredField.source && (
              <DocExcerpt docType="W-2" src={featuredField.source} />
            )}
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">Used on the return</p>
            <p className="text-xs text-slate-500">Line {featuredField.lineNumber} · {featuredField.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 tabular-nums">
              ${Number(featuredField.value).toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              {featuredField.aiMeta?.confidence !== undefined && (
                <>AI confidence: <span className="font-semibold text-emerald-600">{Math.round(featuredField.aiMeta.confidence * 100)}%</span> — </>
              )}
              click through to see the full reasoning and correction history.
            </p>
          </div>
        </div>
      </section>

      {/* Persona entry points */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xl font-semibold text-slate-900 text-center">Enter as anyone in the firm</h2>
          <p className="text-sm text-slate-500 text-center mt-1.5 max-w-md mx-auto">
            The same data, six different lenses. Role switching is also available anytime from inside the app.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ROLE_OPTIONS.map(opt => (
              <button
                key={opt.role}
                onClick={() => enterAs(opt.role)}
                className="text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${ROLE_DOT[opt.role]}`} />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{opt.subtitle}</span>
                </div>
                <p className="font-semibold text-slate-900">{opt.name}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ROLE_BLURB[opt.role]}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-1.5 transition-all">
                  Enter as {opt.name.split(' ')[0]} <ArrowRight size={11} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature proof */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FEATURES.map(f => (
            <div key={f.title} className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                <f.icon size={16} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{f.title}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer disclaimer */}
      <footer className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            This is a working prototype built to demonstrate frontend UX, information architecture, and
            trustworthy-AI interaction patterns for tax software. All names, financial figures, documents,
            and AI output are fabricated for demonstration — nothing here is real client data.
          </p>
        </div>
      </footer>
    </div>
  );
}
