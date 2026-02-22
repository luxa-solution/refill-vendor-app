export const colors = {
  primary: '#FF6B00',
  primaryLight: '#FF9A4D',
  primaryDark: '#CC5500',
  secondary: '#1A1A2E',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  text: {
    primary: '#1A1A1A',
    secondary: '#6B6B6B',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },
  border: '#E0E0E0',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
