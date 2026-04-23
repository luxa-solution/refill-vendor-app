import { useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { Button } from "@/shared/components";

export default function VendorAccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
          justifyContent: "center",
          gap: 14,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#111827" }}>
          Vendor Account Setup
        </Text>
        <Text style={{ fontSize: 16, color: "#4B5563", lineHeight: 24 }}>
          Separate screen for vendor account profile completion after
          signup/login.
        </Text>

        <Button
          title="Complete Setup"
          variant="filled"
          onPress={() => router.replace("/(tabs)/orders")}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
