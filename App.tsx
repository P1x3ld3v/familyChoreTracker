import React, { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ParentLoginScreen from "./src/screens/ParentLoginScreen";
import KidPinScreen from "./src/screens/KidPinScreen";
import ChildDashboardScreen from "./src/screens/ChildDashboardScreen";
import ParentDashboardScreen from "./src/screens/ParentDashboardScreen";
import CreateChoreScreen from "./src/screens/CreateChoreScreen";
import ApprovalScreen from "./src/screens/ApprovalScreen";
import ParentSignupScreen from "./src/screens/ParentSignupScreen";
import ParentSetupScreen from "./src/screens/ParentSetupScreen";

export type RootStackParamList = {
  Welcome: undefined;
  ParentLogin: undefined;
  KidPin: undefined;
  ChildDashboard: undefined;
  ParentDashboard: undefined;
  CreateChore: undefined;
  ParentSignup: undefined;
  ParentSetup: undefined;
  Approval: {
  child: string;
  chore: string;
  value: number;
};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ParentLogin" component={ParentLoginScreen} />
        <Stack.Screen name="KidPin" component={KidPinScreen} />
        <Stack.Screen name="ChildDashboard" component={ChildDashboardScreen} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
        <Stack.Screen name="CreateChore" component={CreateChoreScreen} />
        <Stack.Screen name="Approval" component={ApprovalScreen} />
        <Stack.Screen name="ParentSignup" component={ParentSignupScreen} />
        <Stack.Screen name="ParentSetup" component={ParentSetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}