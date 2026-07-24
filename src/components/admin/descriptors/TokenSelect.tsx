import { COLOR_TOKENS, type ColorToken } from '@/lib/admin/descriptor-types';
import { fieldInputClass } from './styles';

export function TokenSelect({
  value, onChange, label, allowNone = true,
}: {
  value: ColorToken | undefined;
  onChange: (value: ColorToken | undefined) => void;
  label: string;
  allowNone?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-encre">{label}</span>
      <select
        aria-label={label}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? (e.target.value as ColorToken) : undefined)}
        className={fieldInputClass}
      >
        {allowNone ? <option value="">—</option> : null}
        {COLOR_TOKENS.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
    </label>
  );
}
