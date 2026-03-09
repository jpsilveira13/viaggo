/**
 * Viaggo Design System - Colors
 * Paleta moderna e minimalista com tons de azul profundo + coral vibrante
 */

export const colors = {
  // Primary - Azul profundo oceano
  primary: {
    50: "#EEF4FF",
    100: "#D9E6FF",
    200: "#BBCFFF",
    300: "#8EADFF",
    400: "#5A80FF",
    500: "#3358FF",
    600: "#1A35F5",
    700: "#1428E1",
    800: "#1722B6",
    900: "#19228F",
    950: "#0F1357",
  },

  // Accent - Coral vibrante (CTAs e destaques)
  accent: {
    50: "#FFF5F0",
    100: "#FFEAD9",
    200: "#FFD1B3",
    300: "#FFB080",
    400: "#FF8547",
    500: "#FF6B2C",
    600: "#F04A0A",
    700: "#C7370A",
    800: "#9E2E10",
    900: "#7F2A11",
    950: "#451106",
  },

  // Neutral - Cinzas sofisticados
  neutral: {
    0: "#FFFFFF",
    50: "#F8F9FB",
    100: "#F1F3F5",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },

  // Success
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
  },

  // Warning
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
  },

  // Error
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
  },

  // Backgrounds especiais
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FB",
    tertiary: "#F1F3F5",
    dark: "#111827",
    gradient: {
      start: "#3358FF",
      end: "#1A35F5",
    },
    card: "#FFFFFF",
    overlay: "rgba(17, 24, 39, 0.6)",
  },
} as const;

export type ColorToken = typeof colors;
