import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
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

import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/shared/components";

export default function LoginScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const vendorProfileComplete = useAuthStore(
    (state) => state.vendorProfileComplete,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    typeof phone === "string" ? phone.replace(/\D/g, "").slice(0, 11) : "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(digitsOnly);
  };

  const isFormValid = phoneNumber.length === 11 && password.length >= 8;

  const handleLogin = () => {
    if (!isFormValid) return;
    setAuthenticated(true);
    router.replace(
      vendorProfileComplete ? "/(tabs)/orders" : "/(auth)/vendor-account",
    );
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
          <View style={styles.headerWrap}>
            <View style={styles.brandRow}>
              <Ionicons name="flame" size={20} color="#F97316" />
              <Text style={styles.brand}>Refil</Text>
            </View>
            <View style={styles.topDivider} />

            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>
              Enter your phone number and password to login
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

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWithIconWrap}>
              <TextInput
                style={styles.inputWithIcon}
                secureTextEntry={!showPassword}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#111827"
                />
              </Pressable>
            </View>

            <View style={styles.metaRow}>
              <Pressable
                style={styles.rememberWrap}
                onPress={() => setRememberMe((prev) => !prev)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <Feather name="check" size={14} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.metaText}>Remember me</Text>
              </Pressable>

              <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                <Text style={styles.metaText}>Forgot password</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footerWrap}>
            <Button
              title="Login"
              variant="filled"
              onPress={handleLogin}
              disabled={!isFormValid}
              fullWidth
            />

            <View style={styles.signupHintRow}>
              <Text style={styles.signupHintText}>Not a registered user?</Text>
              <Link href="/(auth)/signup" asChild>
                <Text style={styles.signupLink}>Sign up</Text>
              </Link>
            </View>
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
  headerWrap: {
    marginTop: 16,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brand: {
    fontSize: 44,
    color: "#F97316",
    fontWeight: "700",
    lineHeight: 48,
  },
  topDivider: {
    marginTop: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#0F1E5A",
  },
  title: {
    marginTop: 76,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F1E5A",
    textAlign: "center",
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  formWrap: {
    marginTop: 170,
    gap: 16,
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
  inputWithIconWrap: {
    height: 62,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingLeft: 16,
    paddingRight: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  metaRow: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "#0F1E5A",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#0F1E5A",
  },
  metaText: {
    color: "#64748B",
    fontSize: 16,
  },
  footerWrap: {
    marginTop: 250,
    gap: 22,
  },
  signupHintRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  signupHintText: {
    color: "#6B7280",
    fontSize: 16,
  },
  signupLink: {
    color: "#0F1E5A",
    fontSize: 16,
    fontWeight: "700",
  },
});
