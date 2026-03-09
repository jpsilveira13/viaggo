/**
 * Viaggo Design System - Main Theme Export
 */

export { colors } from "./colors";
export { typography, textPresets } from "./typography";
export { spacing, borderRadius, shadows, layout } from "./spacing";

// Animations
export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
} as const;
