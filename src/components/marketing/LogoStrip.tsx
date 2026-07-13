import { Container } from '@/components/ui/Container';

// Neutral placeholder partner marks — swap for real partner logos (with permission) later.
const PLACEHOLDERS = ['Banque A', 'FinCoop', 'PayZone', 'Épargne+', 'MobilePay', 'CréditNet'];

export function LogoStrip() {
  return (
    <div className="border-y border-encre/10 bg-white py-8">
      <Container className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {PLACEHOLDERS.map((name) => (
          <span key={name} className="flex items-center gap-2 text-sable-400" aria-hidden>
            <span className="inline-block h-6 w-6 rounded-dali-sm bg-sable-300" />
            <span className="text-sm font-bold tracking-tight">{name}</span>
          </span>
        ))}
      </Container>
    </div>
  );
}
