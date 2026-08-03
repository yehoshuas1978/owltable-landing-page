'use client';

import { Database, FileCheck2, ServerOff, ShieldCheck } from 'lucide-react';

const claims = [
  { icon: ServerOff, title: 'Runs on your infrastructure', text: 'Installed locally. Your database credentials and production rows stay on your infrastructure.' },
  { icon: Database, title: 'PostgreSQL · MySQL · SQL Server', text: 'One workflow across the engines you already run.' },
  { icon: ShieldCheck, title: 'Readiness-gated execution', text: 'Blocking checks stop unsafe jobs server-side.' },
  { icon: FileCheck2, title: 'Auditor-ready evidence', text: 'Validation re-scans and evidence packs per run.' },
];

export default function TrustBar() {
  return (
    <section aria-label="Why teams trust OwlMask" className="relative border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {claims.map((claim) => (
          <div key={claim.title} className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-400/10 p-2 text-blue-300"><claim.icon className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-white">{claim.title}</p>
              <p className="mt-0.5 text-sm leading-6 text-slate-400">{claim.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
