import React, { JSX, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "ParentSetup">;

type Kid = {
  id: string;
  name: string;
  avatar: string;
  pin: string;
};

type Chore = {
  id: string;
  name: string;
  reward: number;
};

const AVATAR_OPTIONS = ["👦", "👧", "🧒", "👶", "🧑", "👨", "👩", "🧑‍🦱"];

export default function ParentSetupScreen({ navigation }: Props): JSX.Element {
  const [step, setStep] = useState<number>(1);

  const [familyName, setFamilyName] = useState<string>("");
  const [numberOfKids, setNumberOfKids] = useState<string>("");

  const [kids, setKids] = useState<Kid[]>([]);
  const [currentKidName, setCurrentKidName] = useState<string>("");
  const [currentKidAvatar, setCurrentKidAvatar] = useState<string>("👦");
  const [currentKidPin, setCurrentKidPin] = useState<string>("");

  const [chores, setChores] = useState<Chore[]>([]);
  const [choreName, setChoreName] = useState<string>("");
  const [choreReward, setChoreReward] = useState<string>("");

  const [allowanceAmount, setAllowanceAmount] = useState<string>("");
  const [allowanceFrequency, setAllowanceFrequency] = useState<
    "daily" | "weekly" | "biweekly" | "monthly"
  >("weekly");

  const progressPercentage = (step / 4) * 100;

  const handleStep1Continue = (): void => {
    if (!familyName || !numberOfKids) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    setStep(2);
  };

  const handleAddKid = (): void => {
    if (!currentKidName) {
      Alert.alert("Missing name", "Please enter your child’s name.");
      return;
    }

    if (currentKidPin.length !== 4) {
      Alert.alert("Invalid PIN", "PIN must be 4 digits.");
      return;
    }

    const newKid: Kid = {
      id: Date.now().toString(),
      name: currentKidName,
      avatar: currentKidAvatar,
      pin: currentKidPin,
    };

    const updatedKids = [...kids, newKid];

    setKids(updatedKids);
    setCurrentKidName("");
    setCurrentKidAvatar("👦");
    setCurrentKidPin("");

    if (updatedKids.length >= Number(numberOfKids)) {
      setStep(3);
    }
  };

  const handleAddChore = (): void => {
    if (!choreName || !choreReward) {
      Alert.alert("Missing fields", "Please add a chore name and reward.");
      return;
    }

    const newChore: Chore = {
      id: Date.now().toString(),
      name: choreName,
      reward: Number(choreReward),
    };

    setChores([...chores, newChore]);
    setChoreName("");
    setChoreReward("");
  };

  const handleRemoveChore = (id: string): void => {
    setChores(chores.filter((chore) => chore.id !== id));
  };

  const handleFinish = (): void => {
    console.log("Setup complete:", {
      familyName,
      numberOfKids,
      kids,
      chores,
      allowance: {
        amount: allowanceAmount,
        frequency: allowanceFrequency,
      },
    });

    navigation.navigate("ParentDashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Step {step} of 4</Text>
            <Text style={styles.progressText}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
        </View>

        {step === 1 && (
          <>
            <StepHeader
              emoji="🏠"
              title="Family Setup"
              subtitle="Let's get started with your family"
            />

            <View style={styles.card}>
              <Text style={styles.label}>Family Name</Text>
              <TextInput
                style={styles.input}
                placeholder="The Smith Family"
                value={familyName}
                onChangeText={setFamilyName}
              />

              <Text style={styles.label}>Number of Kids</Text>
              <TextInput
                style={styles.input}
                placeholder="How many kids?"
                value={numberOfKids}
                onChangeText={setNumberOfKids}
                keyboardType="number-pad"
              />

              <Pressable style={styles.primaryButton} onPress={handleStep1Continue}>
                <Text style={styles.primaryText}>Continue</Text>
              </Pressable>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <StepHeader
              emoji="👨‍👩‍👧‍👦"
              title="Add Your Kids"
              subtitle={`${kids.length} of ${numberOfKids} added`}
            />

            <View style={styles.card}>
              <Text style={styles.label}>Child's Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                value={currentKidName}
                onChangeText={setCurrentKidName}
              />

              <Text style={styles.label}>Pick an Avatar</Text>
              <View style={styles.avatarGrid}>
                {AVATAR_OPTIONS.map((avatar) => {
                  const active = currentKidAvatar === avatar;

                  return (
                    <Pressable
                      key={avatar}
                      style={[
                        styles.avatarOption,
                        active && styles.avatarOptionActive,
                      ]}
                      onPress={() => setCurrentKidAvatar(avatar)}
                    >
                      <Text style={styles.avatarText}>{avatar}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.label}>Create PIN (4 digits)</Text>
              <TextInput
                style={[styles.input, styles.pinInput]}
                placeholder="••••"
                value={currentKidPin}
                onChangeText={(text) =>
                  setCurrentKidPin(text.replace(/\D/g, "").slice(0, 4))
                }
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />

              <Pressable style={styles.successButton} onPress={handleAddKid}>
                <Text style={styles.primaryText}>Add Child</Text>
              </Pressable>
            </View>

            {kids.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Added Kids</Text>

                {kids.map((kid) => (
                  <View key={kid.id} style={styles.listRow}>
                    <Text style={styles.listEmoji}>{kid.avatar}</Text>
                    <Text style={styles.listTitle}>{kid.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {kids.length > 0 && kids.length < Number(numberOfKids) && (
              <Pressable style={styles.secondaryButton} onPress={() => setStep(3)}>
                <Text style={styles.secondaryText}>Skip Remaining Kids</Text>
              </Pressable>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <StepHeader
              emoji="✅"
              title="Add First Chores"
              subtitle="Set up tasks your kids can complete"
            />

            <View style={styles.card}>
              <Text style={styles.label}>Chore Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Make bed, Do dishes"
                value={choreName}
                onChangeText={setChoreName}
              />

              <Text style={styles.label}>Reward Amount ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={choreReward}
                onChangeText={setChoreReward}
                keyboardType="decimal-pad"
              />

              <Pressable style={styles.successButton} onPress={handleAddChore}>
                <Text style={styles.primaryText}>Add Chore</Text>
              </Pressable>
            </View>

            {chores.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Chores ({chores.length})</Text>

                {chores.map((chore) => (
                  <View key={chore.id} style={styles.choreRow}>
                    <View>
                      <Text style={styles.listTitle}>{chore.name}</Text>
                      <Text style={styles.moneyText}>
                        ${chore.reward.toFixed(2)}
                      </Text>
                    </View>

                    <Pressable onPress={() => handleRemoveChore(chore.id)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            <Pressable style={styles.primaryButton} onPress={() => setStep(4)}>
              <Text style={styles.primaryText}>
                {chores.length > 0 ? "Continue" : "Skip for Now"}
              </Text>
            </Pressable>
          </>
        )}

        {step === 4 && (
          <>
            <StepHeader
              emoji="💰"
              title="Set Allowance Rules"
              subtitle="Configure automatic allowance"
            />

            <View style={styles.card}>
              <Text style={styles.label}>Allowance Amount ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={allowanceAmount}
                onChangeText={setAllowanceAmount}
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Frequency</Text>

              <View style={styles.frequencyGrid}>
                {(["daily", "weekly", "biweekly", "monthly"] as const).map(
                  (frequency) => {
                    const active = allowanceFrequency === frequency;

                    return (
                      <Pressable
                        key={frequency}
                        style={[
                          styles.frequencyButton,
                          active && styles.frequencyActive,
                        ]}
                        onPress={() => setAllowanceFrequency(frequency)}
                      >
                        <Text
                          style={[
                            styles.frequencyText,
                            active && styles.frequencyTextActive,
                          ]}
                        >
                          {frequency}
                        </Text>
                      </Pressable>
                    );
                  }
                )}
              </View>

              <View style={styles.tipBox}>
                <Text style={styles.tipText}>
                  💡 Tip: You can adjust these settings anytime from your dashboard.
                </Text>
              </View>

              <Pressable style={styles.primaryButton} onPress={handleFinish}>
                <Text style={styles.primaryText}>Complete Setup</Text>
              </Pressable>

              <Pressable style={styles.outlineButton} onPress={handleFinish}>
                <Text style={styles.outlineText}>Skip Allowance Setup</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StepHeader({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}): JSX.Element {
  return (
    <View style={styles.stepHeader}>
      <Text style={styles.stepEmoji}>{emoji}</Text>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  container: {
    padding: 24,
    paddingBottom: 48,
  },
  progressBlock: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "600",
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
    backgroundColor: "#3B82F6",
  },
  stepHeader: {
    alignItems: "center",
    marginBottom: 28,
  },
  stepEmoji: {
    fontSize: 52,
    marginBottom: 14,
  },
  stepTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },
  stepSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
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
  pinInput: {
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 10,
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  successButton: {
    marginTop: 24,
    backgroundColor: "#22C55E",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#6B7280",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  secondaryText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  outlineButton: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  outlineText: {
    color: "#4B5563",
    fontWeight: "800",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  avatarOption: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarOptionActive: {
    backgroundColor: "#DBEAFE",
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
  avatarText: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  listEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  choreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  moneyText: {
    marginTop: 4,
    color: "#16A34A",
    fontWeight: "800",
  },
  removeText: {
    color: "#EF4444",
    fontWeight: "800",
  },
  frequencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  frequencyButton: {
    flexBasis: "47%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  frequencyActive: {
    backgroundColor: "#DBEAFE",
    borderColor: "#3B82F6",
  },
  frequencyText: {
    color: "#4B5563",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  frequencyTextActive: {
    color: "#1D4ED8",
  },
  tipBox: {
    marginTop: 20,
    backgroundColor: "#DBEAFE",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  tipText: {
    color: "#374151",
    fontSize: 13,
    lineHeight: 20,
  },
});