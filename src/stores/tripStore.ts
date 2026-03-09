/**
 * Viaggo - Trip Store
 */
import { create } from "zustand";
import type {
  Trip,
  TripPlanInput,
  TripStatus,
  TravelStyle,
  TravelPace,
  TravelerType,
  Itinerary,
} from "../types";

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isGenerating: boolean;

  // Wizard state
  planInput: Partial<TripPlanInput>;

  // Actions
  setPlanInput: (input: Partial<TripPlanInput>) => void;
  resetPlanInput: () => void;
  setCurrentTrip: (trip: Trip) => void;
  addTrip: (trip: Trip) => void;
  updateTripStatus: (tripId: string, status: TripStatus) => void;
  setIsGenerating: (val: boolean) => void;
}

const defaultPlanInput: Partial<TripPlanInput> = {
  travelers: {
    adults: 1,
    children: 0,
    infants: 0,
    type: "solo" as TravelerType,
  },
  travelStyles: [] as TravelStyle[],
  pace: "moderate" as TravelPace,
  budget: {
    min: 1000,
    max: 5000,
    currency: "BRL",
  },
};

export const useTripStore = create<TripState>((set) => ({
  trips: [],
  currentTrip: null,
  isGenerating: false,
  planInput: { ...defaultPlanInput },

  setPlanInput: (input) =>
    set((state) => ({
      planInput: { ...state.planInput, ...input },
    })),

  resetPlanInput: () => set({ planInput: { ...defaultPlanInput } }),

  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  addTrip: (trip) =>
    set((state) => ({
      trips: [trip, ...state.trips],
      currentTrip: trip,
    })),

  updateTripStatus: (tripId, status) =>
    set((state) => ({
      trips: state.trips.map((t) =>
        t.id === tripId
          ? { ...t, status, updatedAt: new Date().toISOString() }
          : t,
      ),
    })),

  setIsGenerating: (val) => set({ isGenerating: val }),
}));
