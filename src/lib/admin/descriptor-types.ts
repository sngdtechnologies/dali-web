export type SectionSurface = 'none' | 'card' | 'forestHero' | 'tintedForest' | 'tintedOr' | 'tintedAttention';
export type TextRole = 'display' | 'h1' | 'h2' | 'h3' | 'serifTitle' | 'body' | 'small' | 'mono' | 'overline';
export type BadgeVariant = 'neutral' | 'serenite' | 'attention' | 'vigilance' | 'or';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold';
export type ColorToken =
  | 'fg1' | 'fg2' | 'fg3' | 'ivoire' | 'or500' | 'or700' | 'foret300' | 'foret600' | 'foret700'
  | 'foret800' | 'terre600' | 'terre700' | 'serenite' | 'attention' | 'vigilance' | 'sable200';
export type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right' | 'justify';

export const COLOR_TOKENS: ColorToken[] = [
  'fg1', 'fg2', 'fg3', 'ivoire', 'or500', 'or700', 'foret300', 'foret600', 'foret700',
  'foret800', 'terre600', 'terre700', 'serenite', 'attention', 'vigilance', 'sable200',
];
export const SECTION_SURFACES: SectionSurface[] = ['none', 'card', 'forestHero', 'tintedForest', 'tintedOr', 'tintedAttention'];
export const TEXT_ROLES: TextRole[] = ['display', 'h1', 'h2', 'h3', 'serifTitle', 'body', 'small', 'mono', 'overline'];
export const BADGE_VARIANTS: BadgeVariant[] = ['neutral', 'serenite', 'attention', 'vigilance', 'or'];
export const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'gold'];

export interface CardItem { title: string; subtitle?: string; trailing?: string; tone?: string; action?: string; }
export interface Fab { label: string; action?: string; }
export interface ListDescriptorValue { type: 'list'; title: string; version?: number; items: CardItem[]; emptyLabel?: string; fab?: Fab; }

export interface DetailRow { label: string; value: string; }
export interface DetailSection { label?: string; rows: DetailRow[]; }
export interface DetailDescriptorValue { type: 'detail'; title: string; version?: number; sections: DetailSection[]; }

export interface SelectOption { value: string; label: string; icon?: string; sub?: string; }
export interface DocItem { icon: string; title: string; sub?: string; added?: boolean; }
export type FieldValue =
  | { kind: 'text'; key: string; label: string; value?: string }
  | { kind: 'amount'; key: string; label: string; value?: string }
  | { kind: 'toggle'; key: string; label: string }
  | { kind: 'select'; key: string; label: string; grid?: boolean; options: SelectOption[] }
  | { kind: 'sectionHeader'; key: string; label: string }
  | { kind: 'recap'; key: string; label: string; options: SelectOption[] }
  | { kind: 'docs'; key: string; label: string; docs: DocItem[] }
  | { kind: 'total'; key: string; label: string; value: string };
export const FIELD_KINDS = ['text', 'amount', 'toggle', 'select', 'sectionHeader', 'recap', 'docs', 'total'] as const;

export interface FormFields {
  title: string; version?: number; subtitle?: string; fields: FieldValue[]; submitLabel?: string;
  stepLabel?: string; heading?: string; headingEmphasis?: string; editLabel?: string;
}
export interface FormDescriptorValue extends FormFields { type: 'form'; }
export interface WizardDescriptorValue { type: 'wizard'; title: string; version?: number; steps: FormFields[]; }

export interface TextSpan { text: string; role?: TextRole; color?: ColorToken; italic?: boolean; }
export interface KvRow { label: string; value: string; mono?: boolean; }
export interface IconRowValue {
  icon: string; title: string; subtitle?: string; trailingText?: string; trailingBadge?: BadgeVariant;
  action?: string; dateDay?: string; dateMonth?: string;
}
export interface BlockButtonValue { label: string; variant?: ButtonVariant; action?: string; submit?: boolean; }
export type AvatarStatusValue = { kind: 'badge'; label: string; variant?: BadgeVariant } | { kind?: string; label?: string };
export interface AvatarRowValue {
  initials: string; name: string; role?: string; sub?: string; status: AvatarStatusValue; highlight?: boolean;
}
export interface ChartBarValue { label: string; value: number; highlight?: boolean; }
export interface MonthCellValue { label: string; value: string; current?: boolean; }
export interface ToggleOptionValue { id: string; label: string; tone?: ColorToken; }
export interface ChipOptionValue { id: string; label: string; tone?: ColorToken; }

export type SduiBlockValue =
  | { type: 'section'; overline?: string; surface?: SectionSurface; action?: string; icon?: string; centered?: boolean; children: SduiBlockValue[] }
  | { type: 'row'; gap?: number; expand?: boolean; children: SduiBlockValue[] }
  | { type: 'grid'; columns?: number; gap?: number; children: SduiBlockValue[] }
  | { type: 'richText'; spans: TextSpan[]; align?: TextAlign }
  | { type: 'amount'; value: string; ccy?: string; size?: number; color?: ColorToken; sign?: string; serif?: boolean }
  | { type: 'iconTile'; icon: string; tone?: ColorToken; size?: number }
  | { type: 'badge'; label: string; variant?: BadgeVariant }
  | { type: 'keyValues'; rows: KvRow[] }
  | { type: 'iconRows'; rows: IconRowValue[] }
  | { type: 'infoTile'; icon: string; title: string; subtitle?: string; tone?: ColorToken }
  | { type: 'stepHeader'; number: string; label: string; tone?: ColorToken }
  | { type: 'note'; text: string; italic?: boolean }
  | { type: 'buttons'; buttons: BlockButtonValue[]; expand?: boolean }
  | { type: 'progress'; fraction: number; tone?: ColorToken; label?: string; trailing?: string; trailingMuted?: string; bold?: boolean }
  | { type: 'avatars'; rows: AvatarRowValue[] }
  | { type: 'image'; assetPath?: string; aspectRatio?: number; caption?: string }
  | { type: 'barChart'; bars: ChartBarValue[]; footerLabel?: string; footerValue?: string; footerSuffix?: string; onDark?: boolean; dense?: boolean; axisLabels?: string[]; highlightToken?: ColorToken }
  | { type: 'lineChart'; points: number[]; labels: string[] }
  | { type: 'monthSelector'; items: MonthCellValue[] }
  | { type: 'toggle'; key: string; options: ToggleOptionValue[]; selected: string }
  | { type: 'chips'; key: string; label?: string; options: ChipOptionValue[]; selected: string }
  | { type: 'quickAmount'; key: string; value: string; presets?: string[]; sign?: string; tone?: ColorToken; label?: string; ccy?: string; positiveWhenKey?: string; positiveWhenValue?: string; editable?: boolean }
  | { type: 'textField'; key: string; label?: string; hint?: string; value?: string; suggestions?: string[] }
  | { type: 'datePicker'; key: string; label?: string; initial: string };

export const BLOCK_TYPES = [
  'section', 'row', 'grid', 'richText', 'amount', 'iconTile', 'badge', 'keyValues', 'iconRows',
  'infoTile', 'stepHeader', 'note', 'buttons', 'progress', 'avatars', 'image', 'barChart',
  'lineChart', 'monthSelector', 'toggle', 'chips', 'quickAmount', 'textField', 'datePicker',
] as const;

export interface BlockScreenDescriptorValue { type: 'blocks'; title: string; version?: number; blocks: SduiBlockValue[]; }

export type ScreenDescriptorValue =
  | ListDescriptorValue | DetailDescriptorValue | FormDescriptorValue | WizardDescriptorValue | BlockScreenDescriptorValue;
