import { useColorScheme } from 'react-native';

// ============================================
// 🎨 CHANGE YOUR THEME COLOR HERE
// Options: 'ocean', 'emerald', 'purple', 'orange', 'teal', 'rose'
// ============================================
const ACTIVE_THEME = 'teal';

// Brand color palettes
const BRAND_COLORS = {
  ocean: {
    primary: '#1976d2',
    primaryDark: '#1565c0',
    primaryLight: '#e3f2fd',
    primaryMuted: '#90caf9',
  },
  emerald: {
    primary: '#059669',
    primaryDark: '#047857',
    primaryLight: '#d1fae5',
    primaryMuted: '#6ee7b7',
  },
  purple: {
    primary: '#7c3aed',
    primaryDark: '#6d28d9',
    primaryLight: '#ede9fe',
    primaryMuted: '#a78bfa',
  },
  orange: {
    primary: '#ea580c',
    primaryDark: '#c2410c',
    primaryLight: '#fff7ed',
    primaryMuted: '#fb923c',
  },
  teal: {
    primary: '#0d9488',
    primaryDark: '#0f766e',
    primaryLight: '#ccfbf1',
    primaryMuted: '#5eead4',
  },
  rose: {
    primary: '#e11d48',
    primaryDark: '#be123c',
    primaryLight: '#ffe4e6',
    primaryMuted: '#fb7185',
  },
};

// Get active brand colors
const brand = BRAND_COLORS[ACTIVE_THEME];

// ============================================
// Light Theme
// ============================================
const lightColors = {
  // Brand
  primary: brand.primary,
  primaryDark: brand.primaryDark,
  primaryLight: brand.primaryLight,
  primaryMuted: brand.primaryMuted,

  // Status
  success: '#16a34a',
  successLight: '#dcfce7',
  danger: '#dc2626',
  dangerLight: '#fef2f2',
  warning: '#f59e0b',
  warningLight: '#fef3c7',

  // Background
  background: '#f5f7fa',
  card: '#ffffff',
  cardElevated: '#ffffff',

  // Borders
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textWhite: '#ffffff',
  textOnPrimary: '#ffffff',

  // Disabled
  disabled: '#f1f5f9',
  disabledText: '#94a3b8',

  // Input
  inputBackground: '#ffffff',
  inputBorder: '#e2e8f0',
  inputBorderFocused: brand.primary,
  placeholder: '#94a3b8',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Welcome screen
  welcomeBackground: brand.primary,
  welcomeOverlay: 'rgba(255, 255, 255, 0.15)',
  welcomeOverlayBorder: 'rgba(255, 255, 255, 0.2)',
  welcomeText: '#ffffff',
  welcomeSubtext: 'rgba(255, 255, 255, 0.85)',
  welcomeButtonBg: '#ffffff',
  welcomeButtonText: brand.primary,
  welcomeSecondaryBg: 'rgba(255, 255, 255, 0.12)',
  welcomeSecondaryBorder: 'rgba(255, 255, 255, 0.25)',
  welcomeSecondaryText: '#ffffff',

  // Header
  headerBackground: '#ffffff',
  headerText: '#0f172a',
  headerTint: brand.primary,

  // Status bar
  statusBar: 'dark-content' as const,
};

// ============================================
// Dark Theme
// ============================================
const darkColors = {
  // Brand
  primary: brand.primaryMuted,
  primaryDark: brand.primary,
  primaryLight: `${brand.primary}20`,
  primaryMuted: brand.primaryMuted,

  // Status
  success: '#4ade80',
  successLight: '#052e16',
  danger: '#f87171',
  dangerLight: '#450a0a',
  warning: '#fbbf24',
  warningLight: '#451a03',

  // Background
  background: '#0f172a',
  card: '#1e293b',
  cardElevated: '#334155',

  // Borders
  border: '#334155',
  borderLight: '#1e293b',

  // Text
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textWhite: '#ffffff',
  textOnPrimary: '#0f172a',

  // Disabled
  disabled: '#1e293b',
  disabledText: '#475569',

  // Input
  inputBackground: '#1e293b',
  inputBorder: '#334155',
  inputBorderFocused: brand.primaryMuted,
  placeholder: '#64748b',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',

  // Welcome screen
  welcomeBackground: '#0f172a',
  welcomeOverlay: 'rgba(255, 255, 255, 0.08)',
  welcomeOverlayBorder: 'rgba(255, 255, 255, 0.1)',
  welcomeText: '#f1f5f9',
  welcomeSubtext: 'rgba(255, 255, 255, 0.7)',
  welcomeButtonBg: brand.primaryMuted,
  welcomeButtonText: '#0f172a',
  welcomeSecondaryBg: 'rgba(255, 255, 255, 0.08)',
  welcomeSecondaryBorder: 'rgba(255, 255, 255, 0.15)',
  welcomeSecondaryText: '#f1f5f9',

  // Header
  headerBackground: '#1e293b',
  headerText: '#f1f5f9',
  headerTint: brand.primaryMuted,

  // Status bar
  statusBar: 'light-content' as const,
};

// ============================================
// Types
// ============================================
export type ThemeColors = Omit<typeof lightColors, 'statusBar'> & {
  statusBar: 'dark-content' | 'light-content';
};

// ============================================
// Theme Hook
// ============================================
export const useThemeColors = (): ThemeColors => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
};

// ============================================
// Spacing, Fonts, etc. (Same for both themes)
// ============================================
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 50,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};