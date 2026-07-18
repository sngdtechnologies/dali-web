import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
const variantClass: Record<Variant, string> = {
  primary: 'bg-foret-800 text-ivoire hover:bg-foret-700',
  secondary: 'bg-white text-encre border border-encre/15 hover:bg-encre/5',
  ghost: 'text-encre hover:bg-encre/5',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-dali-full px-6 py-3 text-sm font-medium transition-transform duration-150 active:scale-[0.97]';

export function Button({
  variant = 'primary', href, className, children, type = 'button', disabled, onClick,
}: {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classes = cn(base, variantClass[variant], disabled && 'opacity-60', className);
  if (href && /^https?:\/\//.test(href)) {
    return <a href={href} className={classes} target="_blank" rel="noreferrer">{children}</a>;
  }
  if (href && /^(#|mailto:|tel:)/.test(href)) {
    return <a href={href} className={classes}>{children}</a>;
  }
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
