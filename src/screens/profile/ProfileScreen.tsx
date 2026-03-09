/**
 * Viaggo - Profile Screen
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
import { Card } from "../../components/ui/Card";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  color?: string;
  onPress?: () => void;
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "Conta",
    items: [
      {
        icon: "person-outline",
        label: "Editar perfil",
        subtitle: "Nome, foto e preferências",
      },
      {
        icon: "heart-outline",
        label: "Preferências de viagem",
        subtitle: "Estilo, ritmo, interesses",
      },
      {
        icon: "notifications-outline",
        label: "Notificações",
        subtitle: "Push, email, WhatsApp",
      },
    ],
  },
  {
    title: "Geral",
    items: [
      { icon: "shield-checkmark-outline", label: "Privacidade e segurança" },
      { icon: "help-circle-outline", label: "Ajuda e suporte" },
      { icon: "star-outline", label: "Avaliar o app" },
      { icon: "document-text-outline", label: "Termos de uso" },
    ],
  },
  {
    title: "",
    items: [
      {
        icon: "log-out-outline",
        label: "Sair da conta",
        color: colors.error[500],
      },
    ],
  },
];

export const ProfileScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{
        paddingTop: insets.top + spacing[2],
        paddingBottom: insets.bottom + 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <Avatar name="João Silveira" size={72} />
        <Text style={styles.profileName}>João Silveira</Text>
        <Text style={styles.profileEmail}>joao@email.com</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Viagens</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Propostas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Agentes</Text>
          </View>
        </View>
      </View>

      {/* Menu sections */}
      {menuSections.map((section, sIdx) => (
        <View key={sIdx} style={styles.menuSection}>
          {section.title ? (
            <Text style={styles.menuTitle}>{section.title}</Text>
          ) : null}
          <Card variant="outlined" style={styles.menuCard}>
            {section.items.map((item, iIdx) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  iIdx < section.items.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.6}
                onPress={item.onPress}
              >
                <View
                  style={[
                    styles.menuIconContainer,
                    {
                      backgroundColor: item.color
                        ? `${item.color}15`
                        : colors.neutral[50],
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.color || colors.neutral[600]}
                  />
                </View>
                <View style={styles.menuContent}>
                  <Text
                    style={[
                      styles.menuLabel,
                      item.color ? { color: item.color } : undefined,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.subtitle && (
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.neutral[300]}
                />
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      {/* Version */}
      <Text style={styles.version}>Viaggo v1.0.0</Text>
    </ScrollView>
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
  profileCard: {
    alignItems: "center",
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[6],
    backgroundColor: colors.background.primary,
    marginHorizontal: spacing[5],
    borderRadius: borderRadius.xl,
    marginBottom: spacing[6],
  },
  profileName: {
    ...textPresets.h3,
    color: colors.neutral[900],
    marginTop: spacing[3],
  },
  profileEmail: {
    ...textPresets.bodySm,
    color: colors.neutral[400],
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: spacing[5],
    gap: spacing[4],
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    ...textPresets.h4,
    color: colors.primary[600],
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.neutral[200],
    alignSelf: "center",
  },
  menuSection: {
    paddingHorizontal: spacing[5],
    marginBottom: spacing[5],
  },
  menuTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[400],
    marginBottom: spacing[2],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuCard: {
    padding: 0,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[3] + 2,
    paddingHorizontal: spacing[4],
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[50],
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    flex: 1,
    marginLeft: spacing[3],
  },
  menuLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[800],
  },
  menuSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
    marginTop: 1,
  },
  version: {
    textAlign: "center",
    fontSize: typography.fontSize.xs,
    color: colors.neutral[300],
    marginTop: spacing[4],
    marginBottom: spacing[8],
  },
});
