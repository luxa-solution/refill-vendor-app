import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(digitsOnly);
  };

  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneNumber.length === 11 &&
    password.length >= 8 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleNext = () => {
    if (!isFormValid) return;

    router.replace({
      pathname: "/(auth)/otp",
      params: { phone: phoneNumber.trim() },
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
          <View style={styles.headerWrap}>
            <Ionicons name="flame" size={52} color="#F97316" />
            <Text style={styles.brand}>Refill</Text>
            <Text style={styles.title}>Let&apos;s get you started</Text>
            <Text style={styles.subtitle}>
              Create your refill account to continue.
            </Text>
          </View>

          <View style={styles.formWrap}>
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWithIconWrap}>
              <TextInput
                style={styles.inputWithIcon}
                keyboardType="phone-pad"
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={11}
              />
              <Feather name="phone" size={22} color="#111827" />
            </View>

            <Text style={styles.label}>Create password</Text>
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

            <Text style={styles.label}>Confirm Password</Text>
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
          </View>

          <View style={styles.footerWrap}>
            <Button
              title="Next"
              variant="filled"
              onPress={handleNext}
              disabled={!isFormValid}
              fullWidth
            />

            <View style={styles.loginHintRow}>
              <Text style={styles.loginHintText}>
                Already have a refill account?
              </Text>
              <Link href="/(auth)/login" asChild>
                <Text style={styles.loginLink}>Log in</Text>
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
    alignItems: "center",
    marginTop: 28,
  },
  brand: {
    marginTop: 6,
    fontSize: 38,
    fontWeight: "700",
    color: "#F97316",
    lineHeight: 42,
  },
  title: {
    marginTop: 38,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  formWrap: {
    marginTop: 36,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    height: 62,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  inputWithIconWrap: {
    height: 62,
    borderRadius: 16,
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
  footerWrap: {
    marginTop: 50,
    gap: 20,
  },
  loginHintRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  loginHintText: {
    color: "#6B7280",
    fontSize: 16,
  },
  loginLink: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "700",
  },
});
