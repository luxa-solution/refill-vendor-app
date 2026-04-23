import { Href, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/core/styles/ThemeContext";
import { StepDots } from "@/features/auth/components/layout/StepDots";
import { Button } from "@/shared/components";
import { OnboardingSlide, onboardingSlides } from "../data/onboardingData";
import { useOnboardingStore } from "../store";
import {
  makeThemedOnboardingStyles,
  onboardingStyles as styles,
} from "./OnboardingScreen.styles";
import { SplashScreen } from "./SplashScreen";

const containerBg = require("@assets/images/container-bg.png");

const SCREEN_WIDTH = Dimensions.get("window").width;

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60,
};

/**
 * OnboardingScreens — Splash + multi-slide carousel matching the Refil Vendor design.
 *
 * Screen 1 & 2: Image on top → dots → title → description → Next button, Skip at top-right
 * Screen 3 (last): Title & description at top → image below → Login + Create account buttons
 */
export const OnboardingScreens = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [localIndex, setLocalIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const { setHasOnboarded } = useOnboardingStore();
  const theme = useTheme();
  const themed = makeThemedOnboardingStyles(theme);

  const total = onboardingSlides.length;
  const isLast = localIndex === total - 1;

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleSkip = () => {
    setHasOnboarded(true);
    router.replace("/(tabs)" as Href);
  };

  const handleNext = () => {
    if (isLast) return;
    const nextIndex = Math.min(localIndex + 1, total - 1);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handleLogin = () => {
    setHasOnboarded(true);
    router.replace("/(auth)/signup" as Href);
  };

  const handleCreateAccount = () => {
    setHasOnboarded(true);
    router.replace("/(auth)/login" as Href);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      const idx = viewableItems[0].index ?? 0;
      setLocalIndex(idx);
    }
  }).current;

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  const renderSlide: ListRenderItem<OnboardingSlide> = ({ item }) => {
    if (item.layout === "imageBottom") {
      return (
        <View style={[styles.slideContainer, { width: SCREEN_WIDTH }]}>
          <SafeAreaView style={themed.safeArea}>
            {/* Title & description at the top */}
            <View style={styles.topTextBlock}>
              <Text style={themed.topTitle}>{item.title}</Text>
              <Text style={themed.topDescription}>{item.description}</Text>
            </View>

            {/* Gas cylinder image — fills most of the screen */}
            <View style={styles.bottomImageOuter}>
              <ImageBackground
                source={containerBg}
                style={styles.bottomImageBg}
                imageStyle={styles.bottomImageBgImg}
                resizeMode="contain"
              >
                <Image
                  source={item.imgsrc}
                  style={styles.bottomImage}
                  resizeMode="contain"
                />
              </ImageBackground>
            </View>

            {/* CTA buttons — overlaid at the bottom */}
            <View style={styles.ctaBlock}>
              <Button
                title="Sign up"
                variant="filled"
                onPress={handleLogin}
                fullWidth
              />
              <View style={styles.ctaSpacer} />
              <Button
                title="Log in"
                variant="outline"
                onPress={handleCreateAccount}
                fullWidth
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }

    return (
      <View style={[styles.slideContainer, { width: SCREEN_WIDTH }]}>
        <SafeAreaView style={themed.safeArea}>
          {/* Skip button top-right */}
          <View style={styles.skipRow}>
            <Pressable onPress={handleSkip} hitSlop={12}>
              <Text style={themed.skipText}>Skip</Text>
            </Pressable>
          </View>

          {/* Gas cylinder hero image */}
          <View style={styles.heroImageOuter}>
            <ImageBackground
              source={containerBg}
              style={styles.heroImageBg}
              imageStyle={styles.heroImageBgImg}
              resizeMode="contain"
            >
              <Image
                source={item.imgsrc}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>

          {/* Progress dots */}
          <View style={styles.dotsWrapper}>
            <StepDots activeIndex={localIndex + 1} count={total} />
          </View>

          {/* Title & description */}
          <View style={styles.titleBlock}>
            <Text style={themed.slideTitle}>{item.title}</Text>
            <Text style={themed.slideDescription}>{item.description}</Text>
          </View>

          {/* Next button */}
          <View style={styles.buttonBlock}>
            <Button
              title="Next"
              variant="filled"
              onPress={handleNext}
              fullWidth
            />
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={themed.carouselRoot}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />
    </View>
  );
};
