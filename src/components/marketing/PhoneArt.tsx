export type PhoneVariant = 'accounts' | 'track' | 'ai' | 'score' | 'pay' | 'budget';

const IVOIRE = '#F5F0E6';
const IVOIRE_DIM = '#9EBBAA';
const GOLD = '#C9A961';
const FORET7 = '#2D4F3F';
const FORET6 = '#3A6B4E';

function bar(x: number, y: number, w: number, h: number, fill: string, r = 3) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />;
}

function screen(variant: PhoneVariant) {
  switch (variant) {
    case 'accounts':
      return (
        <>
          {bar(24, 40, 34, 5, IVOIRE_DIM)}
          {bar(24, 52, 66, 11, IVOIRE, 4)}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {bar(24, 84 + i * 30, 92, 22, FORET7, 7)}
              <circle cx={36} cy={95 + i * 30} r={5} fill={GOLD} />
              {bar(48, 90 + i * 30, 40, 5, IVOIRE_DIM)}
              {bar(48, 99 + i * 30, 26, 4, FORET6)}
            </g>
          ))}
        </>
      );
    case 'track':
      return (
        <>
          {bar(24, 40, 30, 5, IVOIRE_DIM)}
          {bar(24, 52, 58, 11, IVOIRE, 4)}
          <path d="M24 150 C42 118 58 158 76 128 S104 92 116 116" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M24 150 C42 118 58 158 76 128 S104 92 116 116 L116 180 L24 180 Z" fill={GOLD} opacity="0.12" />
          {[0, 1, 2].map((i) => bar(24 + i * 32, 196 + (i % 2) * 8, 24, 34 - (i % 2) * 8, FORET7, 4))}
        </>
      );
    case 'ai':
      return (
        <>
          <circle cx={34} cy={52} r={9} fill={GOLD} />
          {bar(30, 74, 84, 40, FORET7, 10)}
          {bar(40, 86, 60, 5, IVOIRE_DIM)}
          {bar(40, 96, 44, 5, IVOIRE_DIM)}
          {bar(56, 126, 60, 30, GOLD, 10)}
          {bar(66, 136, 40, 5, '#102018')}
        </>
      );
    case 'score':
      return (
        <>
          <path d="M30 150 A40 40 0 0 1 110 150" fill="none" stroke={FORET7} strokeWidth="10" strokeLinecap="round" />
          <path d="M30 150 A40 40 0 0 1 104 128" fill="none" stroke={GOLD} strokeWidth="10" strokeLinecap="round" />
          <circle cx={70} cy={150} r={4} fill={IVOIRE} />
          {bar(52, 168, 36, 12, IVOIRE, 4)}
          {bar(44, 190, 52, 5, IVOIRE_DIM)}
        </>
      );
    case 'pay':
      return (
        <>
          {bar(24, 40, 40, 5, IVOIRE_DIM)}
          <g fill={IVOIRE}>
            {Array.from({ length: 5 }).flatMap((_, r) =>
              Array.from({ length: 5 }).map((__, c) =>
                (r + c) % 2 === 0 ? <rect key={`${r}-${c}`} x={40 + c * 12} y={64 + r * 12} width={9} height={9} rx={2} /> : null,
              ),
            )}
          </g>
          {bar(30, 140, 80, 24, GOLD, 8)}
          {bar(50, 149, 40, 6, '#102018')}
        </>
      );
    case 'budget':
      return (
        <>
          {bar(24, 40, 30, 5, IVOIRE_DIM)}
          <circle cx={70} cy={100} r={30} fill="none" stroke={FORET7} strokeWidth="14" />
          <path d="M70 70 A30 30 0 0 1 96 116" fill="none" stroke={GOLD} strokeWidth="14" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={32} cy={158 + i * 18} r={4} fill={i === 0 ? GOLD : FORET6} />
              {bar(42, 155 + i * 18, 60 - i * 12, 5, IVOIRE_DIM)}
            </g>
          ))}
        </>
      );
  }
}

export function PhoneArt({ variant }: { variant: PhoneVariant }) {
  return (
    <svg viewBox="0 0 140 260" className="h-44 w-auto drop-shadow-xl" role="img" aria-hidden>
      <rect x="6" y="6" width="128" height="248" rx="24" fill="#1A1A17" />
      <rect x="12" y="12" width="116" height="236" rx="18" fill="#102018" />
      <rect x="56" y="18" width="28" height="6" rx="3" fill="#1A1A17" />
      {screen(variant)}
    </svg>
  );
}
