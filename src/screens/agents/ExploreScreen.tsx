/**
 * Viaggo - Explore Screen (Agents List)
 */
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "../../components/ui/Input";
import { Chip } from "../../components/ui/Chip";
import { AgentCard } from "../../components/domain/AgentCard";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { textPresets } from "../../theme/typography";
import { mockAgents } from "../../services/mockData";

const specialtyFilters = [
  "Todos",
  "Europa",
  "Aventura",
  "Luxo",
  "Família",
  "Ecoturismo",
  "Nacional",
];

export const ExploreScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch =
      !search ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.agency.toLowerCase().includes(search.toLowerCase()) ||
      agent.specialties.some((s) =>
        s.toLowerCase().includes(search.toLowerCase()),
      );

    const matchesFilter =
      selectedFilter === "Todos" ||
      agent.specialties.some(
        (s) => s.toLowerCase() === selectedFilter.toLowerCase(),
      );

    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[2] }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explorar agentes</Text>
        <Text style={styles.subtitle}>
          {mockAgents.length} profissionais verificados
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar por nome, agência ou destino..."
          value={search}
          onChangeText={setSearch}
          icon={
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.neutral[400]}
            />
          }
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {specialtyFilters.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={selectedFilter === f}
            onPress={() => setSelectedFilter(f)}
          />
        ))}
      </ScrollView>

      {/* Agent list */}
      <FlatList
        data={filteredAgents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AgentCard
            agent={item}
            onPress={() =>
              navigation.navigate("AgentProfile", { agentId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: spacing[3],
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
  searchContainer: {
    paddingHorizontal: spacing[5],
  },
  filterRow: {
    flexGrow: 0,
    marginTop: spacing[3],
    marginBottom: spacing[4],
  },
  filterContent: {
    paddingHorizontal: spacing[5],
    gap: spacing[2],
  },
  listContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: 120,
  },
});
