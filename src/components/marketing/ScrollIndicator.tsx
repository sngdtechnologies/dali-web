'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function ScrollIndicator({ label }: { label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-sable-500">
      <span className="text-xs uppercase tracking-wide">{label}</span>
      <motion.svg
        width="20" height="20" viewBox="0 0 24 24" aria-hidden
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="m6 9 6 6 6-6" />
      </motion.svg>
    </div>
  );
}
