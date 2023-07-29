import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
