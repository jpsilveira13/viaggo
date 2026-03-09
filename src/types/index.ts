/**
 * Viaggo - Core Domain Types
 */

// ============================================================
// USER
// ============================================================
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  preferences?: TravelPreferences;
}

export interface TravelPreferences {
  travelStyles: TravelStyle[];
  pace: TravelPace;
  interests: string[];
}

export type TravelStyle =
  | "adventure"
  | "relaxation"
  | "cultural"
  | "gastronomy"
  | "nightlife"
  | "nature"
  | "romantic"
  | "family";

export type TravelPace = "relaxed" | "moderate" | "intense";

// ============================================================
// TRIP PLANNING
// ============================================================
export interface TripPlanInput {
  destination: string;
  destinationCountry?: string;
  startDate: string;
  endDate: string;
  budget: BudgetRange;
  travelers: TravelerInfo;
  travelStyles: TravelStyle[];
  pace: TravelPace;
  notes?: string;
}

export interface BudgetRange {
  min: number;
  max: number;
  currency: string;
}

export interface TravelerInfo {
  adults: number;
  children: number;
  infants: number;
  type: TravelerType;
}

export type TravelerType = "solo" | "couple" | "family" | "friends" | "group";

// ============================================================
// TRIP & ITINERARY
// ============================================================
export interface Trip {
  id: string;
  userId: string;
  status: TripStatus;
  input: TripPlanInput;
  itinerary: Itinerary;
  createdAt: string;
  updatedAt: string;
}

export type TripStatus =
  | "planning"
  | "itinerary_ready"
  | "contacting_agents"
  | "proposal_received"
  | "confirmed"
  | "completed";

export interface Itinerary {
  id: string;
  tripId: string;
  days: ItineraryDay[];
  estimatedCost: CostBreakdown;
  tips: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  description: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: ActivityType;
  location?: Location;
  estimatedCost?: number;
  duration?: string; // "2h", "30min"
  imageUrl?: string;
  isBooked?: boolean;
}

export type ActivityType =
  | "transport"
  | "accommodation"
  | "food"
  | "attraction"
  | "experience"
  | "free_time"
  | "shopping"
  | "nightlife";

export interface Location {
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface CostBreakdown {
  accommodation: number;
  transport: number;
  food: number;
  activities: number;
  other: number;
  total: number;
  currency: string;
}

// ============================================================
// AGENTS
// ============================================================
export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  agency: string;
  bio: string;
  specialties: string[];
  destinations: string[];
  rating: number;
  reviewCount: number;
  responseTime: string; // "~2h", "~30min"
  verified: boolean;
  phone?: string;
  email: string;
  whatsapp?: string;
}

export interface AgentReview {
  id: string;
  agentId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ============================================================
// PROPOSALS
// ============================================================
export interface Proposal {
  id: string;
  tripId: string;
  agentId: string;
  agent: Agent;
  status: ProposalStatus;
  totalPrice: number;
  currency: string;
  message: string;
  includes: string[];
  excludes: string[];
  validUntil: string;
  createdAt: string;
}

export type ProposalStatus =
  | "pending"
  | "received"
  | "accepted"
  | "rejected"
  | "expired";

// ============================================================
// CHAT
// ============================================================
export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "user" | "agent";
  content: string;
  type: "text" | "image" | "proposal" | "itinerary";
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  tripId: string;
  userId: string;
  agentId: string;
  agent: Agent;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
}

// ============================================================
// NAVIGATION
// ============================================================
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  TripPlanner: { step?: number };
  TripDetail: { tripId: string };
  ItineraryView: { tripId: string };
  AgentProfile: { agentId: string };
  ChatRoom: { conversationId: string; agentName: string };
  ProposalDetail: { proposalId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Trips: undefined;
  Messages: undefined;
  Profile: undefined;
};
