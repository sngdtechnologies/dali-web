'use client';

import type { SduiBlockValue, TextSpan, KvRow, IconRowValue } from '@/lib/admin/descriptor-types';
import { TEXT_ROLES, BADGE_VARIANTS } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { EnumSelect } from './EnumSelect';
import { TokenSelect } from './TokenSelect';
import { fieldInputClass } from './styles';

type RichTextBlock = Extract<SduiBlockValue, { type: 'richText' }>;
type AmountBlock = Extract<SduiBlockValue, { type: 'amount' }>;
type IconTileBlock = Extract<SduiBlockValue, { type: 'iconTile' }>;
type BadgeBlock = Extract<SduiBlockValue, { type: 'badge' }>;
type KeyValuesBlock = Extract<SduiBlockValue, { type: 'keyValues' }>;
type IconRowsBlock = Extract<SduiBlockValue, { type: 'iconRows' }>;

function SpanEditor({ span, onChange }: { span: TextSpan; onChange: (s: TextSpan) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Texte" value={span.text} onChange={(e) => onChange({ ...span, text: e.target.value })} />
      <div className="flex gap-2">
        <EnumSelect value={span.role} onChange={(role) => onChange({ ...span, role })} options={TEXT_ROLES} label="Rôle" allowNone />
        <TokenSelect value={span.color} onChange={(color) => onChange({ ...span, color })} label="Couleur" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={span.italic ?? false} onChange={(e) => onChange({ ...span, italic: e.target.checked })} />
        <span>Italique</span>
      </label>
    </div>
  );
}

export function RichTextBlockEditor({ block, onChange }: { block: RichTextBlock; onChange: (b: RichTextBlock) => void }) {
  return (
    <ArrayField<TextSpan>
      label="Portions de texte"
      items={block.spans}
      onChange={(spans) => onChange({ ...block, spans })}
      newItem={() => ({ text: '' })}
      renderItem={(span, _i, onItemChange) => <SpanEditor span={span} onChange={onItemChange} />}
    />
  );
}

export function AmountBlockEditor({ block, onChange }: { block: AmountBlock; onChange: (b: AmountBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Valeur" value={block.value} onChange={(e) => onChange({ ...block, value: e.target.value })} />
      <input className={fieldInputClass} placeholder="Devise" value={block.ccy ?? ''} onChange={(e) => onChange({ ...block, ccy: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Taille</span>
        <input type="number" className={fieldInputClass} value={block.size ?? ''} onChange={(e) => onChange({ ...block, size: e.target.value === '' ? undefined : Number(e.target.value) })} />
      </label>
      <TokenSelect value={block.color} onChange={(color) => onChange({ ...block, color })} label="Couleur" />
      <input className={fieldInputClass} placeholder="Signe" value={block.sign ?? ''} onChange={(e) => onChange({ ...block, sign: e.target.value || undefined })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" role="checkbox" aria-label="Serif" checked={block.serif ?? false} onChange={(e) => onChange({ ...block, serif: e.target.checked })} />
        <span>Serif</span>
      </label>
    </div>
  );
}

export function IconTileBlockEditor({ block, onChange }: { block: IconTileBlock; onChange: (b: IconTileBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Icône" value={block.icon} onChange={(e) => onChange({ ...block, icon: e.target.value })} />
      <TokenSelect value={block.tone} onChange={(tone) => onChange({ ...block, tone })} label="Teinte" />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Taille</span>
        <input type="number" className={fieldInputClass} value={block.size ?? ''} onChange={(e) => onChange({ ...block, size: e.target.value === '' ? undefined : Number(e.target.value) })} />
      </label>
    </div>
  );
}

export function BadgeBlockEditor({ block, onChange }: { block: BadgeBlock; onChange: (b: BadgeBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Label" value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
      <EnumSelect value={block.variant} onChange={(variant) => onChange({ ...block, variant })} options={BADGE_VARIANTS} label="Variante" allowNone />
    </div>
  );
}

function KvRowEditor({ row, onChange }: { row: KvRow; onChange: (r: KvRow) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Label" value={row.label} onChange={(e) => onChange({ ...row, label: e.target.value })} />
      <input className={fieldInputClass} placeholder="Valeur" value={row.value} onChange={(e) => onChange({ ...row, value: e.target.value })} />
      <label className="flex items-center gap-1 whitespace-nowrap text-xs">
        <input type="checkbox" checked={row.mono ?? false} onChange={(e) => onChange({ ...row, mono: e.target.checked })} />
        Mono
      </label>
    </div>
  );
}

export function KeyValuesBlockEditor({ block, onChange }: { block: KeyValuesBlock; onChange: (b: KeyValuesBlock) => void }) {
  return (
    <ArrayField<KvRow>
      label="Lignes"
      items={block.rows}
      onChange={(rows) => onChange({ ...block, rows })}
      newItem={() => ({ label: '', value: '' })}
      renderItem={(row, _i, onItemChange) => <KvRowEditor row={row} onChange={onItemChange} />}
    />
  );
}

function IconRowEditor({ row, onChange }: { row: IconRowValue; onChange: (r: IconRowValue) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Icône" value={row.icon} onChange={(e) => onChange({ ...row, icon: e.target.value })} />
        <input className={fieldInputClass} placeholder="Titre" value={row.title} onChange={(e) => onChange({ ...row, title: e.target.value })} />
      </div>
      <input className={fieldInputClass} placeholder="Sous-titre" value={row.subtitle ?? ''} onChange={(e) => onChange({ ...row, subtitle: e.target.value || undefined })} />
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Texte de fin" value={row.trailingText ?? ''} onChange={(e) => onChange({ ...row, trailingText: e.target.value || undefined })} />
        <EnumSelect value={row.trailingBadge} onChange={(trailingBadge) => onChange({ ...row, trailingBadge })} options={BADGE_VARIANTS} label="Badge de fin" allowNone />
      </div>
      <input className={fieldInputClass} placeholder="Action" value={row.action ?? ''} onChange={(e) => onChange({ ...row, action: e.target.value || undefined })} />
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Jour (date chip)" value={row.dateDay ?? ''} onChange={(e) => onChange({ ...row, dateDay: e.target.value || undefined })} />
        <input className={fieldInputClass} placeholder="Mois (date chip)" value={row.dateMonth ?? ''} onChange={(e) => onChange({ ...row, dateMonth: e.target.value || undefined })} />
      </div>
    </div>
  );
}

export function IconRowsBlockEditor({ block, onChange }: { block: IconRowsBlock; onChange: (b: IconRowsBlock) => void }) {
  return (
    <ArrayField<IconRowValue>
      label="Lignes"
      items={block.rows}
      onChange={(rows) => onChange({ ...block, rows })}
      newItem={() => ({ icon: '', title: '' })}
      renderItem={(row, _i, onItemChange) => <IconRowEditor row={row} onChange={onItemChange} />}
    />
  );
}
