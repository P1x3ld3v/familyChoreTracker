import React, { JSX } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";

export default function ChildDashboardScreen(): JSX.Element {
  const chores = [
    { id: 1, title: "Make Bed", value: 2, done: true },
    { id: 2, title: "Feed Pet", value: 1, done: true },
    { id: 3, title: "Laundry", value: 3, done: false },
    { id: 4, title: "Set Table", value: 2, done: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi Emma 👋</Text>
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
          {chores.map((chore) => (
            <View
              key={chore.id}
              style={[styles.choreCard, chore.done && styles.choreCardDone]}
            >
              <View>
                <Text style={styles.choreTitle}>{chore.title}</Text>
                <Text style={styles.choreValue}>+${chore.value}</Text>
              </View>

              <Pressable
                style={[styles.choreButton, chore.done && styles.doneButton]}
              >
                <Text
                  style={[styles.choreButtonText, chore.done && styles.doneText]}
                >
                  {chore.done ? "Done" : "Mark Done"}
                </Text>
              </Pressable>
            </View>
          ))}
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
          <Text style={styles.payoutText}>Friday · You’ve earned $12 so far</Text>
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
    padding: 24,
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
  choreCardDone: {
    opacity: 0.65,
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
  doneButton: {
    backgroundColor: "#E2E8F0",
  },
  choreButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  doneText: {
    color: "#64748B",
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