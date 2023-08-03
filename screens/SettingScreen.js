import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";

const SettingScreen = () => {
  const { setUser } = useContext(UserContext);

  return (
    <SafeAreaView className="flex-1 w-[100%] bg-white">
      <View className="flex-1 mt-10">
        <View className="h-2/5 p-4 justify-center space-y-5">
          <Text className="text-2xl font-bold text-center">About</Text>
          <Text className="text-base text-center">
            Uniben Shuttle Pay Mobile Platform
          </Text>
          <Text className="text-base text-center text-orange-700">
            Transport with ease
          </Text>
        </View>
        <View className="flex-1 px-4 space-x-5 w-full flex-row items-end">
          <Pressable
            onPress={() => setUser(null)}
            className="h-3/12 bg-purple-600 space-x-5 py-4 w-full flex-row items-center justify-center rounded-lg"
          >
            <Text className="text-white font-bold text-xl">Logout</Text>
            <Ionicons name="ios-exit-sharp" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
