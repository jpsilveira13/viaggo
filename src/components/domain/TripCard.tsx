/**
 * Viaggo - TripCard Component
 * Card de viagem na home / lista de trips
 */
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import type { Trip } from "../../types";

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
}

const statusLabels: Record<
  string,
  {
    text: string;
    variant: "primary" | "accent" | "success" | "warning" | "neutral";
  }
> = {
  planning: { text: "Planejando", variant: "primary" },
  itinerary_ready: { text: "Itinerário pronto", variant: "accent" },
  contacting_agents: { text: "Contactando agentes", variant: "warning" },
  proposal_received: { text: "Proposta recebida", variant: "accent" },
  confirmed: { text: "Confirmada", variant: "success" },
  completed: { text: "Concluída", variant: "neutral" },
};

const destinationImages: Record<string, string> = {
  default:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
};

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress }) => {
  const status = statusLabels[trip.status] || statusLabels.planning;
  const imageUrl = destinationImages.default;

  return (
    <Card onPress={onPress} style={styles.card} padding={0}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.topRow}>
            <Badge text={status.text} variant={status.variant} />
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.destination}>{trip.input.destination}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.infoText}>
                  {trip.input.startDate} - {trip.input.endDate}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons
                  name="people-outline"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.infoText}>
                  {trip.input.travelers.adults + trip.input.travelers.children}{" "}
                  viajantes
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing[4],
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
  image: {
    height: 200,
    justifyContent: "space-between",
  },
  imageStyle: {
    borderRadius: borderRadius.xl,
  },
  overlay: {
    flex: 1,
    padding: spacing[4],
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: borderRadius.xl,
  },
  topRow: {
    flexDirection: "row",
  },
  bottomRow: {},
  destination: {
    ...textPresets.h3,
    color: "#FFFFFF",
    marginBottom: spacing[1],
  },
  infoRow: {
    flexDirection: "row",
    gap: spacing[4],
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  infoText: {
    fontSize: typography.fontSize.xs,
    color: "rgba(255,255,255,0.85)",
    fontWeight: typography.fontWeight.medium,
  },
});
