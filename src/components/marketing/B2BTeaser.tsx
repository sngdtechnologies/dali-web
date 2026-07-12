import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

const B2B = ['payments', 'data', 'insights'] as const;

export function B2BTeaser() {
  const t = useTranslations('b2b');
  return (
    <Section tone="ivoireDeep">
      <Container>
        <Reveal className="text-center">
          <Badge className="bg-or-500/15 text-or-700">{t('eyebrow')}</Badge>
          <h2 className="mt-4 font-serif text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sable-700">{t('sub')}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {B2B.map((k) => (
            <Reveal key={k}>
              <Card className="h-full">
                <h3 className="font-serif text-xl">{t(`items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-sable-700">{t(`items.${k}.body`)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/entreprises" variant="secondary">
            {t('seeAll')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
