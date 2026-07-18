import { cn } from '@/lib/utils';

export function Input({
  id, name, label, type = 'text', defaultValue, required, autoComplete, disabled, className,
}: {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  defaultValue?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-encre">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className="rounded-dali-md border border-encre/15 bg-white px-4 py-2.5 text-sm text-encre outline-none transition-colors focus:border-foret-600 disabled:opacity-60"
      />
    </div>
  );
}
