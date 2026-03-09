/**
 * Viaggo - ActivityCard Component
 * Card de atividade no itinerário
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import type { Activity, ActivityType } from "../../types";

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
}

const typeConfig: Record<
  ActivityType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  transport: { icon: "airplane-outline", color: colors.primary[500] },
  accommodation: { icon: "bed-outline", color: colors.accent[500] },
  food: { icon: "restaurant-outline", color: colors.warning[500] },
  attraction: { icon: "camera-outline", color: colors.success[500] },
  experience: { icon: "sparkles-outline", color: colors.accent[500] },
  free_time: { icon: "cafe-outline", color: colors.neutral[400] },
  shopping: { icon: "bag-outline", color: colors.primary[400] },
  nightlife: { icon: "moon-outline", color: "#8B5CF6" },
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onPress,
}) => {
  const config = typeConfig[activity.type] || typeConfig.attraction;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      {/* Timeline connector */}
      <View style={styles.timelineColumn}>
        <Text style={styles.time}>{activity.time}</Text>
        <View style={[styles.dot, { backgroundColor: config.color }]}>
          <Ionicons name={config.icon} size={14} color="#fff" />
        </View>
        <View style={styles.line} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>

        <View style={styles.meta}>
          {activity.duration && (
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={12}
                color={colors.neutral[400]}
              />
              <Text style={styles.metaText}>{activity.duration}</Text>
            </View>
          )}
          {activity.estimatedCost !== undefined &&
            activity.estimatedCost > 0 && (
              <View style={styles.metaItem}>
                <Ionicons
                  name="wallet-outline"
                  size={12}
                  color={colors.neutral[400]}
                />
                <Text style={styles.metaText}>
                  R$ {activity.estimatedCost.toLocaleString()}
                </Text>
              </View>
            )}
          {activity.location && (
            <View style={styles.metaItem}>
              <Ionicons
                name="location-outline"
                size={12}
                color={colors.neutral[400]}
              />
              <Text style={styles.metaText} numberOfLines={1}>
                {activity.location.name}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: spacing[2],
  },
  timelineColumn: {
    alignItems: "center",
    width: 64,
    paddingTop: 2,
  },
  time: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[500],
    marginBottom: spacing[2],
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.neutral[100],
    marginTop: spacing[1],
  },
  content: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    lineHeight: 18,
    marginBottom: spacing[2],
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    fontWeight: typography.fontWeight.medium,
  },
});
