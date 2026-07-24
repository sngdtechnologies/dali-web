'use client';

import type { SduiBlockValue } from '@/lib/admin/descriptor-types';
import { TokenSelect } from './TokenSelect';
import { fieldInputClass } from './styles';

type QuickAmountBlock = Extract<SduiBlockValue, { type: 'quickAmount' }>;
type TextFieldBlock = Extract<SduiBlockValue, { type: 'textField' }>;
type DatePickerBlock = Extract<SduiBlockValue, { type: 'datePicker' }>;

const splitStrings = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);

export function QuickAmountBlockEditor({ block, onChange }: { block: QuickAmountBlock; onChange: (b: QuickAmountBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Clé" value={block.key} onChange={(e) => onChange({ ...block, key: e.target.value })} />
        <input className={fieldInputClass} placeholder="Valeur" value={block.value} onChange={(e) => onChange({ ...block, value: e.target.value })} />
      </div>
      <input className={fieldInputClass} placeholder="Label" value={block.label ?? ''} onChange={(e) => onChange({ ...block, label: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Devise" value={block.ccy ?? ''} onChange={(e) => onChange({ ...block, ccy: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Montants suggérés (séparés par des virgules)</span>
        <input className={fieldInputClass} value={(block.presets ?? []).join(', ')} onChange={(e) => onChange({ ...block, presets: splitStrings(e.target.value) })} />
      </label>
      <input className={fieldInputClass} placeholder="Signe" value={block.sign ?? ''} onChange={(e) => onChange({ ...block, sign: e.target.value || undefined })} />
      <TokenSelect value={block.tone} onChange={(tone) => onChange({ ...block, tone })} label="Teinte" />
      <input className={fieldInputClass} placeholder="Clé conditionnant le signe positif" value={block.positiveWhenKey ?? ''} onChange={(e) => onChange({ ...block, positiveWhenKey: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Valeur conditionnant le signe positif" value={block.positiveWhenValue ?? ''} onChange={(e) => onChange({ ...block, positiveWhenValue: e.target.value || undefined })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" role="checkbox" aria-label="Modifiable" checked={block.editable ?? true} onChange={(e) => onChange({ ...block, editable: e.target.checked })} />
        <span>Modifiable</span>
      </label>
    </div>
  );
}

export function TextFieldBlockEditor({ block, onChange }: { block: TextFieldBlock; onChange: (b: TextFieldBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Clé" value={block.key} onChange={(e) => onChange({ ...block, key: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={block.label ?? ''} onChange={(e) => onChange({ ...block, label: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Indice (hint)" value={block.hint ?? ''} onChange={(e) => onChange({ ...block, hint: e.target.value })} />
      <input className={fieldInputClass} placeholder="Valeur" value={block.value ?? ''} onChange={(e) => onChange({ ...block, value: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Suggestions (séparées par des virgules)</span>
        <input className={fieldInputClass} value={(block.suggestions ?? []).join(', ')} onChange={(e) => onChange({ ...block, suggestions: splitStrings(e.target.value) })} />
      </label>
    </div>
  );
}

export function DatePickerBlockEditor({ block, onChange }: { block: DatePickerBlock; onChange: (b: DatePickerBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Clé" value={block.key} onChange={(e) => onChange({ ...block, key: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={block.label ?? ''} onChange={(e) => onChange({ ...block, label: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Date initiale</span>
        <input type="date" className={fieldInputClass} value={block.initial} onChange={(e) => onChange({ ...block, initial: e.target.value })} />
      </label>
    </div>
  );
}
