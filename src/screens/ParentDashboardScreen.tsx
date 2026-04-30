import React, { JSX, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "ParentDashboard">;

type TabType = "dashboard" | "pending" | "wallet" | "settings";

export default function ParentDashboardScreen({
  navigation,
}: Props): JSX.Element {
  const insets = useSafeAreaInsets();
  const { chores, completions, approveCompletion, rejectCompletion , walletBalance } = useAppContext();

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const activeChores = chores.filter((chore) => !chore.completed);
const totalChores = chores.length;
const completedCount = chores.filter((chore) => chore.completed).length;

const progressPercent =
  totalChores === 0 ? 0 : Math.round((completedCount / totalChores) * 100);
  const completedChores = chores.filter((chore) => chore.completed);
  const recentActivity = completions
  .filter((item) => item.status !== "pending")
  .slice()
  .reverse();



const pendingApprovals = completions.filter(
  (item) => item.status === "pending"
);

  const title =
    activeTab === "dashboard"
      ? "Dashboard"
      : activeTab === "pending"
      ? "Pending Approvals"
      : activeTab === "wallet"
      ? "Wallet"
      : "Settings";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>

          <Pressable
            style={styles.logoutButton}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentInner}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "dashboard" && (
            <>
              <View style={styles.centerHeader}>
                <Text style={styles.pageTitle}>Family Dashboard</Text>
                <Text style={styles.pageSubtitle}>
                  Track chores and approve rewards
                </Text>
              </View>

              <Pressable
                style={styles.addChoreButton}
                onPress={() => navigation.navigate("CreateChore")}
              >
                <Text style={styles.addChoreText}>＋ Add Chore</Text>
              </Pressable>

              <View style={styles.childCard}>
                <View style={styles.childTopRow}>
                  <View style={[styles.avatarCircle, styles.emmaAvatar]}>
                    <Text style={styles.avatarEmoji}>👧</Text>
                  </View>

                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>Emma</Text>
                        <Text style={styles.childMeta}>
                        {completedCount} of {totalChores} chores completed
                        </Text>
                  </View>
                </View>

                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Allowance Progress</Text>
                  <Text style={styles.progressAmount}>{progressPercent}%</Text>
                </View>

                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>
              </View>

              <View style={styles.childCard}>
                <View style={styles.childTopRow}>
                  <View style={[styles.avatarCircle, styles.jackAvatar]}>
                    <Text style={styles.avatarEmoji}>👦</Text>
                  </View>

                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>Jack</Text>
                    <Text style={styles.childMeta}>
                      3 of 5 chores completed
                    </Text>
                  </View>
                </View>

                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Allowance Progress</Text>
                  <Text style={styles.progressAmount}>$8 / $15</Text>
                </View>

                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: "53%" }]} />
                </View>
              </View>

             <View style={styles.card}>
                <Text style={styles.cardTitle}>Today's Chores</Text>

                {chores.length === 0 && (
                    <Text style={styles.emptyText}>No chores yet. Add your first chore.</Text>
                )}

                {completedChores.map((chore) => (
                    <View key={chore.id} style={styles.choreRow}>
                    <View style={styles.completedDot}>
                        <Text style={styles.checkText}>✓</Text>
                    </View>
                    <Text style={styles.completedChore}>{chore.name}</Text>
                    </View>
                ))}

                {activeChores.map((chore) => (
                    <View key={chore.id} style={styles.choreRow}>
                    <View style={styles.emptyDot} />
                    <Text style={styles.incompleteChore}>{chore.name}</Text>
                    </View>
                ))}
                </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Chores</Text>

                {activeChores.length === 0 && (
                  <Text style={styles.emptyText}>
                    No chores yet. Add your first chore.
                  </Text>
                )}

                {activeChores.map((chore) => (
                  <View key={chore.id} style={styles.choreListRow}>
                    <View>
                      <Text style={styles.listTitle}>{chore.name}</Text>
                      <Text style={styles.moneyText}>
                        ${chore.reward.toFixed(2)}
                      </Text>
                    </View>

                    <Text style={styles.assignedText}>
                      {chore.assignedTo.length > 0
                        ? chore.assignedTo.join(", ")
                        : "Unassigned"}
                    </Text>
                  </View>
                ))}
              </View>

                <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Activity</Text>

                {recentActivity.length === 0 && (
                    <Text style={styles.emptyText}>No recent activity yet.</Text>
                )}

                {recentActivity.map((item) => (
                    <View key={item.id} style={styles.activityRow}>
                    <View
                        style={[
                        styles.activityIcon,
                        item.status === "approved" ? styles.greenIcon : styles.blueIcon,
                        ]}
                    >
                        <Text>{item.status === "approved" ? "✓" : "×"}</Text>
                    </View>

                    <View>
                        <Text style={styles.activityTitle}>
                        {item.status === "approved"
                            ? `${item.childName} earned $${item.reward} for ${item.choreName}`
                            : `${item.childName}'s ${item.choreName} was rejected`}
                        </Text>
                        <Text style={styles.activityTime}>Just now</Text>
                    </View>
                    </View>
                ))}
                </View>
            </>
          )}

          {activeTab === "pending" && (
            <View style={styles.pendingCard}>
              <View style={styles.pendingHeader}>
                <Text style={styles.pendingTitle}>Chores Awaiting Approval</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendingApprovals.length}</Text>
                </View>
              </View>

              {pendingApprovals.map((item) => (
                <View key={item.id} style={styles.pendingItem}>
                  <View style={styles.pendingTop}>
                    <View
                      style={[
                        styles.pendingAvatar,
                        item.childName === "Emma"
                          ? styles.emmaAvatar
                          : styles.jackAvatar,
                      ]}
                    >
                      <Text style={styles.smallEmoji}>{<Text style={styles.smallEmoji}>👧</Text>}</Text>
                    </View>

                    <View style={styles.pendingInfo}>
                      <Text style={styles.pendingText}>
                        {item.childName} completed{" "}
                        <Text style={styles.bold}>{item.choreName}</Text>
                      </Text>
                      <Text style={styles.moneyText}>
                        +${item.reward.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.pendingActions}>
                    <Pressable
                      style={styles.approveButton}
                      onPress={() =>
                        navigation.navigate("Approval", {
                          child: item.childName,
                          chore: item.choreName,
                          value: item.reward,
                          completionId: item.id,
                        })
                      }
                    >
                      <Text style={styles.approveText}>Approve</Text>
                    </Pressable>

                    <Pressable style={styles.rejectButton}>
                      <Text style={styles.rejectText}>Reject</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === "wallet" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Family Wallet</Text>
<Text style={styles.walletBalance}>${walletBalance.toFixed(2)}</Text>
              <Text style={styles.pageSubtitle}>
                Track allowances and rewards
              </Text>

              <View style={styles.walletRow}>
                <Text style={styles.walletLabel}>Earned this week</Text>
                <Text style={styles.walletValue}>$18</Text>
              </View>

              <View style={styles.walletRow}>
                <Text style={styles.walletLabel}>Next payout</Text>
                <Text style={styles.walletValue}>Friday</Text>
              </View>
            </View>
          )}

          {activeTab === "settings" && (
            <>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Children</Text>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>👧 Emma</Text>
                  <Text style={styles.settingsSubtext}>Age 10</Text>
                </View>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>👦 Jack</Text>
                  <Text style={styles.settingsSubtext}>Age 8</Text>
                </View>

                <Pressable>
                  <Text style={styles.addChildText}>＋ Add Child</Text>
                </Pressable>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Allowance Rules</Text>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>Payout Schedule</Text>
                  <Text style={styles.settingsSubtext}>Weekly</Text>
                </View>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>Approval Required</Text>
                  <Text style={styles.settingsSubtext}>Yes</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Account</Text>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>Email</Text>
                  <Text style={styles.settingsSubtext}>parent@example.com</Text>
                </View>

                <View style={styles.settingsRow}>
                  <Text style={styles.settingsText}>Family Name</Text>
                  <Text style={styles.settingsSubtext}>The Smith Family</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View
          style={[
            styles.bottomNav,
            { paddingBottom: Math.max(insets.bottom, 10) },
          ]}
        >
          <Pressable
            style={styles.navItem}
            onPress={() => setActiveTab("dashboard")}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === "dashboard" && styles.activeNavText,
              ]}
            >
              🏠
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === "dashboard" && styles.activeNavText,
              ]}
            >
              Dashboard
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => setActiveTab("pending")}
          >
            <View>
              <Text
                style={[
                  styles.navIcon,
                  activeTab === "pending" && styles.activeNavText,
                ]}
              >
                ⏱
              </Text>
              {pendingApprovals.length > 0 && (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>
                    {pendingApprovals.length}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.navLabel,
                activeTab === "pending" && styles.activeNavText,
              ]}
            >
              Pending
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => setActiveTab("wallet")}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === "wallet" && styles.activeNavText,
              ]}
            >
              💳
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === "wallet" && styles.activeNavText,
              ]}
            >
              Wallet
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => setActiveTab("settings")}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === "settings" && styles.activeNavText,
              ]}
            >
              ⚙️
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === "settings" && styles.activeNavText,
              ]}
            >
              Settings
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  screen: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  logoutText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 24,
    paddingBottom: 130,
  },
  centerHeader: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  pageSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  addChoreButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
  },
  addChoreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  childCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 12,
  },
  childTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  emmaAvatar: {
    backgroundColor: "#C084FC",
  },
  jackAvatar: {
    backgroundColor: "#38BDF8",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  childMeta: {
    marginTop: 3,
    fontSize: 12,
    color: "#6B7280",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  progressLabel: {
    fontSize: 13,
    color: "#4B5563",
  },
  progressAmount: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#8B5CF6",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
  },
  choreGroup: {
    marginBottom: 18,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  smallAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  smallEmoji: {
    fontSize: 14,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  choreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 34,
    marginBottom: 10,
  },
  choreListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },
  assignedText: {
    color: "#6B7280",
    fontSize: 12,
    maxWidth: 120,
    textAlign: "right",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
  completedDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  emptyDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 12,
  },
  completedChore: {
    color: "#6B7280",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  incompleteChore: {
    color: "#111827",
    fontSize: 14,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activityIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  greenIcon: {
    backgroundColor: "#DCFCE7",
  },
  blueIcon: {
    backgroundColor: "#DBEAFE",
  },
  purpleIcon: {
    backgroundColor: "#F3E8FF",
  },
  activityTitle: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  activityTime: {
    marginTop: 3,
    fontSize: 12,
    color: "#6B7280",
  },
  pendingCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: "#BFDBFE",
    marginBottom: 16,
  },
  pendingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pendingTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    flex: 1,
  },
  badge: {
    backgroundColor: "#2563EB",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  pendingItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  pendingTop: {
    flexDirection: "row",
    marginBottom: 14,
  },
  pendingAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingText: {
    color: "#111827",
    fontSize: 14,
  },
  bold: {
    fontWeight: "800",
  },
  moneyText: {
    marginTop: 4,
    color: "#16A34A",
    fontSize: 14,
    fontWeight: "800",
  },
  pendingActions: {
    flexDirection: "row",
    gap: 10,
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  approveText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  rejectText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  walletBalance: {
    fontSize: 42,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },
  walletRow: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletLabel: {
    color: "#6B7280",
    fontSize: 14,
  },
  walletValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
  },
  settingsRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingsText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  settingsSubtext: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },
  addChildText: {
    marginTop: 14,
    color: "#3B82F6",
    fontSize: 15,
    fontWeight: "800",
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 72,
  },
  navIcon: {
    fontSize: 22,
    color: "#6B7280",
  },
  navLabel: {
    marginTop: 4,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "700",
  },
  activeNavText: {
    color: "#3B82F6",
  },
  navBadge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "#EF4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  navBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
});