import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

type Action = { labelKey: string; href: string; variant?: 'primary' | 'secondary' };

export async function ComingSoon({ pageKey, actions = [] }: { pageKey: string; actions?: Action[] }) {
  const t = await getTranslations('comingSoon');
  return (
    <main>
      <section className="bg-white py-24 md:py-32">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <Badge className="bg-or-500/15 text-or-700">{t('soon')}</Badge>
            <h1 className="mt-5 text-4xl text-foret-800 md:text-5xl">{t(`pages.${pageKey}.title`)}</h1>
            <p className="mt-5 text-lg text-sable-700">{t(`pages.${pageKey}.body`)}</p>
            {actions.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {actions.map((a) => (
                  <Button key={a.href} href={a.href} variant={a.variant ?? 'primary'}>{t(a.labelKey)}</Button>
                ))}
              </div>
            )}
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
