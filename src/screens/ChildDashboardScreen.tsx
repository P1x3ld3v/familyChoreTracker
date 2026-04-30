import React, { JSX } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { useAppContext } from "../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "ChildDashboard">;

export default function ChildDashboardScreen({
  navigation,
}: Props): JSX.Element {
  const { chores, submitCompletion, completions } = useAppContext();
  const visibleChores = chores.filter((chore) => !chore.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Hi Emma 👋</Text>

          <Pressable
            style={styles.logoutButton}
            onPress={() =>
              Alert.alert("Logout", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Logout",
                  onPress: () => navigation.navigate("Welcome"),
                },
              ])
            }
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>Let’s earn your allowance!</Text>

        <View style={styles.meterCard}>
          <Text style={styles.meterLabel}>Allowance Meter</Text>
          <Text style={styles.meterAmount}>$12 / $20 this week</Text>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today’s Chores</Text>

        <View style={styles.choreList}>
          {visibleChores.length === 0 && (
            <Text style={styles.emptyText}>
              No chores yet. Ask your parent to add one.
            </Text>
          )}

{visibleChores.map((chore) => {
  const alreadyPending = completions.some(
    (item) =>
      item.choreId === chore.id &&
      item.childName === "Emma" &&
      item.status === "pending"
  );

  return (
    <View key={chore.id} style={styles.choreCard}>
      <View>
        <Text style={styles.choreTitle}>{chore.name}</Text>
        <Text style={styles.choreValue}>+${chore.reward}</Text>
      </View>

      <Pressable
        disabled={alreadyPending}
        style={({ pressed }) => [
          styles.choreButton,
          alreadyPending && styles.pendingButton,
          pressed && { opacity: 0.6 },
        ]}
        onPress={() => {
          submitCompletion({
            id: Date.now().toString(),
            choreId: chore.id,
            choreName: chore.name,
            childName: "Emma",
            reward: chore.reward,
            status: "pending",
          });

          Alert.alert("Submitted!", `${chore.name} sent for approval`);
        }}
      >
        <Text style={styles.choreButtonText}>
          {alreadyPending ? "Pending" : "Mark Done"}
        </Text>
      </Pressable>
    </View>
  );
})}
        </View>

        <View style={styles.rewardRow}>
          <View style={styles.rewardCard}>
            <Text style={styles.rewardEmoji}>⭐</Text>
            <Text style={styles.rewardText}>3 day streak</Text>
          </View>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardEmoji}>🏆</Text>
            <Text style={styles.rewardText}>Helper badge</Text>
          </View>
        </View>

        <View style={styles.payoutCard}>
          <Text style={styles.payoutTitle}>Next payout</Text>
          <Text style={styles.payoutText}>
            Friday · You’ve earned $12 so far
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pendingButton: {
  backgroundColor: "#CBD5E1",
},
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  logoutText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
  meterCard: {
    marginTop: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  meterLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  meterAmount: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },
  progressTrack: {
    marginTop: 18,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressFill: {
    width: "60%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#7C3AED",
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  choreList: {
    gap: 12,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },
  choreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  choreTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  choreValue: {
    marginTop: 4,
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "700",
  },
  choreButton: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  choreButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  rewardRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
  },
  rewardEmoji: {
    fontSize: 24,
  },
  rewardText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  payoutCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  payoutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  payoutText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  
});