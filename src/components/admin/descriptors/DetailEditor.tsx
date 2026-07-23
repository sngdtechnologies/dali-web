'use client';

import type { DetailDescriptorValue, DetailSection, DetailRow } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { fieldInputClass } from './styles';

function RowEditor({ row, onChange }: { row: DetailRow; onChange: (r: DetailRow) => void }) {
  return (
    <div className="flex gap-2">
      <input className={fieldInputClass} placeholder="Label" value={row.label} onChange={(e) => onChange({ ...row, label: e.target.value })} />
      <input className={fieldInputClass} placeholder="Valeur" value={row.value} onChange={(e) => onChange({ ...row, value: e.target.value })} />
    </div>
  );
}

function SectionEditor({ section, onChange }: { section: DetailSection; onChange: (s: DetailSection) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className={fieldInputClass}
        placeholder="Label de section (optionnel)"
        value={section.label ?? ''}
        onChange={(e) => onChange({ ...section, label: e.target.value || undefined })}
      />
      <ArrayField<DetailRow>
        items={section.rows}
        onChange={(rows) => onChange({ ...section, rows })}
        newItem={() => ({ label: '', value: '' })}
        renderItem={(row, _i, onItemChange) => <RowEditor row={row} onChange={onItemChange} />}
      />
    </div>
  );
}

export function DetailEditor({ value, onChange }: { value: DetailDescriptorValue; onChange: (v: DetailDescriptorValue) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre</span>
        <input className={fieldInputClass} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <ArrayField<DetailSection>
        label="Sections"
        items={value.sections}
        onChange={(sections) => onChange({ ...value, sections })}
        newItem={() => ({ rows: [] })}
        renderItem={(section, _i, onItemChange) => <SectionEditor section={section} onChange={onItemChange} />}
      />
    </div>
  );
}
