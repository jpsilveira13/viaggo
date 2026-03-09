/**
 * Viaggo - Messages Screen (Conversations List)
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../../components/ui/Avatar";
import { EmptyState } from "../../components/ui/EmptyState";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { textPresets, typography } from "../../theme/typography";
import { mockConversations } from "../../services/mockData";
import type { Conversation } from "../../types";

export const MessagesScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const renderConversation = ({ item }: { item: Conversation }) => {
    const timeStr = item.lastMessage
      ? new Date(item.lastMessage.timestamp).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <TouchableOpacity
        style={styles.conversationItem}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("ChatRoom", {
            conversationId: item.id,
            agentName: item.agent.name,
          })
        }
      >
        <Avatar uri={item.agent.avatar} name={item.agent.name} size={50} />
        <View style={styles.conversationContent}>
          <View style={styles.conversationTop}>
            <Text style={styles.agentName}>{item.agent.name}</Text>
            <Text style={styles.time}>{timeStr}</Text>
          </View>
          <View style={styles.conversationBottom}>
            <Text
              style={[
                styles.lastMessage,
                item.unreadCount > 0 && styles.lastMessageUnread,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage?.content || "Nenhuma mensagem"}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[2] }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensagens</Text>
        <Text style={styles.subtitle}>
          {mockConversations.length} conversa(s)
        </Text>
      </View>

      <FlatList
        data={mockConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            icon={
              <Ionicons
                name="chatbubbles-outline"
                size={48}
                color={colors.neutral[300]}
              />
            }
            title="Nenhuma conversa"
            description="Quando você entrar em contato com um agente, as mensagens aparecerão aqui."
          />
        }
      />
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
  conversationItem: {
    flexDirection: "row",
    paddingVertical: spacing[3],
    alignItems: "center",
  },
  conversationContent: {
    flex: 1,
    marginLeft: spacing[3],
  },
  conversationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agentName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  time: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[400],
  },
  conversationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  lastMessage: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
    marginRight: spacing[2],
  },
  lastMessageUnread: {
    color: colors.neutral[700],
    fontWeight: typography.fontWeight.medium,
  },
  unreadBadge: {
    backgroundColor: colors.accent[500],
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral[100],
  },
});
