/**
 * Viaggo - Trip Planner Screen (Wizard)
 * Fluxo step-by-step para planejar viagem
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Chip } from "../../components/ui/Chip";
import { ProgressSteps } from "../../components/ui/ProgressSteps";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { useTripStore } from "../../stores/tripStore";
import { generateItinerary } from "../../services/aiService";
import type { TravelStyle, TravelerType, TravelPace } from "../../types";

const TOTAL_STEPS = 4;

const travelStyles: {
  key: TravelStyle;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: "cultural", label: "Cultural", icon: "library-outline" },
  { key: "adventure", label: "Aventura", icon: "compass-outline" },
  { key: "relaxation", label: "Relaxamento", icon: "leaf-outline" },
  { key: "gastronomy", label: "Gastronomia", icon: "restaurant-outline" },
  { key: "nightlife", label: "Vida noturna", icon: "moon-outline" },
  { key: "nature", label: "Natureza", icon: "earth-outline" },
  { key: "romantic", label: "Romântica", icon: "heart-outline" },
  { key: "family", label: "Família", icon: "people-outline" },
];

const travelerTypes: {
  key: TravelerType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { key: "solo", label: "Sozinho(a)", icon: "person-outline" },
  { key: "couple", label: "Casal", icon: "heart-outline" },
  { key: "family", label: "Família", icon: "people-outline" },
  { key: "friends", label: "Amigos", icon: "beer-outline" },
  { key: "group", label: "Grupo", icon: "people-circle-outline" },
];

const paceOptions: { key: TravelPace; label: string; desc: string }[] = [
  { key: "relaxed", label: "🐢 Tranquilo", desc: "2-3 atividades/dia" },
  { key: "moderate", label: "🚶 Moderado", desc: "4-5 atividades/dia" },
  { key: "intense", label: "🏃 Intenso", desc: "6+ atividades/dia" },
];

export const TripPlannerScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();
  const { planInput, setPlanInput, setIsGenerating, addTrip, isGenerating } =
    useTripStore();

  // Step 0: Destino e datas
  // Step 1: Quem vai
  // Step 2: Estilo e ritmo
  // Step 3: Orçamento e notas

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return Boolean(
          planInput.destination && planInput.startDate && planInput.endDate,
        );
      case 1:
        return Boolean(planInput.travelers?.type);
      case 2:
        return Boolean(
          planInput.travelStyles && planInput.travelStyles.length > 0,
        );
      case 3:
        return Boolean(planInput.budget?.min && planInput.budget?.max);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigation.goBack();
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const itinerary = await generateItinerary(planInput as any);
      const trip = {
        id: `trip-${Date.now()}`,
        userId: "user-1",
        status: "itinerary_ready" as const,
        input: planInput as any,
        itinerary,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addTrip(trip);
      setIsGenerating(false);
      navigation.replace("ItineraryView", { tripId: trip.id });
    } catch (error) {
      setIsGenerating(false);
      Alert.alert(
        "Erro",
        "Não foi possível gerar o itinerário. Tente novamente.",
      );
    }
  };

  const toggleStyle = (style: TravelStyle) => {
    const current = planInput.travelStyles || [];
    const updated = current.includes(style)
      ? current.filter((s) => s !== style)
      : [...current, style];
    setPlanInput({ travelStyles: updated });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.stepTitle}>Para onde vamos? ✈️</Text>
            <Text style={styles.stepSubtitle}>
              Escolha o destino e as datas da viagem
            </Text>

            <Input
              label="Destino"
              placeholder="Ex: Lisboa, Portugal"
              value={planInput.destination || ""}
              onChangeText={(text) => setPlanInput({ destination: text })}
              icon={
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
            <Input
              label="Data de ida"
              placeholder="AAAA-MM-DD"
              value={planInput.startDate || ""}
              onChangeText={(text) => setPlanInput({ startDate: text })}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
            <Input
              label="Data de volta"
              placeholder="AAAA-MM-DD"
              value={planInput.endDate || ""}
              onChangeText={(text) => setPlanInput({ endDate: text })}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
          </View>
        );

      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Quem vai viajar? 👥</Text>
            <Text style={styles.stepSubtitle}>
              Selecione o tipo de viajante
            </Text>

            <View style={styles.chipGrid}>
              {travelerTypes.map((t) => (
                <Chip
                  key={t.key}
                  label={t.label}
                  selected={planInput.travelers?.type === t.key}
                  icon={
                    <Ionicons
                      name={t.icon}
                      size={16}
                      color={
                        planInput.travelers?.type === t.key
                          ? "#fff"
                          : colors.neutral[500]
                      }
                    />
                  }
                  onPress={() =>
                    setPlanInput({
                      travelers: { ...planInput.travelers!, type: t.key },
                    })
                  }
                />
              ))}
            </View>

            <View style={styles.counterSection}>
              <Text style={styles.counterLabel}>Adultos</Text>
              <View style={styles.counterRow}>
                <Button
                  title="−"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    setPlanInput({
                      travelers: {
                        ...planInput.travelers!,
                        adults: Math.max(
                          1,
                          (planInput.travelers?.adults || 1) - 1,
                        ),
                      },
                    })
                  }
                />
                <Text style={styles.counterValue}>
                  {planInput.travelers?.adults || 1}
                </Text>
                <Button
                  title="+"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    setPlanInput({
                      travelers: {
                        ...planInput.travelers!,
                        adults: (planInput.travelers?.adults || 1) + 1,
                      },
                    })
                  }
                />
              </View>
            </View>

            <View style={styles.counterSection}>
              <Text style={styles.counterLabel}>Crianças</Text>
              <View style={styles.counterRow}>
                <Button
                  title="−"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    setPlanInput({
                      travelers: {
                        ...planInput.travelers!,
                        children: Math.max(
                          0,
                          (planInput.travelers?.children || 0) - 1,
                        ),
                      },
                    })
                  }
                />
                <Text style={styles.counterValue}>
                  {planInput.travelers?.children || 0}
                </Text>
                <Button
                  title="+"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    setPlanInput({
                      travelers: {
                        ...planInput.travelers!,
                        children: (planInput.travelers?.children || 0) + 1,
                      },
                    })
                  }
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Seu estilo de viagem 🎯</Text>
            <Text style={styles.stepSubtitle}>
              Selecione um ou mais estilos
            </Text>

            <View style={styles.chipGrid}>
              {travelStyles.map((s) => (
                <Chip
                  key={s.key}
                  label={s.label}
                  selected={planInput.travelStyles?.includes(s.key) || false}
                  icon={
                    <Ionicons
                      name={s.icon}
                      size={16}
                      color={
                        planInput.travelStyles?.includes(s.key)
                          ? "#fff"
                          : colors.neutral[500]
                      }
                    />
                  }
                  onPress={() => toggleStyle(s.key)}
                />
              ))}
            </View>

            <Text style={[styles.stepTitle, { marginTop: spacing[8] }]}>
              Ritmo da viagem
            </Text>
            <View style={styles.paceContainer}>
              {paceOptions.map((p) => (
                <Chip
                  key={p.key}
                  label={`${p.label}\n${p.desc}`}
                  selected={planInput.pace === p.key}
                  onPress={() => setPlanInput({ pace: p.key })}
                  style={styles.paceChip}
                />
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Orçamento 💰</Text>
            <Text style={styles.stepSubtitle}>
              Quanto pretende investir (por pessoa)?
            </Text>

            <Input
              label="Valor mínimo (R$)"
              placeholder="1000"
              keyboardType="numeric"
              value={planInput.budget?.min?.toString() || ""}
              onChangeText={(text) =>
                setPlanInput({
                  budget: { ...planInput.budget!, min: Number(text) || 0 },
                })
              }
              icon={
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
            <Input
              label="Valor máximo (R$)"
              placeholder="5000"
              keyboardType="numeric"
              value={planInput.budget?.max?.toString() || ""}
              onChangeText={(text) =>
                setPlanInput({
                  budget: { ...planInput.budget!, max: Number(text) || 0 },
                })
              }
              icon={
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
            <Input
              label="Notas adicionais (opcional)"
              placeholder="Alguma preferência especial?"
              multiline
              numberOfLines={3}
              value={planInput.notes || ""}
              onChangeText={(text) => setPlanInput({ notes: text })}
              icon={
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.neutral[400]}
                />
              }
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.topBar, { paddingTop: insets.top + spacing[2] }]}>
        <Button
          title="Voltar"
          onPress={handleBack}
          variant="ghost"
          size="sm"
          icon={
            <Ionicons
              name="chevron-back"
              size={20}
              color={colors.neutral[700]}
            />
          }
        />
        <Text style={styles.stepIndicator}>
          {step + 1} de {TOTAL_STEPS}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ProgressSteps total={TOTAL_STEPS} current={step} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStep()}
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}
      >
        <Button
          title={step === TOTAL_STEPS - 1 ? "✨ Gerar itinerário" : "Próximo"}
          onPress={handleNext}
          variant={step === TOTAL_STEPS - 1 ? "accent" : "primary"}
          size="lg"
          fullWidth
          disabled={!canProceed()}
          loading={isGenerating}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[3],
    paddingBottom: spacing[2],
  },
  stepIndicator: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[400],
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[10],
  },
  stepTitle: {
    ...textPresets.h3,
    color: colors.neutral[900],
    marginBottom: spacing[1],
  },
  stepSubtitle: {
    ...textPresets.body,
    color: colors.neutral[400],
    marginBottom: spacing[6],
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  counterSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  counterLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  counterValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    minWidth: 24,
    textAlign: "center",
  },
  paceContainer: {
    gap: spacing[2],
    marginTop: spacing[3],
  },
  paceChip: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: spacing[3],
  },
  footer: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    backgroundColor: colors.background.primary,
  },
});
