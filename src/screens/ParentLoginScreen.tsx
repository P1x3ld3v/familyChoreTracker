import React, { JSX, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
type Props = NativeStackScreenProps<RootStackParamList, "ParentLogin">;

export default function ParentLoginScreen({ navigation }: Props): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

const handleLogin = (): void => {
  navigation.navigate("ParentDashboard");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.back}>‹ Back</Text>

        <Text style={styles.title}>Welcome, Parent</Text>
        <Text style={styles.subtitle}>Log in to manage chores and allowance.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="parent@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>

      <Pressable onPress={() => navigation.navigate("ParentSignup")}>
  <Text style={styles.footerText}>New here? Create a family account</Text>
</Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  back: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },
  form: {
    marginTop: 36,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  button: {
    marginTop: 28,
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#7C3AED",
    fontSize: 14,
    fontWeight: "600",
  },
});