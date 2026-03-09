/**
 * Viaggo - Bottom Tab Navigator
 */
import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ExploreScreen } from "../screens/agents/ExploreScreen";
import { TripsScreen } from "../screens/trips/TripsScreen";
import { MessagesScreen } from "../screens/chat/MessagesScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import type { MainTabParamList } from "../types";

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<
  keyof MainTabParamList,
  {
    focused: keyof typeof Ionicons.glyphMap;
    default: keyof typeof Ionicons.glyphMap;
  }
> = {
  Home: { focused: "home", default: "home-outline" },
  Explore: { focused: "compass", default: "compass-outline" },
  Trips: { focused: "airplane", default: "airplane-outline" },
  Messages: { focused: "chatbubbles", default: "chatbubbles-outline" },
  Profile: { focused: "person", default: "person-outline" },
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name as keyof MainTabParamList];
          const iconName = focused ? icons.focused : icons.default;
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Início" }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: "Explorar" }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{ tabBarLabel: "Viagens" }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ tabBarLabel: "Chat" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === "ios" ? 88 : 64,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: typography.fontWeight.medium,
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 4,
  },
});
