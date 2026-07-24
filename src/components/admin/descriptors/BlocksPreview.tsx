import type { SduiBlockValue } from '@/lib/admin/descriptor-types';
import { daliColors } from '@/lib/design/tokens';
import { previewColor, previewTextStyle } from './preview-tokens';

// Mobile's SectionSurface -> background switch (block_renderer.dart) has no
// equivalent in the web design tokens (it's a mobile-render-only concern), so
// these stay local to the preview rather than growing the shared token file.
const SURFACE_BG: Record<string, string> = {
  none: 'transparent',
  card: '#FFFFFF',
  forestHero: daliColors.foret[800],
  tintedForest: daliColors.foret[50],
  tintedOr: daliColors.or[100],
  tintedAttention: '#F7E9CE',
};

export function BlockPreview({ block }: { block: SduiBlockValue }) {
  switch (block.type) {
    case 'section':
      return (
        <div style={{ background: SURFACE_BG[block.surface ?? 'none'], padding: 12, borderRadius: 12, textAlign: block.centered ? 'center' : undefined }} className="flex flex-col gap-2">
          {block.overline ? <div style={{ ...previewTextStyle('overline'), color: previewColor('fg3') }}>{block.overline}</div> : null}
          {block.children.map((c, i) => <BlockPreview key={i} block={c} />)}
        </div>
      );
    case 'row':
      return <div className="flex" style={{ gap: block.gap ?? 8 }}>{block.children.map((c, i) => <BlockPreview key={i} block={c} />)}</div>;
    case 'grid':
      return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${block.columns ?? 2}, 1fr)`, gap: block.gap ?? 8 }}>
          {block.children.map((c, i) => <BlockPreview key={i} block={c} />)}
        </div>
      );
    case 'richText':
      return (
        <p style={{ textAlign: (block.align ?? 'start') as React.CSSProperties['textAlign'] }}>
          {block.spans.map((s, i) => (
            <span key={i} style={{ ...previewTextStyle(s.role), color: previewColor(s.color, previewColor('fg1')), fontStyle: s.italic ? 'italic' : undefined }}>
              {s.text}
            </span>
          ))}
        </p>
      );
    case 'amount':
      return (
        <span style={{ fontSize: block.size ?? 24, color: previewColor(block.color, previewColor('fg1')), fontFamily: block.serif ? 'serif' : undefined }}>
          {block.sign ?? ''}{block.value} {block.ccy ?? 'FCFA'}
        </span>
      );
    case 'iconTile':
      return <div style={{ width: block.size ?? 64, height: block.size ?? 64, borderRadius: '50%', background: previewColor(block.tone, daliColors.foret[100]) }} title={block.icon} />;
    case 'badge':
      return <span style={{ borderRadius: 999, padding: '2px 10px', fontSize: 12, background: daliColors.sable[100], color: previewColor('fg1') }}>{block.label}</span>;
    case 'keyValues':
      return (
        <div className="flex flex-col gap-1">
          {block.rows.map((r, i) => (
            <div key={i} className="flex justify-between text-sm" style={{ fontFamily: r.mono ? 'monospace' : undefined }}>
              <span style={{ color: previewColor('fg3') }}>{r.label}</span><span>{r.value}</span>
            </div>
          ))}
        </div>
      );
    case 'iconRows':
      return (
        <div className="flex flex-col gap-2">
          {block.rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{r.title}</span>{r.trailingText ? <span style={{ color: previewColor('fg3') }}>{r.trailingText}</span> : null}
            </div>
          ))}
        </div>
      );
    case 'infoTile':
      return (
        <div className="flex flex-col gap-1 rounded-dali-md p-3" style={{ background: previewColor(block.tone, daliColors.foret[50]) }}>
          <div style={previewTextStyle('serifTitle')}>{block.title}</div>
          {block.subtitle ? <div style={{ ...previewTextStyle('small'), color: previewColor('fg2') }}>{block.subtitle}</div> : null}
        </div>
      );
    case 'stepHeader':
      return <div className="flex items-center gap-2"><span style={{ color: previewColor(block.tone, previewColor('serenite')) }}>{block.number}</span><span style={previewTextStyle('small')}>{block.label}</span></div>;
    case 'note':
      return <p style={{ fontStyle: (block.italic ?? true) ? 'italic' : undefined, ...previewTextStyle('small') }}>{block.text}</p>;
    case 'buttons':
      return (
        <div className="flex gap-2">
          {block.buttons.map((b, i) => (
            <span key={i} className="rounded-dali-full px-4 py-2 text-sm" style={{ background: b.variant === 'secondary' ? '#FFFFFF' : daliColors.foret[800], color: b.variant === 'secondary' ? previewColor('fg1') : daliColors.ivoire }}>
              {b.label}
            </span>
          ))}
        </div>
      );
    case 'progress':
      return (
        <div className="flex flex-col gap-1">
          {block.label ? <span style={previewTextStyle('small')}>{block.label}</span> : null}
          <div style={{ height: 6, borderRadius: 3, background: daliColors.sable[100] }}>
            <div style={{ height: 6, borderRadius: 3, width: `${Math.min(100, Math.max(0, block.fraction * 100))}%`, background: previewColor(block.tone, previewColor('serenite')) }} />
          </div>
        </div>
      );
    case 'avatars':
      return (
        <div className="flex flex-col gap-2">
          {block.rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: daliColors.foret[100] }}>{r.initials}</span>
              <span>{r.name}</span>
              <span style={{ color: previewColor('fg3') }}>{r.status.label}</span>
            </div>
          ))}
        </div>
      );
    case 'image':
      return <div className="flex items-center justify-center rounded-dali-md text-xs" style={{ aspectRatio: block.aspectRatio ?? 4 / 3, background: daliColors.sable[100], color: previewColor('fg3') }}>{block.caption ?? 'image'}</div>;
    case 'barChart':
      return (
        <div className="flex items-end gap-1" style={{ height: 60 }}>
          {block.bars.map((b, i) => (
            <div key={i} style={{ width: 6, height: `${Math.min(100, b.value)}%`, background: b.highlight ? previewColor(block.highlightToken, previewColor('or500')) : daliColors.sable[200] }} title={b.label} />
          ))}
        </div>
      );
    case 'lineChart':
      return <div className="text-xs" style={{ color: previewColor('fg3') }}>Courbe · {block.points.length} points</div>;
    case 'monthSelector':
      return (
        <div className="flex gap-2">
          {block.items.map((m, i) => (
            <span key={i} className="rounded-dali-full px-3 py-1 text-xs" style={{ background: m.current ? daliColors.foret[800] : daliColors.sable[100], color: m.current ? daliColors.ivoire : previewColor('fg1') }}>{m.label}</span>
          ))}
        </div>
      );
    case 'toggle':
      return (
        <div className="flex gap-1 rounded-dali-full p-1" style={{ background: daliColors.sable[100] }}>
          {block.options.map((o) => (
            <span key={o.id} className="rounded-dali-full px-3 py-1 text-xs" style={{ background: o.id === block.selected ? '#FFFFFF' : 'transparent' }}>{o.label}</span>
          ))}
        </div>
      );
    case 'chips':
      return (
        <div className="flex flex-wrap gap-2">
          {block.options.map((o) => (
            <span key={o.id} className="rounded-dali-full px-3 py-1 text-xs" style={{ background: o.id === block.selected ? previewColor(o.tone, daliColors.foret[800]) : daliColors.sable[100], color: o.id === block.selected ? daliColors.ivoire : previewColor('fg1') }}>{o.label}</span>
          ))}
        </div>
      );
    case 'quickAmount':
      return <div style={{ ...previewTextStyle('h2'), color: previewColor(block.tone, previewColor('fg1')) }}>{block.sign ?? ''}{block.value} {block.ccy ?? 'FCFA'}</div>;
    case 'textField':
      return (
        <div className="rounded-dali-md border px-3 py-2 text-sm" style={{ borderColor: daliColors.sable[300], color: block.value ? previewColor('fg1') : previewColor('fg3') }}>
          {block.value || block.hint || block.label || ''}
        </div>
      );
    case 'datePicker':
      return <div className="rounded-dali-md border px-3 py-2 text-sm" style={{ borderColor: daliColors.sable[300] }}>{block.label ? `${block.label}: ` : ''}{block.initial}</div>;
  }
}
