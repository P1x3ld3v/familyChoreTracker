import React, { JSX } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Approval">;

export default function ApprovalScreen({ navigation, route }: Props): JSX.Element {
  const { child, chore, value } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{child[0]}</Text>
          </View>

          <Text style={styles.title}>Approve Chore?</Text>
          <Text style={styles.subtitle}>{child} completed</Text>

          <Text style={styles.choreName}>{chore}</Text>
          <Text style={styles.reward}>Earn ${value}</Text>

          <Pressable
            style={styles.approveButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.approveText}>Approve</Text>
          </Pressable>

          <Pressable
            style={styles.rejectButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FB" },
  container: { flex: 1, padding: 24 },
  back: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 60,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 15,
  },
  choreName: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  reward: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "800",
    color: "#16A34A",
  },
  approveButton: {
    width: "100%",
    marginTop: 32,
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  approveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  rejectButton: {
    width: "100%",
    marginTop: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  rejectText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "800",
  },
});