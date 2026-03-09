/**
 * Viaggo - AgentCard Component
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { colors } from "../../theme/colors";
import { spacing, borderRadius, shadows } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import type { Agent } from "../../types";

interface AgentCardProps {
  agent: Agent;
  onPress: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.header}>
        <Avatar uri={agent.avatar} name={agent.name} size={52} />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{agent.name}</Text>
            {agent.verified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary[500]}
              />
            )}
          </View>
          <Text style={styles.agency}>{agent.agency}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={colors.warning[400]} />
            <Text style={styles.rating}>{agent.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({agent.reviewCount})</Text>
            <Text style={styles.dot}>·</Text>
            <Ionicons
              name="time-outline"
              size={12}
              color={colors.neutral[400]}
            />
            <Text style={styles.responseTime}>{agent.responseTime}</Text>
          </View>
        </View>
      </View>

      {/* Specialties */}
      <View style={styles.specialties}>
        {agent.specialties.slice(0, 3).map((s) => (
          <Badge key={s} text={s} variant="neutral" size="sm" />
        ))}
      </View>

      {/* Bio excerpt */}
      <Text style={styles.bio} numberOfLines={2}>
        {agent.bio}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.sm,
  },
  header: {
    flexDirection: "row",
    marginBottom: spacing[3],
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing[3],
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  name: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  agency: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: spacing[1],
  },
  rating: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[800],
  },
  reviewCount: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  dot: {
    color: colors.neutral[300],
    marginHorizontal: 2,
  },
  responseTime: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  specialties: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  bio: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    lineHeight: 20,
  },
});
