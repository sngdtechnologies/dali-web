import type { ScreenDescriptorValue } from '@/lib/admin/descriptor-types';
import { daliColors } from '@/lib/design/tokens';
import { previewColor, previewTextStyle } from './preview-tokens';
import { BlockPreview } from './BlocksPreview';

export function DescriptorPreview({ value }: { value: ScreenDescriptorValue }) {
  return (
    <div className="rounded-dali-lg border p-4" style={{ borderColor: daliColors.sable[300], background: daliColors.ivoire }}>
      <div style={previewTextStyle('h2')}>{value.title}</div>
      <div className="mt-3 flex flex-col gap-3">
        {value.type === 'list' ? (
          value.items.length === 0 ? (
            <p style={{ ...previewTextStyle('small'), color: previewColor('fg3') }}>{value.emptyLabel ?? ''}</p>
          ) : (
            value.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.title}</span>
                {item.trailing ? <span style={{ color: previewColor('fg3') }}>{item.trailing}</span> : null}
              </div>
            ))
          )
        ) : null}
        {value.type === 'detail' ? (
          value.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-1">
              {section.label ? <div style={{ ...previewTextStyle('overline'), color: previewColor('fg3') }}>{section.label}</div> : null}
              {section.rows.map((row, j) => (
                <div key={j} className="flex justify-between text-sm">
                  <span style={{ color: previewColor('fg2') }}>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
          ))
        ) : null}
        {value.type === 'form' ? (
          <div className="flex flex-col gap-2">
            {value.heading ? (
              <div style={previewTextStyle('serifTitle')}>{value.heading}{value.headingEmphasis ? <em>{value.headingEmphasis}</em> : null}</div>
            ) : null}
            {value.fields.map((field, i) => <div key={i} className="text-sm" style={{ color: previewColor('fg2') }}>{field.label}</div>)}
          </div>
        ) : null}
        {value.type === 'wizard' ? (
          <div className="flex flex-col gap-3">
            {value.steps.map((step, i) => (
              <div key={i}>
                <div style={{ ...previewTextStyle('small'), color: previewColor('fg3') }}>{step.stepLabel ?? step.title}</div>
                {step.fields.map((field, j) => <div key={j} className="text-sm">{field.label}</div>)}
              </div>
            ))}
          </div>
        ) : null}
        {value.type === 'blocks' ? value.blocks.map((b, i) => <BlockPreview key={i} block={b} />) : null}
      </div>
    </div>
  );
}
