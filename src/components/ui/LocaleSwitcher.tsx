'use client';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ currentLocale }: { currentLocale: 'fr' | 'en' }) {
  const t = useTranslations('locale');
  const pathname = usePathname();
  const router = useRouter();
  const next = currentLocale === 'fr' ? 'en' : 'fr';
  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className={cn('rounded-dali-full px-3 py-1 text-sm', 'border border-encre/15 hover:bg-encre/5')}
    >
      {t('switchTo')}
    </button>
  );
}
