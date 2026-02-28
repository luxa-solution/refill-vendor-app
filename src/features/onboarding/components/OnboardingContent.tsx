import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import { OnboardingSlide } from "../data/onboardingData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type OnboardingContentProps = {
  slide: OnboardingSlide;
};

/**
 * OnboardingContent — Renders hero image for the carousel.
 *
 * @component
 */
export const OnboardingContent = ({ slide }: OnboardingContentProps) => {
  return (
    <View style={[contentStyles.root, { width: SCREEN_WIDTH }]}>
      <Image
        source={slide.imgsrc}
        style={contentStyles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const contentStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "80%",
  },
});
