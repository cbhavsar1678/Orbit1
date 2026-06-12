// ─── Design System Color Tokens ──────────────────────────
export const colors = {
  primary: {
    DEFAULT: '#5B6CFF',
    50: '#F0F1FF',
    100: '#E1E4FF',
    200: '#C3C9FF',
    300: '#A5ADFF',
    400: '#8792FF',
    500: '#5B6CFF',
    600: '#3D52FF',
    700: '#1F38FF',
  },
  violet: {
    DEFAULT: '#8B5CF6',
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    500: '#8B5CF6',
    600: '#7C3AED',
  },
  cyan: {
    DEFAULT: '#06B6D4',
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    500: '#06B6D4',
    600: '#0891B2',
  },
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  surface: {
    DEFAULT: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F1F5F9',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
  },
  ink: {
    DEFAULT: '#0F172A',
    secondary: '#475569',
    tertiary: '#94A3B8',
    disabled: '#CBD5E1',
  },
} as const;

// Agent accent colors
export const agentColors = {
  strategist: {
    accent: '#5B6CFF',
    light: '#F0F1FF',
    border: '#C3C9FF',
    gradient: 'linear-gradient(135deg, #5B6CFF 0%, #8B5CF6 100%)',
  },
  researcher: {
    accent: '#8B5CF6',
    light: '#F5F3FF',
    border: '#DDD6FE',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
  },
  builder: {
    accent: '#06B6D4',
    light: '#ECFEFF',
    border: '#A5F3FC',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
  },
} as const;
