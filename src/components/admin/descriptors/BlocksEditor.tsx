'use client';

import type { SduiBlockValue, BlockScreenDescriptorValue } from '@/lib/admin/descriptor-types';
import { BLOCK_TYPES, SECTION_SURFACES } from '@/lib/admin/descriptor-types';
import { ArrayField } from './ArrayField';
import { EnumSelect } from './EnumSelect';
import { fieldInputClass } from './styles';
import {
  RichTextBlockEditor, AmountBlockEditor, IconTileBlockEditor,
  BadgeBlockEditor, KeyValuesBlockEditor, IconRowsBlockEditor,
} from './BlockEditorsGroupA';
import {
  InfoTileBlockEditor, StepHeaderBlockEditor, NoteBlockEditor,
  ButtonsBlockEditor, ProgressBlockEditor, AvatarsBlockEditor,
} from './BlockEditorsGroupB';
import {
  ImageBlockEditor, BarChartBlockEditor, LineChartBlockEditor,
  MonthSelectorBlockEditor, ToggleBlockEditor, ChipsBlockEditor,
} from './BlockEditorsGroupC';
import { QuickAmountBlockEditor, TextFieldBlockEditor, DatePickerBlockEditor } from './BlockEditorsGroupD';

function defaultBlock(type: SduiBlockValue['type']): SduiBlockValue {
  switch (type) {
    case 'section': return { type: 'section', children: [] };
    case 'row': return { type: 'row', children: [] };
    case 'grid': return { type: 'grid', children: [] };
    case 'richText': return { type: 'richText', spans: [] };
    case 'amount': return { type: 'amount', value: '' };
    case 'iconTile': return { type: 'iconTile', icon: '' };
    case 'badge': return { type: 'badge', label: '' };
    case 'keyValues': return { type: 'keyValues', rows: [] };
    case 'iconRows': return { type: 'iconRows', rows: [] };
    case 'infoTile': return { type: 'infoTile', icon: '', title: '' };
    case 'stepHeader': return { type: 'stepHeader', number: '', label: '' };
    case 'note': return { type: 'note', text: '' };
    case 'buttons': return { type: 'buttons', buttons: [] };
    case 'progress': return { type: 'progress', fraction: 0 };
    case 'avatars': return { type: 'avatars', rows: [] };
    case 'image': return { type: 'image' };
    case 'barChart': return { type: 'barChart', bars: [] };
    case 'lineChart': return { type: 'lineChart', points: [], labels: [] };
    case 'monthSelector': return { type: 'monthSelector', items: [] };
    case 'toggle': return { type: 'toggle', key: '', options: [], selected: '' };
    case 'chips': return { type: 'chips', key: '', options: [], selected: '' };
    case 'quickAmount': return { type: 'quickAmount', key: '', value: '' };
    case 'textField': return { type: 'textField', key: '' };
    case 'datePicker': return { type: 'datePicker', key: '', initial: new Date().toISOString().slice(0, 10) };
  }
}

export function BlockListEditor({ blocks, onChange }: { blocks: SduiBlockValue[]; onChange: (b: SduiBlockValue[]) => void }) {
  return (
    <ArrayField<SduiBlockValue>
      label="Blocs"
      items={blocks}
      onChange={onChange}
      newItem={() => defaultBlock('note')}
      renderItem={(block, _i, onItemChange) => <BlockNodeEditor block={block} onChange={onItemChange} />}
    />
  );
}

