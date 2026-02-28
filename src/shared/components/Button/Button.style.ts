import type { Theme } from "@/core/styles/theme";
import { StyleSheet } from "react-native";

/** Static styles that don't depend on theme */
export const buttonStyles = StyleSheet.create({
  base: {
    alignItems: "center" as const,
    borderRadius: 16,
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    minHeight: 56,
    padding: 10,
    overflow: "hidden" as const,
  },
  fullWidth: {
    alignSelf: "stretch" as const,
  },
  disabled: {
    opacity: 0.5,
  },
  innerRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  iconWrapper: {
    marginRight: 8,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  textBase: {
    fontSize: 16,
    fontWeight: "600" as const,
    letterSpacing: 0.3,
    textAlign: "center" as const,
  },
  gradientFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
});

/** Theme-dependent styles — call once per render with the current theme */
export const makeThemedButtonStyles = (theme: Theme) => ({
  filled: { backgroundColor: theme.colors.primaryDefault },
  outline: {
    backgroundColor: theme.colors.surfaceDefault,
    borderWidth: 1.5,
    borderColor: theme.colors.secondaryDefault,
  },
  textFilled: { color: theme.colors.textOnColorHeading },
  textOutline: { color: theme.colors.secondaryDefault },
  textGhost: { color: theme.colors.primaryDefault },
  gradientColors: [
    theme.colors.primary[300],
    theme.colors.primary[400],
    theme.colors.primaryDefault,
  ] as [string, string, string],
});
