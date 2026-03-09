/**
 * Viaggo UI - Button Component
 * Minimalista, moderno, com variantes
 */
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius, spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  style,
  textStyle,
}) => {
  const containerStyles = [
    styles.base,
    styles[`container_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" || variant === "accent"
              ? "#fff"
              : colors.primary[500]
          }
        />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    borderRadius: borderRadius.lg,
  },
  fullWidth: {
    width: "100%",
  },

  // Variants
  container_primary: {
    backgroundColor: colors.primary[600],
  },
  container_secondary: {
    backgroundColor: colors.primary[50],
  },
  container_outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.neutral[200],
  },
  container_ghost: {
    backgroundColor: "transparent",
  },
  container_accent: {
    backgroundColor: colors.accent[500],
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.sm,
  },
  size_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
  },
  size_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.xl,
  },

  // Text
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
  text_primary: {
    color: "#FFFFFF",
  },
  text_secondary: {
    color: colors.primary[600],
  },
  text_outline: {
    color: colors.neutral[800],
  },
  text_ghost: {
    color: colors.primary[600],
  },
  text_accent: {
    color: "#FFFFFF",
  },
  textSize_sm: {
    fontSize: typography.fontSize.sm,
  },
  textSize_md: {
    fontSize: typography.fontSize.base,
  },
  textSize_lg: {
    fontSize: typography.fontSize.md,
  },

  // States
  disabled: {
    opacity: 0.4,
  },
  textDisabled: {
    opacity: 0.6,
  },
});
