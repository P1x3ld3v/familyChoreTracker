import React, { JSX, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "ParentSignup">;

export default function ParentSignupScreen({ navigation }: Props): JSX.Element {
  const [fullName, setFullName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = (): void => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    console.log("Parent signup:", {
      fullName,
      dateOfBirth,
      email,
      password,
    });

    navigation.navigate("ParentSetup");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.sparkle}>✨</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Set up your family account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Pressable style={styles.primaryButton} onPress={handleSignup}>
            <Text style={styles.primaryText}>Create Family Account</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={styles.googleButton}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Sign up with Google</Text>
          </Pressable>

          <Pressable style={styles.appleButton}>
            <Text style={styles.appleText}> Sign up with Apple</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("ParentLogin")}>
            <Text style={styles.loginText}>
              Already have an account? Log in
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  back: {
    fontSize: 18,
    color: "#3B82F6",
    marginBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  sparkle: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#4B5563",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  label: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    fontSize: 15,
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#6B7280",
    fontSize: 13,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4285F4",
  },
  googleText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "700",
  },
  appleButton: {
    backgroundColor: "#000000",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  appleText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  loginText: {
    marginTop: 22,
    textAlign: "center",
    color: "#3B82F6",
    fontWeight: "700",
  },
});