import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Button } from "@/shared/components";

const OTP_DIGITS = 4;
const OTP_TIMEOUT_SECONDS = 4 * 60 + 40;
const MOCK_VALID_OTP = "1234";

export default function OtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [code, setCode] = useState(["", "", "", ""]);
  const [remainingSeconds, setRemainingSeconds] = useState(OTP_TIMEOUT_SECONDS);
  const [errorMessage, setErrorMessage] = useState("");

  const refs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTimer = useMemo(() => {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, [remainingSeconds]);

  const maskedPhone = useMemo(() => {
    if (!phone || typeof phone !== "string") return "";
    const visible = phone.slice(-4);
    return ` to ${"*".repeat(Math.max(0, phone.length - 4))}${visible}`;
  }, [phone]);

  const updateDigit = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (errorMessage) {
      setErrorMessage("");
    }

    if (digit && index < OTP_DIGITS - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (code[index] || index === 0) return;
    refs.current[index - 1]?.focus();
  };

  const handleResendCode = () => {
    setCode(["", "", "", ""]);
    setRemainingSeconds(OTP_TIMEOUT_SECONDS);
    setErrorMessage("");
    refs.current[0]?.focus();
  };

  const isCodeComplete = code.every((digit) => digit.length === 1);

  const handleVerifyOtp = () => {
    if (!isCodeComplete) {
      setErrorMessage("Please enter all 4 digits.");
      return;
    }

    if (remainingSeconds <= 0) {
      setErrorMessage("Code expired. Please resend code.");
      return;
    }

    const enteredCode = code.join("");
    if (enteredCode !== MOCK_VALID_OTP) {
      setErrorMessage("Invalid code. Please try again.");
      return;
    }

    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={34} color="#111827" />
        </Pressable>

        <View style={styles.headerWrap}>
          <Ionicons name="flame" size={52} color="#F97316" />
          <Text style={styles.brand}>Refill</Text>
          <Text style={styles.title}>Enter Four Digits Code</Text>
          <Text style={styles.subtitle}>
            We&apos;ve texted you 4 digits code, input to proceed{maskedPhone}
          </Text>
        </View>

        <View style={styles.otpWrap}>
          <Text style={styles.otpLabel}>Enter 4 digits code</Text>

          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={`otp-${index}`}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                value={digit}
                onChangeText={(text) => updateDigit(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(index);
                  }
                }}
                style={[
                  styles.otpInput,
                  errorMessage ? styles.otpInputError : null,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {!!errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <Text style={styles.timer}>{formattedTimer} Left</Text>
        </View>

        <View style={styles.footerWrap}>
          <Button
            title="Sign Up"
            variant="filled"
            onPress={handleVerifyOtp}
            disabled={!isCodeComplete}
            fullWidth
          />

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Yet to receive code?</Text>
            <Pressable onPress={handleResendCode}>
              <Text style={styles.resendLink}>Resend code</Text>
            </Pressable>
          </View>
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
  },
  backButton: {
    marginTop: 14,
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  headerWrap: {
    alignItems: "center",
    marginTop: 4,
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
  otpWrap: {
    marginTop: 62,
  },
  otpLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  otpInput: {
    flex: 1,
    height: 98,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    fontSize: 36,
    color: "#111827",
    fontWeight: "600",
  },
  otpInputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    marginTop: 8,
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "600",
  },
  timer: {
    marginTop: 12,
    textAlign: "right",
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
  },
  footerWrap: {
    marginTop: 112,
    gap: 20,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  resendText: {
    color: "#6B7280",
    fontSize: 16,
  },
  resendLink: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "700",
  },
});
