import React, { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import ParentLoginScreen from "./src/screens/ParentLoginScreen";
import KidPinScreen from "./src/screens/KidPinScreen";

export type RootStackParamList = {
  Welcome: undefined;
  ParentLogin: undefined;
  KidPin: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}