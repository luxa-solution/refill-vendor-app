import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Button } from "@/shared/components";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(digitsOnly);
  };

  const isFormValid = phoneNumber.length === 11;

  const handleSendCode = () => {
    if (!isFormValid) return;

    router.push({
      pathname: "/(auth)/reset-otp",
      params: { phone: phoneNumber },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={32} color="#111827" />
          </Pressable>

          <View style={styles.headerWrap}>
            <Ionicons name="flame" size={46} color="#F97316" />
            <Text style={styles.brand}>Refil</Text>
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.subtitle}>
              Enter your phone number and we&apos;ll send a reset code.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder=""
              placeholderTextColor="#9CA3AF"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={11}
            />
          </View>

          <View style={styles.footerWrap}>
            <Button
              title="Send Reset Code"
              variant="filled"
              onPress={handleSendCode}
              disabled={!isFormValid}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 28,
  },
  backButton: {
    marginTop: 14,
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  headerWrap: {
    marginTop: 12,
    alignItems: "center",
  },
  brand: {
    marginTop: 6,
    fontSize: 36,
    fontWeight: "700",
    color: "#F97316",
    lineHeight: 40,
  },
  title: {
    marginTop: 32,
    fontSize: 24,
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
    paddingHorizontal: 6,
  },
  formWrap: {
    marginTop: 80,
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F1E5A",
    marginBottom: 4,
  },
  input: {
    height: 62,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  footerWrap: {
    marginTop: 220,
    gap: 12,
  },
});
