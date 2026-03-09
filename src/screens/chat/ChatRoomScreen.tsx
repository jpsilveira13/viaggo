/**
 * Viaggo - Chat Room Screen
 */
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import { spacing, borderRadius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import type { ChatMessage } from "../../types";

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    conversationId: "conv-1",
    senderId: "user-1",
    senderType: "user",
    content:
      "Olá! Vi que você é especialista em Portugal. Gostaria de saber mais sobre o roteiro de Lisboa.",
    type: "text",
    timestamp: "2026-03-02T10:00:00Z",
    read: true,
  },
  {
    id: "2",
    conversationId: "conv-1",
    senderId: "agent-1",
    senderType: "agent",
    content:
      "Oi! Que bom que entrou em contato! 😊 Vi o itinerário que você criou e ficou muito bom! Posso te ajudar a tornar essa viagem realidade.",
    type: "text",
    timestamp: "2026-03-02T10:05:00Z",
    read: true,
  },
  {
    id: "3",
    conversationId: "conv-1",
    senderId: "agent-1",
    senderType: "agent",
    content: "Enviei a proposta! Qualquer dúvida estou aqui 😊",
    type: "text",
    timestamp: "2026-03-02T14:05:00Z",
    read: true,
  },
];

export const ChatRoomScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const agentName = route.params?.agentName || "Agente";
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: "conv-1",
      senderId: "user-1",
      senderType: "user",
      content: inputText.trim(),
      type: "text",
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simula resposta do agente
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        conversationId: "conv-1",
        senderId: "agent-1",
        senderType: "agent",
        content:
          "Obrigado pela mensagem! Vou verificar e te retorno em breve. 😊",
        type: "text",
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.senderType === "user";

    return (
      <View
        style={[styles.msgRow, isUser ? styles.msgRowUser : styles.msgRowAgent]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAgent,
          ]}
        >
          <Text
            style={[
              styles.bubbleText,
              isUser ? styles.bubbleTextUser : styles.bubbleTextAgent,
            ]}
          >
            {item.content}
          </Text>
          <Text
            style={[styles.time, isUser ? styles.timeUser : styles.timeAgent]}
          >
            {new Date(item.timestamp).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing[2] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{agentName}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input bar */}
      <View
        style={[styles.inputBar, { paddingBottom: insets.bottom + spacing[2] }]}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escreva uma mensagem..."
            placeholderTextColor={colors.neutral[400]}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  headerName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  headerStatus: {
    fontSize: typography.fontSize.xs,
    color: colors.success[500],
  },
  messagesContent: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  msgRow: {
    marginBottom: spacing[3],
  },
  msgRowUser: {
    alignItems: "flex-end",
  },
  msgRowAgent: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: borderRadius.lg,
    padding: spacing[3],
  },
  bubbleUser: {
    backgroundColor: colors.primary[600],
    borderBottomRightRadius: 4,
  },
  bubbleAgent: {
    backgroundColor: colors.background.primary,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: typography.fontSize.base,
    lineHeight: 22,
  },
  bubbleTextUser: {
    color: "#fff",
  },
  bubbleTextAgent: {
    color: colors.neutral[800],
  },
  time: {
    fontSize: 10,
    marginTop: 4,
  },
  timeUser: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "right",
  },
  timeAgent: {
    color: colors.neutral[400],
  },
  inputBar: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing[2],
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[600],
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
});
