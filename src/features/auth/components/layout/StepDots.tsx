import { useTheme } from "@/core/styles/ThemeContext";
import React from "react";
import { View } from "react-native";

interface StepDotsProps {
  activeIndex: number;
  count: number;
  dotSize?: number;
  spacing?: number;
}

/**
 * StepDots — Active dot is an elongated dash, inactive dots are small circles.
 * Matches the Refil Vendor onboarding design.
 */
export const StepDots = ({
  activeIndex,
  count,
  dotSize = 8,
  spacing = 8,
}: StepDotsProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: spacing,
      }}
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index < activeIndex;
        return (
          <View
            key={index}
            style={{
              width: isActive ? dotSize * 3 : dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: isActive
                ? theme.colors.primaryDefault
                : theme.colors.secondaryDefault,
            }}
          />
        );
      })}
    </View>
  );
};
