'use client';

import type { FormFields, FieldValue, SelectOption, DocItem } from '@/lib/admin/descriptor-types';
import { FIELD_KINDS } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { EnumSelect } from './EnumSelect';
import { fieldInputClass } from './styles';

function defaultField(kind: FieldValue['kind'], key: string, label: string): FieldValue {
  switch (kind) {
    case 'text': return { kind: 'text', key, label };
    case 'amount': return { kind: 'amount', key, label };
    case 'toggle': return { kind: 'toggle', key, label };
    case 'select': return { kind: 'select', key, label, options: [] };
    case 'sectionHeader': return { kind: 'sectionHeader', key, label };
    case 'recap': return { kind: 'recap', key, label, options: [] };
    case 'docs': return { kind: 'docs', key, label, docs: [] };
    case 'total': return { kind: 'total', key, label, value: '' };
  }
}

function SelectOptionEditor({ option, onChange }: { option: SelectOption; onChange: (o: SelectOption) => void }) {
  return (
    <div className="flex gap-2">
      <input className={fieldInputClass} placeholder="Valeur" value={option.value} onChange={(e) => onChange({ ...option, value: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={option.label} onChange={(e) => onChange({ ...option, label: e.target.value })} />
      <input className={fieldInputClass} placeholder="Icône" value={option.icon ?? ''} onChange={(e) => onChange({ ...option, icon: e.target.value || undefined })} />
    </div>
  );
}

function DocItemEditor({ doc, onChange }: { doc: DocItem; onChange: (d: DocItem) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Icône" value={doc.icon} onChange={(e) => onChange({ ...doc, icon: e.target.value })} />
      <input className={fieldInputClass} placeholder="Titre" value={doc.title} onChange={(e) => onChange({ ...doc, title: e.target.value })} />
      <label className="flex items-center gap-1 whitespace-nowrap text-xs">
        <input type="checkbox" checked={doc.added ?? false} onChange={(e) => onChange({ ...doc, added: e.target.checked })} />
        Ajouté
      </label>
    </div>
  );
}

function FieldEditor({ field, onChange }: { field: FieldValue; onChange: (f: FieldValue) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Clé" value={field.key} onChange={(e) => onChange({ ...field, key: e.target.value } as FieldValue)} />
        <input className={fieldInputClass} placeholder="Label" value={field.label} onChange={(e) => onChange({ ...field, label: e.target.value } as FieldValue)} />
        <EnumSelect value={field.kind} onChange={(k) => onChange(defaultField(k ?? 'text', field.key, field.label))} options={FIELD_KINDS} label="Type" />
      </div>
      {(field.kind === 'text' || field.kind === 'amount') ? (
        <input className={fieldInputClass} placeholder="Valeur" value={field.value ?? ''} onChange={(e) => onChange({ ...field, value: e.target.value || undefined })} />
      ) : null}
      {field.kind === 'total' ? (
        <input className={fieldInputClass} placeholder="Valeur" value={field.value} onChange={(e) => onChange({ ...field, value: e.target.value })} />
      ) : null}
      {(field.kind === 'select' || field.kind === 'recap') ? (
        <ArrayField<SelectOption>
          label="Options"
          items={field.options}
          onChange={(options) => onChange({ ...field, options })}
          newItem={() => ({ value: '', label: '' })}
          renderItem={(opt, _i, onItemChange) => <SelectOptionEditor option={opt} onChange={onItemChange} />}
        />
      ) : null}
      {field.kind === 'docs' ? (
        <ArrayField<DocItem>
          label="Documents"
          items={field.docs}
          onChange={(docs) => onChange({ ...field, docs })}
          newItem={() => ({ icon: '', title: '' })}
          renderItem={(doc, _i, onItemChange) => <DocItemEditor doc={doc} onChange={onItemChange} />}
        />
      ) : null}
      {field.kind === 'select' ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={field.grid ?? false} onChange={(e) => onChange({ ...field, grid: e.target.checked })} />
          <span>Affichage en grille</span>
        </label>
      ) : null}
    </div>
  );
}

export function FormEditor({ value, onChange }: { value: FormFields; onChange: (v: FormFields) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre</span>
        <input className={fieldInputClass} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Sous-titre</span>
        <input className={fieldInputClass} value={value.subtitle ?? ''} onChange={(e) => onChange({ ...value, subtitle: e.target.value || undefined })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Label du bouton de validation</span>
        <input className={fieldInputClass} value={value.submitLabel ?? ''} onChange={(e) => onChange({ ...value, submitLabel: e.target.value || undefined })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Label d&apos;étape (wizard)</span>
        <input className={fieldInputClass} value={value.stepLabel ?? ''} onChange={(e) => onChange({ ...value, stepLabel: e.target.value || undefined })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre stylé</span>
        <input className={fieldInputClass} value={value.heading ?? ''} onChange={(e) => onChange({ ...value, heading: e.target.value || undefined })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre stylé (partie en italique)</span>
        <input className={fieldInputClass} value={value.headingEmphasis ?? ''} onChange={(e) => onChange({ ...value, headingEmphasis: e.target.value || undefined })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Label d&apos;édition (recap)</span>
        <input className={fieldInputClass} value={value.editLabel ?? ''} onChange={(e) => onChange({ ...value, editLabel: e.target.value || undefined })} />
      </label>
      <ArrayField<FieldValue>
        label="Champs"
        items={value.fields}
        onChange={(fields) => onChange({ ...value, fields })}
        newItem={() => ({ kind: 'text', key: '', label: '' })}
        renderItem={(field, _i, onItemChange) => <FieldEditor field={field} onChange={onItemChange} />}
      />
    </div>
  );
}
