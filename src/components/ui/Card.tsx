/**
 * Viaggo UI - Card Component
 */
import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius, shadows, spacing } from "../../theme/spacing";

interface CardProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "elevated",
  onPress,
  style,
  padding = 4,
}) => {
  const cardStyles = [
    styles.base,
    { padding: spacing[padding] },
    variant === "elevated" && styles.elevated,
    variant === "outlined" && styles.outlined,
    variant === "filled" && styles.filled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={cardStyles}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  elevated: {
    backgroundColor: colors.background.card,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  filled: {
    backgroundColor: colors.neutral[50],
  },
});
