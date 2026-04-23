import { useAuthStore } from "@/features/auth/store";
import { useOnboardingStore } from "@/features/onboarding/store";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../src/theme/colors";

export default function TabLayout() {
  const hasOnboarded = useOnboardingStore((state) => state.hasOnboarded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const vendorProfileComplete = useAuthStore(
    (state) => state.vendorProfileComplete,
  );
  const [isHydrated, setIsHydrated] = useState(
    useOnboardingStore.persist.hasHydrated() &&
      useAuthStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubOnboarding = useOnboardingStore.persist.onFinishHydration(() => {
      if (useAuthStore.persist.hasHydrated()) {
        setIsHydrated(true);
      }
    });

    const unsubAuth = useAuthStore.persist.onFinishHydration(() => {
      if (useOnboardingStore.persist.hasHydrated()) {
        setIsHydrated(true);
      }
    });

    if (
      useOnboardingStore.persist.hasHydrated() &&
      useAuthStore.persist.hasHydrated()
    ) {
      setIsHydrated(true);
    }

    return () => {
      unsubOnboarding();
      unsubAuth();
    };
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!vendorProfileComplete) {
    return <Redirect href="/(auth)/vendor-account" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Image
                source={require("../../assets/images/package_2.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="earning"
        options={{
          title: "Earnings",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Image
                source={require("../../assets/images/earning-icon.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="earning/history"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="vendor"
        options={{
          title: "My Vendor",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Image
                source={require("../../assets/images/vendor-icon.png")}
                style={[
                  styles.icon,
                  { tintColor: focused ? colors.white : colors.textGray },
                ]}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
