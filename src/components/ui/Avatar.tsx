/**
 * Viaggo UI - Avatar Component
 */
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/colors";
import { borderRadius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  style?: ViewStyle | ImageStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 44,
  style,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style as ImageStyle,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.primary[100],
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.primary[700],
    fontWeight: typography.fontWeight.semibold,
  },
});
