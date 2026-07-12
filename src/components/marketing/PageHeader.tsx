import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

export function PageHeader({ namespace }: { namespace: string }) {
  const t = useTranslations(`pages.${namespace}`);
  return (
    <section className="bg-ivoire pt-20 pb-10">
      <Container className="max-w-3xl">
        <Reveal>
          <h1 className="font-serif text-5xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-sable-700">{t('body')}</p>
        </Reveal>
      </Container>
    </section>
  );
}
