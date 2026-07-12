import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export function LegalPage({ docKey }: { docKey: 'conditions' | 'confidentialite' | 'cookies' }) {
  const t = useTranslations('legal');
  return (
    <main className="bg-ivoire py-20">
      <Container className="max-w-2xl">
        <Badge className="bg-attention/15 text-attention">{t('notice')}</Badge>
        <h1 className="mt-6 font-serif text-4xl">{t(`${docKey}.title`)}</h1>
        <p className="mt-6 whitespace-pre-line leading-relaxed text-sable-700">{t(`${docKey}.body`)}</p>
      </Container>
    </main>
  );
}
