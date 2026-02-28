/**
 * Lightweight theme context that replaces react-native-unistyles.
 * Uses `useColorScheme()` to auto-switch between light and dark themes.
 *
 * Wrap your app root with `<ThemeProvider>` and access the current
 * theme anywhere via `useTheme()`.
 */
import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, type Theme } from "./theme";

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === "dark" ? darkTheme : lightTheme),
    [colorScheme],
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

/** Returns the current theme (light or dark) based on device setting. */
export const useTheme = (): Theme => useContext(ThemeContext);
