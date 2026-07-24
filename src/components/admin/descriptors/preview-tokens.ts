import { daliColors } from '@/lib/design/tokens';
import type { ColorToken, TextRole } from '@/lib/admin/descriptor-types';
import type { CSSProperties } from 'react';

const COLOR_HEX: Record<ColorToken, string> = {
  fg1: daliColors.encre,
  fg2: daliColors.sable[700],
  fg3: daliColors.sable[500],
  ivoire: daliColors.ivoire,
  or500: daliColors.or[500],
  or700: daliColors.or[700],
  foret300: daliColors.foret[300],
  foret600: daliColors.foret[600],
  foret700: daliColors.foret[700],
  foret800: daliColors.foret[800],
  terre600: daliColors.terre[600],
  terre700: daliColors.terre[700],
  serenite: daliColors.serenite,
  attention: daliColors.attention,
  vigilance: daliColors.vigilance,
  sable200: daliColors.sable[200],
};

export function previewColor(token: ColorToken | undefined, fallback: string = daliColors.encre): string {
  return token ? COLOR_HEX[token] : fallback;
}

const TEXT_STYLE: Record<TextRole, CSSProperties> = {
  display: { fontSize: 44, lineHeight: 1.05, letterSpacing: -0.8, fontWeight: 300 },
  h1: { fontSize: 32, lineHeight: 1.2, letterSpacing: -0.5, fontWeight: 300 },
  h2: { fontSize: 24, lineHeight: 1.2, letterSpacing: -0.3, fontWeight: 600 },
  h3: { fontSize: 20, lineHeight: 1.2, letterSpacing: -0.2, fontWeight: 600 },
  serifTitle: { fontSize: 22, lineHeight: 1.2, letterSpacing: -0.2, fontWeight: 400 },
  body: { fontSize: 15, lineHeight: 1.55, fontWeight: 400 },
  small: { fontSize: 13, lineHeight: 1.55, fontWeight: 500 },
  overline: { fontSize: 11, lineHeight: 1, letterSpacing: 0.8, fontWeight: 600, textTransform: 'uppercase' },
  mono: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: -0.1, fontVariantNumeric: 'tabular-nums' },
};

export function previewTextStyle(role: TextRole | undefined): CSSProperties {
  return TEXT_STYLE[role ?? 'body'];
}
