import { fieldInputClass } from './styles';

export function EnumSelect<T extends string>({
  value, onChange, options, label, allowNone = false,
}: {
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  options: readonly T[];
  label: string;
  allowNone?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-encre">{label}</span>
      <select
        aria-label={label}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? (e.target.value as T) : undefined)}
        className={fieldInputClass}
      >
        {allowNone ? <option value="">—</option> : null}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
