'use client';

import type { WizardDescriptorValue, FormFields } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { FormEditor } from './FormEditor';
import { fieldInputClass } from './styles';

export function WizardEditor({ value, onChange }: { value: WizardDescriptorValue; onChange: (v: WizardDescriptorValue) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre</span>
        <input className={fieldInputClass} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <ArrayField<FormFields>
        label="Étapes"
        items={value.steps}
        onChange={(steps) => onChange({ ...value, steps })}
        newItem={() => ({ title: '', fields: [] })}
        renderItem={(step, _i, onItemChange) => <FormEditor value={step} onChange={onItemChange} />}
      />
    </div>
  );
}
