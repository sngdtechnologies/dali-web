export const daliColors = {
  ivoire: '#F5F0E6',
  ivoireSoft: '#FAF6EC',
  ivoireDeep: '#ECE5D5',
  encre: '#1A1A17',
  encreSoft: '#2C2C26',
  foret: {
    50: '#EDF1E9', 100: '#DEE7DF', 300: '#B5C9BC', 500: '#5E8C72',
    600: '#3A6B4E', 700: '#2D4F3F', 800: '#1F3A2E', 900: '#102018',
  },
  or: { 100: '#F2E8CE', 300: '#E0CB97', 500: '#C9A961', 600: '#A88A45', 700: '#8C7338' },
  corail: '#D4553A',
  terre: '#9C4D38',
  sable: {
    50: '#F7F3EE', 100: '#F0EBE3', 200: '#E5DFD5', 300: '#D4CCC0',
    400: '#BFB4A6', 500: '#A8998E', 700: '#6B5E54', 900: '#2A2722',
  },
  serenite: '#2D7A55',
  attention: '#C68B2E',
  vigilance: '#A85541',
} as const;

export const daliRadius = {
  xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px', full: '999px',
} as const;

export const daliMotion = {
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  durations: { fast: 180, base: 280, slow: 480, breath: 900 },
} as const;
