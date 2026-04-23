import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/shared/components";

export default function PasswordResetSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={90} color="#22C55E" />
        </View>

        <Text style={styles.title}>Password Updated</Text>
        <Text style={styles.subtitle}>
          Your password has been reset successfully. Please log in with your new
          password.
        </Text>

        <View style={styles.footerWrap}>
          <Button
            title="Back to Login"
            variant="filled"
            onPress={() => router.replace("/(auth)/login")}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "center",
  },
  iconWrap: {
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  footerWrap: {
    marginTop: 42,
  },
});
