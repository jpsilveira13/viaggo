/**
 * Viaggo - Agent Store
 */
import { create } from "zustand";
import type { Agent, Conversation, ChatMessage, Proposal } from "../types";

interface AgentState {
  agents: Agent[];
  conversations: Conversation[];
  proposals: Proposal[];

  // Actions
  setAgents: (agents: Agent[]) => void;
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  addProposal: (proposal: Proposal) => void;
  updateProposalStatus: (
    proposalId: string,
    status: Proposal["status"],
  ) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  conversations: [],
  proposals: [],

  setAgents: (agents) => set({ agents }),

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),

  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, lastMessage: message } : c,
      ),
    })),

  addProposal: (proposal) =>
    set((state) => ({
      proposals: [proposal, ...state.proposals],
    })),

  updateProposalStatus: (proposalId, status) =>
    set((state) => ({
      proposals: state.proposals.map((p) =>
        p.id === proposalId ? { ...p, status } : p,
      ),
    })),
}));
