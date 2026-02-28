import type { Theme } from "@/core/styles/theme";
import { StyleSheet } from "react-native";

/** Static styles — no theme dependency */
export const onboardingStyles = StyleSheet.create({
  splashLogo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  splashBadgeRow: {
    flexDirection: "row" as const,
  },
  splashBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  slideContainer: {
    flex: 1,
  },
  skipRow: {
    flexDirection: "row" as const,
    justifyContent: "flex-end" as const,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  heroImageOuter: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingHorizontal: 28,
  },
  heroImageBg: {
    width: "100%" as unknown as number,
    height: "100%" as unknown as number,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  heroImageBgImg: {
    resizeMode: "contain" as const,
  },
  heroImage: {
    width: "70%" as unknown as number,
    height: "90%" as unknown as number,
  },
  dotsWrapper: {
    alignItems: "center" as const,
    marginTop: 20,
    marginBottom: 16,
  },
  titleBlock: {
    flex: 0.6,
    paddingHorizontal: 28,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  buttonBlock: {
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  topTextBlock: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 0,
    alignItems: "center" as const,
  },
  bottomImageOuter: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    marginBottom: -20,
  },
  bottomImageBg: {
    width: "100%" as unknown as number,
    height: "100%" as unknown as number,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  bottomImageBgImg: {
    resizeMode: "contain" as const,
  },
  bottomImage: {
    width: "75%" as unknown as number,
    height: "92%" as unknown as number,
  },
  ctaBlock: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    zIndex: 10,
  },
  ctaSpacer: {
    height: 14,
  },
});

/** Theme-dependent styles — call with the current theme */
export const makeThemedOnboardingStyles = (theme: Theme) => ({
  splashContainer: {
    flex: 1,
    backgroundColor: theme.colors.primaryDefault,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingBottom: 40,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: theme.colors.textOnColorHeading,
    letterSpacing: 2,
    marginBottom: 12,
  },
  splashBadgeText: {
    color: theme.colors.textOnColorHeading,
    fontSize: 14,
    fontWeight: "500" as const,
  },
  carouselRoot: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: theme.colors.secondaryDefault,
  },
  slideTitle: {
    fontSize: 30,
    fontWeight: "800" as const,
    lineHeight: 42,
    color: theme.colors.textDefaultHeading,
    textAlign: "center" as const,
    marginBottom: 12,
  },
  slideDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.textDefaultCaption,
    textAlign: "center" as const,
  },
  topTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    lineHeight: 38,
    color: theme.colors.textDefaultHeading,
    textAlign: "center" as const,
    marginBottom: 8,
  },
  topDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: theme.colors.textDefaultCaption,
    textAlign: "center" as const,
  },
});
