import React, { JSX } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;


export default function WelcomeScreen({ navigation }: Props): JSX.Element {
const handleParentPress = (): void => {
  navigation.navigate("ParentLogin");
};

const handleKidPress = (): void => {
  navigation.navigate("KidPin");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>C</Text>
        </View>

        <Text style={styles.title}>Chores + Allowance</Text>

        <Text style={styles.subtitle}>
          Rewards for kids. Control for parents.
        </Text>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.parentButton} onPress={handleParentPress}>
            <Text style={styles.parentButtonTitle}>I’m a Parent</Text>
            <Text style={styles.parentButtonSubtitle}>
              Create an account or log in
            </Text>
          </Pressable>

          <Pressable style={styles.kidButton} onPress={handleKidPress}>
            <Text style={styles.kidButtonTitle}>I’m a Kid</Text>
            <Text style={styles.kidButtonSubtitle}>
              Enter with your name and PIN
            </Text>
          </Pressable>
        </View>

        <View style={styles.trustBox}>
          <Text style={styles.trustText}>
            Parent-controlled approvals and payouts
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={styles.footerLink}>Privacy</Text>
        </View>
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
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  title: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 40,
    gap: 16,
  },
  parentButton: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
  },
  parentButtonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  parentButtonSubtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 4,
  },
  kidButton: {
    backgroundColor: "#EEF2FF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D9E1FF",
  },
  kidButtonTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },
  kidButtonSubtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },
  trustBox: {
    width: "100%",
    marginTop: 32,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  trustText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    gap: 24,
    marginTop: 32,
  },
  footerLink: {
    color: "#94A3B8",
    fontSize: 13,
  },
});