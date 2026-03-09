/**
 * Viaggo UI - Badge Component
 */
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius, spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "neutral";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: colors.primary[50], text: colors.primary[700] },
  accent: { bg: colors.accent[50], text: colors.accent[700] },
  success: { bg: colors.success[50], text: colors.success[700] },
  warning: { bg: colors.warning[50], text: colors.warning[600] },
  neutral: { bg: colors.neutral[100], text: colors.neutral[600] },
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "primary",
  size = "sm",
  icon,
  style,
}) => {
  const colorScheme = variantColors[variant];

  return (
    <View
      style={[
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        { backgroundColor: colorScheme.bg },
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          size === "sm" ? styles.textSm : styles.textMd,
          { color: colorScheme.text },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing[1],
  },
  sm: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    borderRadius: borderRadius.sm,
  },
  md: {
    paddingVertical: spacing[1] + 2,
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.md,
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
  textSm: {
    fontSize: typography.fontSize.xs,
  },
  textMd: {
    fontSize: typography.fontSize.sm,
  },
});
