import React, { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ParentLoginScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
});