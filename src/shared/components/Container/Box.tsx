/**
 * Lightweight layout wrapper around React Native `View`.
 * Supports themed `backgroundColor` and `borderColor` via style prop,
 * plus common layout props like `flex` and `zIndex`.
 */
import React from "react";
import {
    ColorValue,
    StyleProp,
    View,
    ViewProps,
    ViewStyle,
} from "react-native";

export type ColorToken = string;

export interface BoxProps extends ViewProps {
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
  flex?: number;
  zIndex?: number;
}

const Box: React.FC<BoxProps> = ({
  backgroundColor,
  flex,
  borderColor,
  style,
  zIndex,
  ...rest
}) => {
  const dynamicStyle: ViewStyle = {
    ...(backgroundColor && { backgroundColor: backgroundColor as ColorValue }),
    ...(borderColor && { borderColor: borderColor as ColorValue }),
    ...(flex !== null && flex !== undefined && { flex }),
    ...(zIndex !== null && zIndex !== undefined && { zIndex }),
  };
  return (
    <View style={[dynamicStyle, style as StyleProp<ViewStyle>]} {...rest} />
  );
};

export default Box;
