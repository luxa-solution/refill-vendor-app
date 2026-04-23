import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuthStore } from "@/features/auth/store";
import { useOnboardingStore } from "@/features/onboarding/store";

export default function RootIndex() {
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
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
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

  return <Redirect href="/(tabs)/orders" />;
}
