/**
 * Viaggo - Onboarding Screen
 * Tela de boas-vindas com slides
 */
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { useAuthStore } from "../../stores/authStore";

const { width } = Dimensions.get("window");

interface Slide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  gradient: [string, string];
}

const slides: Slide[] = [
  {
    id: "1",
    icon: "airplane",
    title: "Planeje sua\nviagem dos sonhos",
    subtitle:
      "Diga pra onde quer ir, quanto quer gastar e nós criamos o itinerário perfeito com inteligência artificial.",
    gradient: [colors.primary[500], colors.primary[700]],
  },
  {
    id: "2",
    icon: "map",
    title: "Itinerário\npersonalizado",
    subtitle:
      "Roteiro dia a dia com atividades, restaurantes e experiências sob medida para o seu estilo.",
    gradient: [colors.accent[500], colors.accent[700]],
  },
  {
    id: "3",
    icon: "people",
    title: "Conecte-se com\nagentes experts",
    subtitle:
      "Envie seu plano para agentes de turismo verificados e receba propostas exclusivas.",
    gradient: ["#8B5CF6", "#6D28D9"],
  },
];

export const OnboardingScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleStart();
    }
  };

  const handleStart = () => {
    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <LinearGradient
        colors={item.gradient}
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={item.icon} size={48} color="#fff" />
      </LinearGradient>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Skip */}
      <View style={styles.skipContainer}>
        {currentIndex < slides.length - 1 && (
          <Button
            title="Pular"
            onPress={handleSkip}
            variant="ghost"
            size="sm"
          />
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Bottom */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* CTA */}
        <Button
          title={
            currentIndex === slides.length - 1
              ? "Começar a planejar"
              : "Próximo"
          }
          onPress={handleNext}
          variant={currentIndex === slides.length - 1 ? "accent" : "primary"}
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
  skipContainer: {
    alignItems: "flex-end",
    paddingHorizontal: spacing[5],
    height: 40,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[10],
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius["2xl"],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[10],
  },
  title: {
    ...textPresets.h1,
    color: colors.neutral[900],
    textAlign: "center",
    marginBottom: spacing[4],
  },
  subtitle: {
    ...textPresets.body,
    color: colors.neutral[400],
    textAlign: "center",
    lineHeight: 24,
  },
  bottom: {
    paddingHorizontal: spacing[5],
    gap: spacing[6],
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[2],
  },
  dot: {
    height: 4,
    borderRadius: borderRadius.full,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary[500],
  },
  dotInactive: {
    width: 8,
    backgroundColor: colors.neutral[200],
  },
});
