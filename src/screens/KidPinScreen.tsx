import React, { JSX, useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "KidPin">;

export default function KidPinScreen({ navigation }: Props): JSX.Element {  const [selectedChild, setSelectedChild] = useState<string>("Emma");
  const [pin, setPin] = useState<string>("");

  const children = ["Emma", "Jack"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handleNumberPress = (num: string): void => {
    if (pin.length < 4) {
      setPin((current) => current + num);
    }
  };

  const handleDelete = (): void => {
    setPin((current) => current.slice(0, -1));
  };

const handleEnter = (): void => {
  navigation.navigate("ChildDashboard");
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.back}>‹ Back</Text>

        <Text style={styles.title}>Who’s checking chores?</Text>
        <Text style={styles.subtitle}>Choose your name and enter your PIN.</Text>

        <View style={styles.childRow}>
          {children.map((child) => {
            const isSelected = selectedChild === child;

            return (
              <Pressable
                key={child}
                style={[
                  styles.childCard,
                  isSelected && styles.childCardSelected,
                ]}
                onPress={() => setSelectedChild(child)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{child[0]}</Text>
                </View>
                <Text style={styles.childName}>{child}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.pinDots}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[styles.dot, pin.length > index && styles.dotFilled]}
            />
          ))}
        </View>

        <View style={styles.keypad}>
          {numbers.map((num) => (
            <Pressable
              key={num}
              style={styles.key}
              onPress={() => handleNumberPress(num)}
            >
              <Text style={styles.keyText}>{num}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.key} onPress={handleDelete}>
            <Text style={styles.keyText}>⌫</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.enterButton, pin.length < 4 && styles.enterDisabled]}
          onPress={handleEnter}
          disabled={pin.length < 4}
        >
          <Text style={styles.enterText}>Enter Chore Dashboard</Text>
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
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
  },
  childRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  childCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  childCardSelected: {
    borderColor: "#7C3AED",
    backgroundColor: "#F3E8FF",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  childName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  pinDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginTop: 38,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#CBD5E1",
  },
  dotFilled: {
    backgroundColor: "#7C3AED",
  },
  keypad: {
    marginTop: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  key: {
    width: 78,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  enterButton: {
    marginTop: 28,
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 18,
    alignItems: "center",
  },
  enterDisabled: {
    backgroundColor: "#CBD5E1",
  },
  enterText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});