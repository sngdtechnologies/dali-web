'use client';

import type { ListDescriptorValue, CardItem } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { fieldInputClass } from './styles';

function CardItemEditor({ item, onChange }: { item: CardItem; onChange: (c: CardItem) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Titre" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} />
      <input className={fieldInputClass} placeholder="Sous-titre" value={item.subtitle ?? ''} onChange={(e) => onChange({ ...item, subtitle: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Texte de fin (trailing)" value={item.trailing ?? ''} onChange={(e) => onChange({ ...item, trailing: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Action" value={item.action ?? ''} onChange={(e) => onChange({ ...item, action: e.target.value || undefined })} />
    </div>
  );
}

export function ListEditor({ value, onChange }: { value: ListDescriptorValue; onChange: (v: ListDescriptorValue) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre</span>
        <input className={fieldInputClass} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Message si vide</span>
        <input className={fieldInputClass} value={value.emptyLabel ?? ''} onChange={(e) => onChange({ ...value, emptyLabel: e.target.value || undefined })} />
      </label>
      <ArrayField<CardItem>
        label="Éléments"
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        newItem={() => ({ title: '' })}
        renderItem={(item, _i, onItemChange) => <CardItemEditor item={item} onChange={onItemChange} />}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          role="checkbox"
          aria-label="Bouton flottant (FAB)"
          checked={value.fab !== undefined}
          onChange={(e) => onChange({ ...value, fab: e.target.checked ? { label: '' } : undefined })}
        />
        <span className="font-medium text-encre">Bouton flottant (FAB)</span>
      </label>
      {value.fab ? (
        <div className="flex flex-col gap-2 rounded-dali-md border border-encre/10 p-3">
          <input
            className={fieldInputClass}
            placeholder="Label du FAB"
            value={value.fab.label}
            onChange={(e) => onChange({ ...value, fab: { ...value.fab!, label: e.target.value } })}
          />
          <input
            className={fieldInputClass}
            placeholder="Action du FAB"
            value={value.fab.action ?? ''}
            onChange={(e) => onChange({ ...value, fab: { ...value.fab!, action: e.target.value || undefined } })}
          />
        </div>
      ) : null}
    </div>
  );
}
