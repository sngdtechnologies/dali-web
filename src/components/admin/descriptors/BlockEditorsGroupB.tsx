'use client';

import type { SduiBlockValue, BlockButtonValue, AvatarRowValue, AvatarStatusValue, BadgeVariant } from '@/lib/admin/descriptor-types';
import { BUTTON_VARIANTS, BADGE_VARIANTS } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { EnumSelect } from './EnumSelect';
import { TokenSelect } from './TokenSelect';
import { fieldInputClass } from './styles';

type InfoTileBlock = Extract<SduiBlockValue, { type: 'infoTile' }>;
type StepHeaderBlock = Extract<SduiBlockValue, { type: 'stepHeader' }>;
type NoteBlock = Extract<SduiBlockValue, { type: 'note' }>;
type ButtonsBlock = Extract<SduiBlockValue, { type: 'buttons' }>;
type ProgressBlock = Extract<SduiBlockValue, { type: 'progress' }>;
type AvatarsBlock = Extract<SduiBlockValue, { type: 'avatars' }>;

export function InfoTileBlockEditor({ block, onChange }: { block: InfoTileBlock; onChange: (b: InfoTileBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Icône" value={block.icon} onChange={(e) => onChange({ ...block, icon: e.target.value })} />
      <input className={fieldInputClass} placeholder="Titre" value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
      <input className={fieldInputClass} placeholder="Sous-titre" value={block.subtitle ?? ''} onChange={(e) => onChange({ ...block, subtitle: e.target.value || undefined })} />
      <TokenSelect value={block.tone} onChange={(tone) => onChange({ ...block, tone })} label="Teinte" />
    </div>
  );
}

export function StepHeaderBlockEditor({ block, onChange }: { block: StepHeaderBlock; onChange: (b: StepHeaderBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Numéro" value={block.number} onChange={(e) => onChange({ ...block, number: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
      <TokenSelect value={block.tone} onChange={(tone) => onChange({ ...block, tone })} label="Teinte" />
    </div>
  );
}

export function NoteBlockEditor({ block, onChange }: { block: NoteBlock; onChange: (b: NoteBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Texte" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" role="checkbox" aria-label="Italique" checked={block.italic ?? true} onChange={(e) => onChange({ ...block, italic: e.target.checked })} />
        <span>Italique</span>
      </label>
    </div>
  );
}

function BlockButtonEditor({ button, onChange }: { button: BlockButtonValue; onChange: (b: BlockButtonValue) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Label" value={button.label} onChange={(e) => onChange({ ...button, label: e.target.value })} />
        <EnumSelect value={button.variant} onChange={(variant) => onChange({ ...button, variant })} options={BUTTON_VARIANTS} label="Variante" allowNone />
      </div>
      <input className={fieldInputClass} placeholder="Action" value={button.action ?? ''} onChange={(e) => onChange({ ...button, action: e.target.value || undefined })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={button.submit ?? false} onChange={(e) => onChange({ ...button, submit: e.target.checked })} />
        <span>Soumet le formulaire</span>
      </label>
    </div>
  );
}

export function ButtonsBlockEditor({ block, onChange }: { block: ButtonsBlock; onChange: (b: ButtonsBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={block.expand ?? true} onChange={(e) => onChange({ ...block, expand: e.target.checked })} />
        <span>Étendre sur toute la largeur</span>
      </label>
      <ArrayField<BlockButtonValue>
        label="Boutons"
        items={block.buttons}
        onChange={(buttons) => onChange({ ...block, buttons })}
        newItem={() => ({ label: '' })}
        renderItem={(button, _i, onItemChange) => <BlockButtonEditor button={button} onChange={onItemChange} />}
      />
    </div>
  );
}

export function ProgressBlockEditor({ block, onChange }: { block: ProgressBlock; onChange: (b: ProgressBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Fraction (0 à 1)</span>
        <input type="number" step="0.01" className={fieldInputClass} value={block.fraction} onChange={(e) => onChange({ ...block, fraction: Number(e.target.value) })} />
      </label>
      <TokenSelect value={block.tone} onChange={(tone) => onChange({ ...block, tone })} label="Teinte" />
      <input className={fieldInputClass} placeholder="Label" value={block.label ?? ''} onChange={(e) => onChange({ ...block, label: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Texte de fin" value={block.trailing ?? ''} onChange={(e) => onChange({ ...block, trailing: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Texte de fin (atténué)" value={block.trailingMuted ?? ''} onChange={(e) => onChange({ ...block, trailingMuted: e.target.value || undefined })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={block.bold ?? false} onChange={(e) => onChange({ ...block, bold: e.target.checked })} />
        <span>Gras</span>
      </label>
    </div>
  );
}

function AvatarStatusEditor({ status, onChange }: { status: AvatarStatusValue; onChange: (s: AvatarStatusValue) => void }) {
  const isBadge = status.kind === 'badge';
  const variant = isBadge ? (status as { variant?: BadgeVariant }).variant : undefined;
  return (
    <div className="flex flex-col gap-2 rounded-dali-md border border-encre/10 p-2">
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          role="checkbox"
          aria-label="Statut en badge"
          checked={isBadge}
          onChange={(e) => onChange(e.target.checked ? { kind: 'badge', label: status.label ?? '' } : { label: status.label ?? '' })}
        />
        <span>Statut en badge</span>
      </label>
      <input className={fieldInputClass} placeholder="Label du statut" value={status.label ?? ''} onChange={(e) => onChange({ ...status, label: e.target.value })} />
      {isBadge ? (
        <EnumSelect value={variant} onChange={(v) => onChange({ kind: 'badge', label: status.label ?? '', variant: v })} options={BADGE_VARIANTS} label="Variante" allowNone />
      ) : null}
    </div>
  );
}

function AvatarRowEditor({ row, onChange }: { row: AvatarRowValue; onChange: (r: AvatarRowValue) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input className={fieldInputClass} placeholder="Initiales" value={row.initials} onChange={(e) => onChange({ ...row, initials: e.target.value })} />
        <input className={fieldInputClass} placeholder="Nom" value={row.name} onChange={(e) => onChange({ ...row, name: e.target.value })} />
      </div>
      <input className={fieldInputClass} placeholder="Rôle" value={row.role ?? ''} onChange={(e) => onChange({ ...row, role: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Sous-texte" value={row.sub ?? ''} onChange={(e) => onChange({ ...row, sub: e.target.value || undefined })} />
      <AvatarStatusEditor status={row.status} onChange={(status) => onChange({ ...row, status })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={row.highlight ?? false} onChange={(e) => onChange({ ...row, highlight: e.target.checked })} />
        <span>Mise en avant</span>
      </label>
    </div>
  );
}

export function AvatarsBlockEditor({ block, onChange }: { block: AvatarsBlock; onChange: (b: AvatarsBlock) => void }) {
  return (
    <ArrayField<AvatarRowValue>
      label="Personnes"
      items={block.rows}
      onChange={(rows) => onChange({ ...block, rows })}
      newItem={() => ({ initials: '', name: '', status: { label: '' } })}
      renderItem={(row, _i, onItemChange) => <AvatarRowEditor row={row} onChange={onItemChange} />}
    />
  );
}
