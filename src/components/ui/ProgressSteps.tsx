/**
 * Viaggo UI - ProgressSteps Component (wizard steps)
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";

interface ProgressStepsProps {
  total: number;
  current: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  total,
  current,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.step,
            i <= current ? styles.active : styles.inactive,
            i < current ? styles.completed : undefined,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing[2],
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: borderRadius.full,
  },
  active: {
    backgroundColor: colors.primary[500],
  },
  inactive: {
    backgroundColor: colors.neutral[200],
  },
  completed: {
    backgroundColor: colors.primary[300],
  },
});
