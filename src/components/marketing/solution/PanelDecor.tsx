export function PanelDecor({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <>
      <span className={`pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full blur-3xl ${dark ? 'bg-or-500/25' : 'bg-or-500/15'}`} aria-hidden />
      <span className={`pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full blur-3xl ${dark ? 'bg-foret-500/25' : 'bg-foret-300/40'}`} aria-hidden />
      <svg viewBox="0 0 72 72" className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 ${dark ? 'text-ivoire/[0.06]' : 'text-foret-900/[0.05]'}`} aria-hidden>
        <path d="M8 44 A28 28 0 0 1 44 8" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M28 64 A28 28 0 0 1 64 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div className="pointer-events-none absolute left-6 top-6 grid grid-cols-3 gap-1.5 opacity-20" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={`h-1 w-1 rounded-full ${dark ? 'bg-ivoire' : 'bg-foret-800'}`} />
        ))}
      </div>
    </>
  );
}
