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
type Props = NativeStackScreenProps<RootStackParamList, "CreateChore">;


export default function CreateChoreScreen({ navigation }: Props): JSX.Element {  const [choreName, setChoreName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("Daily");
  const [selectedChildren, setSelectedChildren] = useState<string[]>(["Emma"]);

  const children = ["Emma", "Jack"];
  const frequencies = ["Daily", "Weekly", "One-time"];

  const toggleChild = (child: string): void => {
    setSelectedChildren((current) =>
      current.includes(child)
        ? current.filter((name) => name !== child)
        : [...current, child]
    );
  };

const handleSave = (): void => {
  console.log({
    choreName,
    value,
    frequency,
    selectedChildren,
  });

  navigation.goBack();
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
       <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.back}>‹ Back</Text>
       </Pressable>

        <Text style={styles.title}>Create Chore</Text>
        <Text style={styles.subtitle}>Assign a chore and set its reward.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Chore Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Make Bed"
            value={choreName}
            onChangeText={setChoreName}
          />

          <Text style={styles.label}>Value</Text>
          <TextInput
            style={styles.input}
            placeholder="$2"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Frequency</Text>
          <View style={styles.segmented}>
            {frequencies.map((item) => {
              const active = frequency === item;

              return (
                <Pressable
                  key={item}
                  style={[styles.segment, active && styles.segmentActive]}
                  onPress={() => setFrequency(item)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      active && styles.segmentTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Assign To</Text>
          <View style={styles.childList}>
            {children.map((child) => {
              const selected = selectedChildren.includes(child);

              return (
                <Pressable
                  key={child}
                  style={[styles.childItem, selected && styles.childSelected]}
                  onPress={() => toggleChild(child)}
                >
                  <Text style={styles.checkbox}>{selected ? "✓" : "○"}</Text>
                  <Text style={styles.childName}>{child}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.approvalBox}>
            <Text style={styles.approvalTitle}>Requires approval</Text>
            <Text style={styles.approvalText}>
              Parents approve completed chores before allowance is earned.
            </Text>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Chore</Text>
          </Pressable>
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
  back: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
  },
  form: {
    marginTop: 28,
  },
  label: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "800",
    color: "#334155",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    fontSize: 16,
  },
  segmented: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 18,
    padding: 4,
  },
  segment: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#FFFFFF",
  },
  segmentText: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 13,
  },
  segmentTextActive: {
    color: "#0F172A",
  },
  childList: {
    gap: 10,
  },
  childItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },
  childSelected: {
    borderColor: "#7C3AED",
    backgroundColor: "#F3E8FF",
  },
  checkbox: {
    fontSize: 20,
    color: "#7C3AED",
    fontWeight: "800",
  },
  childName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  approvalBox: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  approvalTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  approvalText: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
  },
  saveButton: {
    marginTop: 28,
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});