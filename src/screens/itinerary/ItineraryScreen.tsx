/**
 * Viaggo - Itinerary View Screen
 * Visualização do itinerário gerado pela IA
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { ActivityCard } from "../../components/domain/ActivityCard";
import { colors } from "../../theme/colors";
import { spacing, borderRadius, shadows } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { useTripStore } from "../../stores/tripStore";
import { mockTrips } from "../../services/mockData";
import type { ItineraryDay } from "../../types";

export const ItineraryScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const tripId = route.params?.tripId;

  // Tenta pegar do store, senão usa mock
  const storeTrip = useTripStore((s) => s.trips.find((t) => t.id === tripId));
  const trip =
    storeTrip || mockTrips.find((t) => t.id === tripId) || mockTrips[0];
  const itinerary = trip.itinerary;

  const [selectedDay, setSelectedDay] = useState(0);
  const currentDay: ItineraryDay | undefined = itinerary.days[selectedDay];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary[600], colors.primary[800]]}
        style={[styles.header, { paddingTop: insets.top + spacing[2] }]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{trip.input.destination}</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="rgba(255,255,255,0.8)"
            />
            <Text style={styles.metaText}>{itinerary.days.length} dias</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="wallet-outline"
              size={14}
              color="rgba(255,255,255,0.8)"
            />
            <Text style={styles.metaText}>
              {itinerary.estimatedCost.currency}{" "}
              {itinerary.estimatedCost.total.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Day selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daySelector}
          contentContainerStyle={styles.daySelectorContent}
        >
          {itinerary.days.map((day, index) => (
            <TouchableOpacity
              key={day.dayNumber}
              onPress={() => setSelectedDay(index)}
              style={[
                styles.dayTab,
                index === selectedDay && styles.dayTabActive,
              ]}
            >
              <Text
                style={[
                  styles.dayTabLabel,
                  index === selectedDay && styles.dayTabLabelActive,
                ]}
              >
                Dia {day.dayNumber}
              </Text>
              <Text
                style={[
                  styles.dayTabDate,
                  index === selectedDay && styles.dayTabDateActive,
                ]}
              >
                {new Date(day.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        {currentDay && (
          <>
            {/* Day header */}
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{currentDay.title}</Text>
              <Text style={styles.dayDescription}>
                {currentDay.description}
              </Text>
            </View>

            {/* Activities timeline */}
            <View style={styles.timeline}>
              {currentDay.activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </View>
          </>
        )}

        {/* Tips */}
        {itinerary.tips.length > 0 && selectedDay === 0 && (
          <Card variant="filled" style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons
                name="bulb-outline"
                size={20}
                color={colors.warning[500]}
              />
              <Text style={styles.tipsTitle}>Dicas para sua viagem</Text>
            </View>
            {itinerary.tips.map((tip, i) => (
              <View key={i} style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Cost breakdown */}
        <Card variant="outlined" style={styles.costCard}>
          <Text style={styles.costTitle}>Estimativa de custos</Text>
          {Object.entries(itinerary.estimatedCost)
            .filter(([key]) => key !== "total" && key !== "currency")
            .map(([key, value]) => (
              <View key={key} style={styles.costRow}>
                <Text style={styles.costLabel}>{costLabels[key] || key}</Text>
                <Text style={styles.costValue}>
                  {itinerary.estimatedCost.currency}{" "}
                  {(value as number).toLocaleString()}
                </Text>
              </View>
            ))}
          <View style={[styles.costRow, styles.costTotal]}>
            <Text style={styles.costTotalLabel}>Total estimado</Text>
            <Text style={styles.costTotalValue}>
              {itinerary.estimatedCost.currency}{" "}
              {itinerary.estimatedCost.total.toLocaleString()}
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: insets.bottom + spacing[3] },
        ]}
      >
        <Button
          title="📨 Enviar para agentes"
          onPress={() => navigation.navigate("Explore")}
          variant="accent"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
};

const costLabels: Record<string, string> = {
  accommodation: "🏨 Hospedagem",
  transport: "✈️ Transporte",
  food: "🍽️ Alimentação",
  activities: "🎯 Atividades",
  other: "📦 Outros",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    paddingBottom: spacing[1],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
  },
  headerTitle: {
    ...textPresets.h4,
    color: "#fff",
  },
  headerMeta: {
    flexDirection: "row",
    paddingHorizontal: spacing[5],
    gap: spacing[5],
    marginBottom: spacing[4],
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    color: "rgba(255,255,255,0.85)",
    fontWeight: typography.fontWeight.medium,
  },
  daySelector: {
    flexGrow: 0,
  },
  daySelectorContent: {
    paddingHorizontal: spacing[5],
    gap: spacing[2],
  },
  dayTab: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    minWidth: 70,
  },
  dayTabActive: {
    backgroundColor: "#fff",
  },
  dayTabLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: "rgba(255,255,255,0.7)",
  },
  dayTabLabelActive: {
    color: colors.primary[600],
  },
  dayTabDate: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    marginTop: 1,
  },
  dayTabDateActive: {
    color: colors.primary[400],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[5],
  },
  dayHeader: {
    paddingVertical: spacing[5],
  },
  dayTitle: {
    ...textPresets.h3,
    color: colors.neutral[900],
    marginBottom: spacing[1],
  },
  dayDescription: {
    ...textPresets.body,
    color: colors.neutral[400],
  },
  timeline: {
    paddingLeft: spacing[1],
  },
  tipsCard: {
    marginTop: spacing[6],
    padding: spacing[4],
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  tipsTitle: {
    ...textPresets.h4,
    color: colors.neutral[800],
    fontSize: typography.fontSize.base,
  },
  tipItem: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  tipBullet: {
    color: colors.neutral[400],
    fontSize: typography.fontSize.base,
  },
  tipText: {
    flex: 1,
    ...textPresets.bodySm,
    color: colors.neutral[600],
    lineHeight: 20,
  },
  costCard: {
    marginTop: spacing[4],
    padding: spacing[4],
  },
  costTitle: {
    ...textPresets.h4,
    color: colors.neutral[900],
    marginBottom: spacing[4],
    fontSize: typography.fontSize.base,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing[2],
  },
  costLabel: {
    ...textPresets.body,
    color: colors.neutral[500],
  },
  costValue: {
    ...textPresets.body,
    color: colors.neutral[700],
    fontWeight: typography.fontWeight.medium,
  },
  costTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    marginTop: spacing[2],
    paddingTop: spacing[3],
  },
  costTotalLabel: {
    ...textPresets.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  costTotalValue: {
    ...textPresets.h4,
    color: colors.primary[600],
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
