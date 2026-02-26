import { useTheme } from "@/core/styles/ThemeContext";
import React from "react";
import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();
  return (
    <View
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...otherProps}
    />
  );
}
