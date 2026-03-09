/**
 * Viaggo - ProposalCard Component
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import type { Proposal } from "../../types";

interface ProposalCardProps {
  proposal: Proposal;
  onPress: () => void;
  onAccept?: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  onPress,
  onAccept,
}) => {
  return (
    <Card onPress={onPress} style={styles.card}>
      {/* Agent info */}
      <View style={styles.agentRow}>
        <Avatar
          uri={proposal.agent.avatar}
          name={proposal.agent.name}
          size={40}
        />
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>{proposal.agent.name}</Text>
          <Text style={styles.agentAgency}>{proposal.agent.agency}</Text>
        </View>
        <Badge
          text={proposal.status === "received" ? "Nova" : proposal.status}
          variant={proposal.status === "received" ? "accent" : "neutral"}
        />
      </View>

      {/* Price */}
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Valor total</Text>
        <Text style={styles.price}>
          {proposal.currency} {proposal.totalPrice.toLocaleString()}
        </Text>
      </View>

      {/* Message excerpt */}
      <Text style={styles.message} numberOfLines={2}>
        {proposal.message}
      </Text>

      {/* Includes */}
      <View style={styles.includes}>
        {proposal.includes.slice(0, 3).map((item) => (
          <View key={item} style={styles.includeItem}>
            <Ionicons
              name="checkmark-circle"
              size={14}
              color={colors.success[500]}
            />
            <Text style={styles.includeText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      {proposal.status === "received" && onAccept && (
        <View style={styles.actions}>
          <Button
            title="Ver detalhes"
            onPress={onPress}
            variant="outline"
            size="sm"
          />
          <Button
            title="Aceitar"
            onPress={onAccept}
            variant="primary"
            size="sm"
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing[3],
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  agentInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  agentName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  agentAgency: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: spacing[2],
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
  },
  price: {
    ...textPresets.h3,
    color: colors.primary[600],
  },
  message: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    lineHeight: 20,
    marginBottom: spacing[3],
  },
  includes: {
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  includeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  includeText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  actions: {
    flexDirection: "row",
    gap: spacing[3],
    justifyContent: "flex-end",
  },
});
