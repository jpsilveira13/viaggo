/**
 * Viaggo - Trips List Screen
 */
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TripCard } from "../../components/domain/TripCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { textPresets } from "../../theme/typography";
import { useTripStore } from "../../stores/tripStore";
import { mockTrips } from "../../services/mockData";

export const TripsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const storeTrips = useTripStore((s) => s.trips);

  // Combina trips do store + mock
  const allTrips = [...storeTrips, ...mockTrips];

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[2] }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas viagens</Text>
        <Text style={styles.subtitle}>{allTrips.length} planejamento(s)</Text>
      </View>

      <FlatList
        data={allTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() =>
              navigation.navigate("ItineraryView", { tripId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={
              <Ionicons
                name="airplane-outline"
                size={48}
                color={colors.neutral[300]}
              />
            }
            title="Nenhuma viagem ainda"
            description="Comece planejando sua primeira viagem dos sonhos!"
            actionText="Planejar viagem"
            onAction={() => navigation.navigate("TripPlanner")}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[4],
  },
  title: {
    ...textPresets.h2,
    color: colors.neutral[900],
  },
  subtitle: {
    ...textPresets.bodySm,
    color: colors.neutral[400],
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: 120,
  },
});
