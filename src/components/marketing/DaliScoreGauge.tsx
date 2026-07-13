'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from '@/components/motion/CountUp';

export function DaliScoreGauge({ score }: { score: number }) {
  const reduce = useReducedMotion();
  const pct = Math.min(score / 1000, 1);
  const r = 120;
  const circ = Math.PI * r;
  return (
    <div className="mx-auto flex w-[260px] flex-col items-center">
      <svg viewBox="0 0 280 160" className="w-full" role="img" aria-label={`Dali-Score ${score} / 1000`}>
        <path d="M20 150 A120 120 0 0 1 260 150" fill="none" stroke="#DEE7DF" strokeWidth="16" strokeLinecap="round" />
        <motion.path
          d="M20 150 A120 120 0 0 1 260 150"
          fill="none"
          stroke="#C9A961"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: reduce ? circ * (1 - pct) : circ }}
          whileInView={{ strokeDashoffset: circ * (1 - pct) }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </svg>
      <div className="-mt-8 font-serif text-5xl">
        <CountUp to={score} />
      </div>
      <div className="text-sm text-sable-700">/ 1000</div>
    </div>
  );
}
