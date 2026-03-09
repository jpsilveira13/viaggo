/**
 * Viaggo - Root Navigator
 * Stack Navigator principal que contém onboarding + tabs + modals
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import { OnboardingScreen } from "../screens/onboarding/OnboardingScreen";
import { TripPlannerScreen } from "../screens/trip-planner/TripPlannerScreen";
import { ItineraryScreen } from "../screens/itinerary/ItineraryScreen";
import { AgentProfileScreen } from "../screens/agents/AgentProfileScreen";
import { ChatRoomScreen } from "../screens/chat/ChatRoomScreen";
import { useAuthStore } from "../stores/authStore";
import type { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const isOnboarded = useAuthStore((s) => s.isOnboarded);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="TripPlanner"
            component={TripPlannerScreen}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="ItineraryView" component={ItineraryScreen} />
          <Stack.Screen name="AgentProfile" component={AgentProfileScreen} />
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
