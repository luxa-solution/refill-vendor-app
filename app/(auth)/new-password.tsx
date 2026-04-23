import { Feather, Ionicons } from "@expo/vector-icons";
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

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isFormValid =
    password.length >= 8 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleUpdatePassword = () => {
    if (!isFormValid) return;
    router.replace("/(auth)/password-reset-success");
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
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>
              Choose a new password for your account.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>New password</Text>
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
                  size={23}
                  color="#111827"
                />
              </Pressable>
            </View>

            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputWithIconWrap}>
              <TextInput
                style={styles.inputWithIcon}
                secureTextEntry={!showConfirmPassword}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={23}
                  color="#111827"
                />
              </Pressable>
            </View>

            {confirmPassword.length > 0 && password !== confirmPassword ? (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            ) : null}
          </View>

          <View style={styles.footerWrap}>
            <Button
              title="Update Password"
              variant="filled"
              onPress={handleUpdatePassword}
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
  },
  formWrap: {
    marginTop: 80,
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F1E5A",
    marginBottom: 4,
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
  errorText: {
    marginTop: -10,
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "600",
  },
  footerWrap: {
    marginTop: 220,
    gap: 12,
  },
});
