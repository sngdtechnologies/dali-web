'use client';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';

export function AiBlock() {
  const t = useTranslations('features.ai');
  const reduce = useReducedMotion();
  return (
    <Section tone="dark">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <Badge className="bg-or-500/15 text-or-300">{t('eyebrow')}</Badge>
          <h2 className="mt-4 font-serif text-4xl text-ivoire">{t('title')}</h2>
          <p className="mt-4 max-w-md text-lg text-ivoire/70">{t('body')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative rounded-dali-xl border border-or-500/20 bg-foret-800 p-6">
            <motion.span
              aria-hidden
              className="mb-4 block h-2 w-2 rounded-dali-full bg-or-500"
              animate={reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-ivoire">{t('sample')}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
