/**
 * Viaggo UI - EmptyState Component
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { textPresets } from "../../theme/typography";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionText && onAction && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="primary"
          size="md"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[10],
    paddingVertical: spacing[16],
  },
  iconContainer: {
    marginBottom: spacing[5],
  },
  title: {
    ...textPresets.h4,
    color: colors.neutral[900],
    textAlign: "center",
    marginBottom: spacing[2],
  },
  description: {
    ...textPresets.body,
    color: colors.neutral[400],
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: spacing[6],
  },
});
