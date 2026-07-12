import { useTranslations } from 'next-intl';
import { Accordion } from '@/components/ui/Accordion';
import { getFaqItems } from '@/lib/content/faq';

export function FaqList() {
  const t = useTranslations('faq');
  return <Accordion items={getFaqItems(t)} />;
}
