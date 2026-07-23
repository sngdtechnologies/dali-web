import type { Config } from 'tailwindcss';
import { daliColors, daliRadius } from './src/lib/design/tokens';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivoire: { DEFAULT: daliColors.ivoire, soft: daliColors.ivoireSoft, deep: daliColors.ivoireDeep },
        encre: { DEFAULT: daliColors.encre, soft: daliColors.encreSoft },
        foret: daliColors.foret,
        or: daliColors.or,
        corail: daliColors.corail,
        terre: { DEFAULT: daliColors.terre[600], ...daliColors.terre },
        sable: daliColors.sable,
        serenite: daliColors.serenite,
        attention: daliColors.attention,
        vigilance: daliColors.vigilance,
      },
      borderRadius: {
        'dali-xs': daliRadius.xs, 'dali-sm': daliRadius.sm, 'dali-md': daliRadius.md,
        'dali-lg': daliRadius.lg, 'dali-xl': daliRadius.xl, 'dali-full': daliRadius.full,
      },
      fontFamily: {
        serif: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
