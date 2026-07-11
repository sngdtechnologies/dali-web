import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('nav');
  return <main className="p-10 font-serif text-4xl">{t('download')}</main>;
}
