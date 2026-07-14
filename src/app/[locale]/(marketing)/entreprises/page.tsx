import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_HREF } from '@/lib/config';

const ITEMS = ['payments', 'data', 'insights'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.enterprise' });
  return pageMetadata({ locale, path: '/entreprises', title: t('title'), description: t('body') });
}

export default async function EnterprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.enterprise');
  const tb = await getTranslations('b2b');
  return (
    <main>
      <section className="bg-white pt-20 pb-10">
        <Container className="max-w-3xl">
          <Reveal>
            <Badge className="bg-or-500/15 text-or-700">{t('soon')}</Badge>
            <h1 className="mt-4 font-serif text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-sable-700">{t('body')}</p>
            <div className="mt-6">
              <Button href={CONTACT_HREF}>{t('contact')}</Button>
            </div>
          </Reveal>
        </Container>
      </section>
      <Section>
        <Container className="grid gap-6 md:grid-cols-3">
          {ITEMS.map((k) => (
            <Reveal key={k}>
              <Card className="h-full">
                <h3 className="font-serif text-xl">{tb(`items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-sable-700">{tb(`items.${k}.body`)}</p>
              </Card>
            </Reveal>
          ))}
        </Container>
      </Section>
    </main>
  );
}