export function BlockNodeEditor({ block, onChange }: { block: SduiBlockValue; onChange: (b: SduiBlockValue) => void }) {
  const typeSwitcher = (
    <EnumSelect value={block.type} onChange={(t) => onChange(defaultBlock(t ?? 'note'))} options={BLOCK_TYPES} label="Type de bloc" />
  );

  switch (block.type) {
    case 'section':
      return (
        <div className="flex flex-col gap-2">
          {typeSwitcher}
          <input className={fieldInputClass} placeholder="Overline" value={block.overline ?? ''} onChange={(e) => onChange({ ...block, overline: e.target.value || undefined })} />
          <EnumSelect value={block.surface} onChange={(surface) => onChange({ ...block, surface })} options={SECTION_SURFACES} label="Surface" allowNone />
          <input className={fieldInputClass} placeholder="Action" value={block.action ?? ''} onChange={(e) => onChange({ ...block, action: e.target.value || undefined })} />
          <input className={fieldInputClass} placeholder="Icône" value={block.icon ?? ''} onChange={(e) => onChange({ ...block, icon: e.target.value || undefined })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={block.centered ?? false} onChange={(e) => onChange({ ...block, centered: e.target.checked })} />
            <span>Centré</span>
          </label>
          <BlockListEditor blocks={block.children} onChange={(children) => onChange({ ...block, children })} />
        </div>
      );
    case 'row':
      return (
        <div className="flex flex-col gap-2">
          {typeSwitcher}
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-encre">Espacement</span>
            <input type="number" className={fieldInputClass} value={block.gap ?? 8} onChange={(e) => onChange({ ...block, gap: Number(e.target.value) })} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={block.expand ?? true} onChange={(e) => onChange({ ...block, expand: e.target.checked })} />
            <span>Étendre</span>
          </label>
          <BlockListEditor blocks={block.children} onChange={(children) => onChange({ ...block, children })} />
        </div>
      );
    case 'grid':
      return (
        <div className="flex flex-col gap-2">
          {typeSwitcher}
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-encre">Colonnes</span>
            <input type="number" className={fieldInputClass} value={block.columns ?? 2} onChange={(e) => onChange({ ...block, columns: Number(e.target.value) })} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-encre">Espacement</span>
            <input type="number" className={fieldInputClass} value={block.gap ?? 8} onChange={(e) => onChange({ ...block, gap: Number(e.target.value) })} />
          </label>
          <BlockListEditor blocks={block.children} onChange={(children) => onChange({ ...block, children })} />
        </div>
      );
    case 'richText': return <div className="flex flex-col gap-2">{typeSwitcher}<RichTextBlockEditor block={block} onChange={onChange} /></div>;
    case 'amount': return <div className="flex flex-col gap-2">{typeSwitcher}<AmountBlockEditor block={block} onChange={onChange} /></div>;
    case 'iconTile': return <div className="flex flex-col gap-2">{typeSwitcher}<IconTileBlockEditor block={block} onChange={onChange} /></div>;
    case 'badge': return <div className="flex flex-col gap-2">{typeSwitcher}<BadgeBlockEditor block={block} onChange={onChange} /></div>;
    case 'keyValues': return <div className="flex flex-col gap-2">{typeSwitcher}<KeyValuesBlockEditor block={block} onChange={onChange} /></div>;
    case 'iconRows': return <div className="flex flex-col gap-2">{typeSwitcher}<IconRowsBlockEditor block={block} onChange={onChange} /></div>;
    case 'infoTile': return <div className="flex flex-col gap-2">{typeSwitcher}<InfoTileBlockEditor block={block} onChange={onChange} /></div>;
    case 'stepHeader': return <div className="flex flex-col gap-2">{typeSwitcher}<StepHeaderBlockEditor block={block} onChange={onChange} /></div>;
    case 'note': return <div className="flex flex-col gap-2">{typeSwitcher}<NoteBlockEditor block={block} onChange={onChange} /></div>;
    case 'buttons': return <div className="flex flex-col gap-2">{typeSwitcher}<ButtonsBlockEditor block={block} onChange={onChange} /></div>;
    case 'progress': return <div className="flex flex-col gap-2">{typeSwitcher}<ProgressBlockEditor block={block} onChange={onChange} /></div>;
    case 'avatars': return <div className="flex flex-col gap-2">{typeSwitcher}<AvatarsBlockEditor block={block} onChange={onChange} /></div>;
    case 'image': return <div className="flex flex-col gap-2">{typeSwitcher}<ImageBlockEditor block={block} onChange={onChange} /></div>;
    case 'barChart': return <div className="flex flex-col gap-2">{typeSwitcher}<BarChartBlockEditor block={block} onChange={onChange} /></div>;
    case 'lineChart': return <div className="flex flex-col gap-2">{typeSwitcher}<LineChartBlockEditor block={block} onChange={onChange} /></div>;
    case 'monthSelector': return <div className="flex flex-col gap-2">{typeSwitcher}<MonthSelectorBlockEditor block={block} onChange={onChange} /></div>;
    case 'toggle': return <div className="flex flex-col gap-2">{typeSwitcher}<ToggleBlockEditor block={block} onChange={onChange} /></div>;
    case 'chips': return <div className="flex flex-col gap-2">{typeSwitcher}<ChipsBlockEditor block={block} onChange={onChange} /></div>;
    case 'quickAmount': return <div className="flex flex-col gap-2">{typeSwitcher}<QuickAmountBlockEditor block={block} onChange={onChange} /></div>;
    case 'textField': return <div className="flex flex-col gap-2">{typeSwitcher}<TextFieldBlockEditor block={block} onChange={onChange} /></div>;
    case 'datePicker': return <div className="flex flex-col gap-2">{typeSwitcher}<DatePickerBlockEditor block={block} onChange={onChange} /></div>;
  }
}

export function BlocksEditor({ value, onChange }: { value: BlockScreenDescriptorValue; onChange: (v: BlockScreenDescriptorValue) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-encre">Titre</span>
        <input className={fieldInputClass} value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <BlockListEditor blocks={value.blocks} onChange={(blocks) => onChange({ ...value, blocks })} />
    </div>
  );
}
