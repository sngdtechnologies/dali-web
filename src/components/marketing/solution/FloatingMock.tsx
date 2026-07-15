import type { ReactNode } from 'react';

export function FloatingMock({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  return (
    <div className="relative mx-auto flex max-w-md items-center justify-center px-2 py-8">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-80 w-80 rounded-full bg-gradient-to-br from-foret-100 via-foret-50 to-or-100 opacity-80 blur-2xl" />
      </div>
      <div className="pointer-events-none absolute -right-4 -top-2 h-24 w-24 rounded-full bg-or-300/30 blur-2xl" aria-hidden />
      <svg viewBox="0 0 72 72" className="pointer-events-none absolute -bottom-2 left-2 h-20 w-20 text-foret-800/[0.07]" aria-hidden>
        <path d="M8 44 A28 28 0 0 1 44 8" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M28 64 A28 28 0 0 1 64 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div className="relative z-10 flex w-full justify-center">{children}</div>
      {overlay}
    </div>
  );
}
