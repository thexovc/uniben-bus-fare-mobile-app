import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Activity from "./screens/Activity";
import { useFonts } from "expo-font";
import SettingScreen from "./screens/SettingScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/CustomToast";

import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import MyStack from "./components/MyStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Main() {
  const { user } = useContext(UserContext);

  console.log({ user });

  const [fontsLoaded] = useFonts({
    "NanumGothicCoding-Regular": require("./fonts/NanumGothicCoding-Regular.ttf"),
  });

  if (!fontsLoaded) {
  } else {
    return (
      <>
        {!user ? (
          <>
            <MyStack />
          </>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name="Dashboard"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Entypo
                    name="home"
                    size={size}
                    color={focused ? "coral" : "black"}
                  />
                ),
                tabBarShowLabel: false,
                headerShown: false,
              }}
              component={Dashboard}
            />

            <Tab.Screen
              name="Activities"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialIcons
                    name="notifications-active"
                    size={size}
                    color={focused ? "coral" : "black"}
                  />
                ),
                tabBarShowLabel: false,
                headerShown: false,
              }}
              component={Activity}
            />
            <Tab.Screen
              name="Settings"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name="settings"
                    size={size}
                    color={focused ? "coral" : "black"}
                  />
                ),
                tabBarShowLabel: false,
                headerShown: false,
              }}
              component={SettingScreen}
            />
          </Tab.Navigator>
        )}
      </>
    );
  }
}
