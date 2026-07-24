'use client';

import type { SduiBlockValue, ChartBarValue, MonthCellValue, ToggleOptionValue, ChipOptionValue } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { TokenSelect } from './TokenSelect';
import { fieldInputClass } from './styles';

type ImageBlock = Extract<SduiBlockValue, { type: 'image' }>;
type BarChartBlock = Extract<SduiBlockValue, { type: 'barChart' }>;
type LineChartBlock = Extract<SduiBlockValue, { type: 'lineChart' }>;
type MonthSelectorBlock = Extract<SduiBlockValue, { type: 'monthSelector' }>;
type ToggleBlock = Extract<SduiBlockValue, { type: 'toggle' }>;
type ChipsBlock = Extract<SduiBlockValue, { type: 'chips' }>;

const splitStrings = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);
const splitNumbers = (s: string) => s.split(',').map((x) => Number(x.trim())).filter((n) => !Number.isNaN(n));

export function ImageBlockEditor({ block, onChange }: { block: ImageBlock; onChange: (b: ImageBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Chemin de l'asset" value={block.assetPath ?? ''} onChange={(e) => onChange({ ...block, assetPath: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Ratio (largeur/hauteur)</span>
        <input type="number" step="0.01" className={fieldInputClass} value={block.aspectRatio ?? ''} onChange={(e) => onChange({ ...block, aspectRatio: e.target.value === '' ? undefined : Number(e.target.value) })} />
      </label>
      <input className={fieldInputClass} placeholder="Légende" value={block.caption ?? ''} onChange={(e) => onChange({ ...block, caption: e.target.value || undefined })} />
    </div>
  );
}

function ChartBarEditor({ bar, onChange }: { bar: ChartBarValue; onChange: (b: ChartBarValue) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Label" value={bar.label} onChange={(e) => onChange({ ...bar, label: e.target.value })} />
      <input type="number" className={fieldInputClass} placeholder="Valeur" value={bar.value} onChange={(e) => onChange({ ...bar, value: Number(e.target.value) })} />
      <label className="flex items-center gap-1 whitespace-nowrap text-xs">
        <input type="checkbox" checked={bar.highlight ?? false} onChange={(e) => onChange({ ...bar, highlight: e.target.checked })} />
        Surligné
      </label>
    </div>
  );
}

export function BarChartBlockEditor({ block, onChange }: { block: BarChartBlock; onChange: (b: BarChartBlock) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <ArrayField<ChartBarValue>
        label="Barres"
        items={block.bars}
        onChange={(bars) => onChange({ ...block, bars })}
        newItem={() => ({ label: '', value: 0 })}
        renderItem={(bar, _i, onItemChange) => <ChartBarEditor bar={bar} onChange={onItemChange} />}
      />
      <input className={fieldInputClass} placeholder="Label du pied" value={block.footerLabel ?? ''} onChange={(e) => onChange({ ...block, footerLabel: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Valeur du pied" value={block.footerValue ?? ''} onChange={(e) => onChange({ ...block, footerValue: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Suffixe du pied" value={block.footerSuffix ?? ''} onChange={(e) => onChange({ ...block, footerSuffix: e.target.value || undefined })} />
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Labels des axes (séparés par des virgules)</span>
        <input className={fieldInputClass} value={(block.axisLabels ?? []).join(', ')} onChange={(e) => onChange({ ...block, axisLabels: splitStrings(e.target.value) })} />
      </label>
      <TokenSelect value={block.highlightToken} onChange={(highlightToken) => onChange({ ...block, highlightToken })} label="Couleur de surlignage" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={block.onDark ?? false} onChange={(e) => onChange({ ...block, onDark: e.target.checked })} />
        <span>Fond sombre</span>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={block.dense ?? false} onChange={(e) => onChange({ ...block, dense: e.target.checked })} />
        <span>Dense</span>
      </label>
    </div>
  );
}

export function LineChartBlockEditor({ block, onChange }: { block: LineChartBlock; onChange: (b: LineChartBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Points (séparés par des virgules)</span>
        <input className={fieldInputClass} value={block.points.join(', ')} onChange={(e) => onChange({ ...block, points: splitNumbers(e.target.value) })} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Labels (séparés par des virgules)</span>
        <input className={fieldInputClass} value={block.labels.join(', ')} onChange={(e) => onChange({ ...block, labels: splitStrings(e.target.value) })} />
      </label>
    </div>
  );
}

function MonthCellEditor({ cell, onChange }: { cell: MonthCellValue; onChange: (c: MonthCellValue) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Label" value={cell.label} onChange={(e) => onChange({ ...cell, label: e.target.value })} />
      <input className={fieldInputClass} placeholder="Valeur" value={cell.value} onChange={(e) => onChange({ ...cell, value: e.target.value })} />
      <label className="flex items-center gap-1 whitespace-nowrap text-xs">
        <input type="checkbox" checked={cell.current ?? false} onChange={(e) => onChange({ ...cell, current: e.target.checked })} />
        Courant
      </label>
    </div>
  );
}

export function MonthSelectorBlockEditor({ block, onChange }: { block: MonthSelectorBlock; onChange: (b: MonthSelectorBlock) => void }) {
  return (
    <ArrayField<MonthCellValue>
      label="Mois"
      items={block.items}
      onChange={(items) => onChange({ ...block, items })}
      newItem={() => ({ label: '', value: '' })}
      renderItem={(cell, _i, onItemChange) => <MonthCellEditor cell={cell} onChange={onItemChange} />}
    />
  );
}

function ToggleOptionEditor({ option, onChange }: { option: ToggleOptionValue; onChange: (o: ToggleOptionValue) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Id" value={option.id} onChange={(e) => onChange({ ...option, id: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={option.label} onChange={(e) => onChange({ ...option, label: e.target.value })} />
      <TokenSelect value={option.tone} onChange={(tone) => onChange({ ...option, tone })} label="Teinte" />
    </div>
  );
}

export function ToggleBlockEditor({ block, onChange }: { block: ToggleBlock; onChange: (b: ToggleBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Clé" value={block.key} onChange={(e) => onChange({ ...block, key: e.target.value })} />
      <input className={fieldInputClass} placeholder="Sélection" value={block.selected} onChange={(e) => onChange({ ...block, selected: e.target.value })} />
      <ArrayField<ToggleOptionValue>
        label="Options"
        items={block.options}
        onChange={(options) => onChange({ ...block, options })}
        newItem={() => ({ id: '', label: '' })}
        renderItem={(option, _i, onItemChange) => <ToggleOptionEditor option={option} onChange={onItemChange} />}
      />
    </div>
  );
}

function ChipOptionEditor({ option, onChange }: { option: ChipOptionValue; onChange: (o: ChipOptionValue) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input className={fieldInputClass} placeholder="Id" value={option.id} onChange={(e) => onChange({ ...option, id: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={option.label} onChange={(e) => onChange({ ...option, label: e.target.value })} />
      <TokenSelect value={option.tone} onChange={(tone) => onChange({ ...option, tone })} label="Teinte" />
    </div>
  );
}

export function ChipsBlockEditor({ block, onChange }: { block: ChipsBlock; onChange: (b: ChipsBlock) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <input className={fieldInputClass} placeholder="Clé" value={block.key} onChange={(e) => onChange({ ...block, key: e.target.value })} />
      <input className={fieldInputClass} placeholder="Label" value={block.label ?? ''} onChange={(e) => onChange({ ...block, label: e.target.value || undefined })} />
      <input className={fieldInputClass} placeholder="Sélection" value={block.selected} onChange={(e) => onChange({ ...block, selected: e.target.value })} />
      <ArrayField<ChipOptionValue>
        label="Options"
        items={block.options}
        onChange={(options) => onChange({ ...block, options })}
        newItem={() => ({ id: '', label: '' })}
        renderItem={(option, _i, onItemChange) => <ChipOptionEditor option={option} onChange={onItemChange} />}
      />
    </div>
  );
}
