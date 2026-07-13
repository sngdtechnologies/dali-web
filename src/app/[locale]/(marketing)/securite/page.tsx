import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/marketing/PageHeader';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.security' });
  return pageMetadata({ locale, path: '/securite', title: t('title'), description: t('body') });
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.security');
  const blocks = [
    { title: t('s1title'), body: t('s1body') },
    { title: t('s2title'), body: t('s2body') },
    { title: t('s3title'), body: t('s3body') },
  ];
  return (
    <main>
      <PageHeader namespace="security" />
      <Section>
        <Container className="grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <Reveal key={b.title}>
              <Card>
                <h3 className="font-serif text-2xl">{b.title}</h3>
                <p className="mt-3 text-sable-700">{b.body}</p>
              </Card>
            </Reveal>
          ))}
        </Container>
      </Section>
    </main>
  );
}
