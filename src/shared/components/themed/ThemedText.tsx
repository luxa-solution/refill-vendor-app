import { useTheme } from "@/core/styles/ThemeContext";
import type { Theme } from "@/core/styles/theme";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "caption";
};

const makeTypeStyles = (theme: Theme) => ({
  default: { fontSize: 16, color: theme.colors.typography } as TextStyle,
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
    color: theme.colors.textDefaultHeading,
  } as TextStyle,
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: theme.colors.typography,
  } as TextStyle,
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: theme.colors.textDefaultBody,
  } as TextStyle,
  link: {
    fontSize: 16,
    color: theme.colors.primaryDefault,
    textDecorationLine: "underline" as const,
  } as TextStyle,
  caption: {
    fontSize: 14,
    color: theme.colors.textDefaultCaption,
  } as TextStyle,
});

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const typeStyles = makeTypeStyles(theme);
  const typeStyle = typeStyles[type] ?? typeStyles.default;
  return <Text style={[typeStyle, style]} {...rest} />;
}
