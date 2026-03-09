/**
 * Viaggo UI - Chip Component (seleção de opções)
 */
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius, spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.base,
        selected ? styles.selected : styles.unselected,
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          selected ? styles.textSelected : styles.textUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[2] + 2,
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
    gap: spacing[2],
    borderWidth: 1.5,
  },
  selected: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  unselected: {
    backgroundColor: colors.neutral[0],
    borderColor: colors.neutral[200],
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  textSelected: {
    color: "#FFFFFF",
  },
  textUnselected: {
    color: colors.neutral[600],
  },
});
