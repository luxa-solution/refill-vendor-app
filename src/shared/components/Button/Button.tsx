import { useTheme } from "@/core/styles/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { buttonStyles, makeThemedButtonStyles } from "./Button.style";

export type ButtonVariant = "filled" | "outline" | "ghost";

export interface ButtonProps extends Omit<
  PressableProps,
  "style" | "children"
> {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

const spinnerColorMap: Record<ButtonVariant, string> = {
  filled: "#fefefe",
  outline: "#0e2c8e",
  ghost: "#f8810b",
};

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      title,
      onPress,
      variant = "filled",
      disabled = false,
      loading = false,
      leftIcon,
      style,
      textStyle,
      fullWidth = true,
      ...pressableProps
    },
    ref,
  ) => {
    const theme = useTheme();
    const themed = makeThemedButtonStyles(theme);

    const variantBg =
      variant === "ghost"
        ? buttonStyles.ghost
        : variant === "filled"
          ? themed.filled
          : themed[variant];

    const textColor =
      variant === "filled"
        ? themed.textFilled
        : variant === "outline"
          ? themed.textOutline
          : themed.textGhost;

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{
          disabled: disabled || loading,
          busy: loading,
        }}
        style={[
          buttonStyles.base,
          variantBg,
          fullWidth && buttonStyles.fullWidth,
          disabled && buttonStyles.disabled,
          style,
        ]}
        {...pressableProps}
      >
        {variant === "filled" && (
          <LinearGradient
            colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0)"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.4, y: 0.8 }}
            style={buttonStyles.gradientFill}
          />
        )}
        {loading ? (
          <ActivityIndicator color={spinnerColorMap[variant]} size="small" />
        ) : (
          <View style={buttonStyles.innerRow}>
            {leftIcon && (
              <View style={buttonStyles.iconWrapper}>{leftIcon}</View>
            )}
            <Text style={[buttonStyles.textBase, textColor, textStyle]}>
              {title}
            </Text>
          </View>
        )}
      </Pressable>
    );
  },
);

Button.displayName = "Button";
