import React, { useEffect } from "react";
import { Image, View } from "react-native";

import { useTheme } from "@/core/styles/ThemeContext";
import {
  makeThemedOnboardingStyles,
  onboardingStyles,
} from "./OnboardingScreen.styles";

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

/**
 * SplashScreen — Orange branded screen shown on first launch.
 * Shows the Refil logo, flame icon, and "Vendor App" label.
 * Auto-advances after `durationMs` (default 2.5s).
 */
export const SplashScreen = ({
  onFinish,
  durationMs = 2500,
}: SplashScreenProps) => {
  const theme = useTheme();
  const themed = makeThemedOnboardingStyles(theme);

  useEffect(() => {
    const timer = setTimeout(onFinish, durationMs);
    return () => clearTimeout(timer);
  }, [onFinish, durationMs]);

  return (
    <View style={themed.splashContainer}>
      {/* Flame / Logo */}
      <Image
        source={require("@assets/images/refill-logo.png")}
        style={onboardingStyles.splashLogo}
        resizeMode="contain"
      />
    </View>
  );
};
