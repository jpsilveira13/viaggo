/**
 * Viaggo - Home Screen
 * Dashboard principal
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
import { LinearGradient } from "expo-linear-gradient";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Avatar } from "../../components/ui/Avatar";
import { TripCard } from "../../components/domain/TripCard";
import { colors } from "../../theme/colors";
import { spacing, borderRadius, shadows } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { mockTrips, mockAgents } from "../../services/mockData";

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing[4] }]}>
        <View>
          <Text style={styles.greeting}>Olá! 👋</Text>
          <Text style={styles.headerTitle}>Pra onde vamos?</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.7}
        >
          <Avatar name="João" size={44} />
        </TouchableOpacity>
      </View>

      {/* Quick Start Card */}
      <View style={styles.section}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("TripPlanner")}
        >
          <LinearGradient
            colors={[colors.primary[500], colors.primary[700]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.quickStartCard}
          >
            <View style={styles.quickStartContent}>
              <View style={styles.quickStartIcon}>
                <Ionicons
                  name="sparkles"
                  size={24}
                  color={colors.primary[500]}
                />
              </View>
              <Text style={styles.quickStartTitle}>Planejar nova viagem</Text>
              <Text style={styles.quickStartSub}>
                Diga o destino, orçamento e estilo — nossa IA cria o roteiro
                perfeito
              </Text>
            </View>
            <View style={styles.quickStartArrow}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* My Trips */}
      {mockTrips.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            title="Minhas viagens"
            subtitle={`${mockTrips.length} planejamento${mockTrips.length > 1 ? "s" : ""}`}
            actionText="Ver todas"
            onAction={() => navigation.navigate("Trips")}
          />
          {mockTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() =>
                navigation.navigate("TripDetail", { tripId: trip.id })
              }
            />
          ))}
        </View>
      )}

      {/* Popular Destinations */}
      <View style={styles.section}>
        <SectionHeader
          title="Destinos populares"
          subtitle="Inspiração para sua próxima viagem"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.destinationsRow}
        >
          {popularDestinations.map((dest) => (
            <TouchableOpacity
              key={dest.name}
              style={styles.destinationCard}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("TripPlanner", {
                  prefillDestination: dest.name,
                });
              }}
            >
              <LinearGradient
                colors={dest.gradient as [string, string]}
                style={styles.destinationGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              >
                <Text style={styles.destinationEmoji}>{dest.emoji}</Text>
                <Text style={styles.destinationName}>{dest.name}</Text>
                <Text style={styles.destinationPrice}>
                  a partir de {dest.price}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Agents */}
      <View style={styles.section}>
        <SectionHeader
          title="Agentes em destaque"
          subtitle="Profissionais verificados"
          actionText="Ver todos"
          onAction={() => navigation.navigate("Explore")}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockAgents.slice(0, 4).map((agent) => (
            <TouchableOpacity
              key={agent.id}
              style={styles.agentMiniCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("AgentProfile", { agentId: agent.id })
              }
            >
              <Avatar uri={agent.avatar} name={agent.name} size={56} />
              <Text style={styles.agentMiniName} numberOfLines={1}>
                {agent.name}
              </Text>
              <View style={styles.agentMiniRating}>
                <Ionicons name="star" size={11} color={colors.warning[400]} />
                <Text style={styles.agentMiniRatingText}>{agent.rating}</Text>
              </View>
              <Text style={styles.agentMiniSpecialty} numberOfLines={1}>
                {agent.specialties[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const popularDestinations = [
  {
    name: "Lisboa",
    emoji: "🇵🇹",
    price: "R$ 4.500",
    gradient: ["#FF6B2C", "#F04A0A"],
  },
  {
    name: "Paris",
    emoji: "🇫🇷",
    price: "R$ 6.200",
    gradient: ["#3358FF", "#1A35F5"],
  },
  {
    name: "Tokyo",
    emoji: "🇯🇵",
    price: "R$ 8.900",
    gradient: ["#8B5CF6", "#6D28D9"],
  },
  {
    name: "Cancún",
    emoji: "🇲🇽",
    price: "R$ 3.800",
    gradient: ["#10B981", "#047857"],
  },
  {
    name: "Roma",
    emoji: "🇮🇹",
    price: "R$ 5.100",
    gradient: ["#F59E0B", "#D97706"],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
    backgroundColor: colors.background.primary,
  },
  greeting: {
    ...textPresets.bodySm,
    color: colors.neutral[400],
  },
  headerTitle: {
    ...textPresets.h2,
    color: colors.neutral[900],
    marginTop: 2,
  },
  section: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[6],
  },

  // Quick Start
  quickStartCard: {
    borderRadius: borderRadius.xl,
    padding: spacing[5],
    flexDirection: "row",
    alignItems: "center",
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[3],
  },
  quickStartTitle: {
    ...textPresets.h4,
    color: "#fff",
    marginBottom: spacing[1],
  },
  quickStartSub: {
    ...textPresets.bodySm,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 18,
  },
  quickStartArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing[3],
  },

  // Destinations
  destinationsRow: {
    marginHorizontal: -spacing[5],
    paddingHorizontal: spacing[5],
  },
  destinationCard: {
    marginRight: spacing[3],
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  destinationGradient: {
    width: 130,
    height: 160,
    padding: spacing[4],
    justifyContent: "flex-end",
  },
  destinationEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  destinationName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: "#fff",
  },
  destinationPrice: {
    fontSize: typography.fontSize.xs,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },

  // Agent mini cards
  agentMiniCard: {
    alignItems: "center",
    width: 90,
    marginRight: spacing[4],
  },
  agentMiniName: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[800],
    marginTop: spacing[2],
    textAlign: "center",
  },
  agentMiniRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: 2,
  },
  agentMiniRatingText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    fontWeight: typography.fontWeight.medium,
  },
  agentMiniSpecialty: {
    fontSize: 10,
    color: colors.neutral[400],
    marginTop: 1,
  },
});
