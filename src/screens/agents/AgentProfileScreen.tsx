/**
 * Viaggo - Agent Profile Screen
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { colors } from "../../theme/colors";
import { spacing, borderRadius, shadows } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { mockAgents } from "../../services/mockData";

export const AgentProfileScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const agentId = route.params?.agentId;
  const agent = mockAgents.find((a) => a.id === agentId) || mockAgents[0];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing[2] }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.neutral[700]}
            />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <Avatar uri={agent.avatar} name={agent.name} size={80} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>{agent.name}</Text>
            {agent.verified && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.primary[500]}
              />
            )}
          </View>
          <Text style={styles.agency}>{agent.agency}</Text>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{agent.rating}</Text>
              <View style={styles.statLabel}>
                <Ionicons name="star" size={12} color={colors.warning[400]} />
                <Text style={styles.statLabelText}>Avaliação</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{agent.reviewCount}</Text>
              <Text style={styles.statLabelText}>Avaliações</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{agent.responseTime}</Text>
              <Text style={styles.statLabelText}>Resposta</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.bio}>{agent.bio}</Text>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Especialidades</Text>
          <View style={styles.badgeRow}>
            {agent.specialties.map((s) => (
              <Badge key={s} text={s} variant="primary" size="md" />
            ))}
          </View>
        </View>

        {/* Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destinos</Text>
          <View style={styles.badgeRow}>
            {agent.destinations.map((d) => (
              <Badge key={d} text={d} variant="neutral" size="md" />
            ))}
          </View>
        </View>

        {/* Reviews placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações recentes</Text>
          {[1, 2, 3].map((i) => (
            <Card key={i} variant="filled" style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Avatar name={`User ${i}`} size={32} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>Viajante {i}</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Ionicons
                        key={s}
                        name="star"
                        size={12}
                        color={
                          s <= 5 ? colors.warning[400] : colors.neutral[200]
                        }
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>
                Excelente profissional! Organizou tudo perfeitamente e deu dicas
                incríveis.
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom + spacing[3] },
        ]}
      >
        <Button
          title="💬 Enviar mensagem"
          onPress={() =>
            navigation.navigate("ChatRoom", {
              conversationId: `new-${agent.id}`,
              agentName: agent.name,
            })
          }
          variant="primary"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[2],
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[6],
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[3],
  },
  name: {
    ...textPresets.h3,
    color: colors.neutral[900],
  },
  agency: {
    ...textPresets.body,
    color: colors.neutral[400],
    marginTop: 2,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing[5],
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    gap: spacing[4],
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    ...textPresets.h4,
    color: colors.neutral[900],
  },
  statLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statLabelText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.neutral[200],
  },
  section: {
    paddingHorizontal: spacing[5],
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textPresets.h4,
    color: colors.neutral[900],
    marginBottom: spacing[3],
    fontSize: typography.fontSize.base,
  },
  bio: {
    ...textPresets.body,
    color: colors.neutral[500],
    lineHeight: 24,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  reviewCard: {
    marginBottom: spacing[3],
    padding: spacing[3],
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  reviewInfo: {
    marginLeft: spacing[2],
  },
  reviewName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[700],
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
    marginTop: 2,
  },
  reviewText: {
    ...textPresets.bodySm,
    color: colors.neutral[500],
    lineHeight: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    ...shadows.md,
  },
});
