import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f8810b",
    backgroundColor: "#f6f6f6",
    overflow: "hidden",
  },
  filled: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#f8810b",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: "#f8810b",
  },
  dotInactive: {
    backgroundColor: "#f6f6f6",
  },
});
