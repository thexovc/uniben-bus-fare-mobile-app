import { View, Text } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

const PayModal = ({ visible, setPayToggle, setScanToggle }) => {
  const [userID, setUserID] = useState("");

  const handleQRCODE = () => {
    setPayToggle(false);
    setScanToggle(true);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView className="flex-1">
        <BlurView className="flex-1" intensity={100} tint="dark">
          <View className="min-h-3/5 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
            <Pressable
              onPress={() => setPayToggle(false)}
              className="w-full p-3 flex-row justify-end"
            >
              <Ionicons name="close-circle-sharp" size={24} color="black" />
            </Pressable>

            <ScrollView>
              <View className="min-h-3/5 space-y-4 items-center">
                <Text className="mt-4 text-lg">Send Bus Fee By User ID</Text>
                <Text className="mt-4 text-lg text-orange-400">
                  Bus Fee: ₦70
                </Text>
                {/* <TextInput
                  onChangeText={(text) => userID(text)}
                  className="border-[1px] border-gray-400 rounded-md p-4 w-5/6 text-lg"
                  placeholder="User ID"
                />
                <TouchableOpacity className="h-3/12 bg-purple-600 space-x-5 py-4 w-2/3 flex-row items-center justify-center rounded-lg">
                  <Text className="text-white font-bold text-xl">Send</Text>
                  <Ionicons name="ios-exit-sharp" size={24} color="white" />
                </TouchableOpacity> */}
              </View>

              <View className="flex-1 mb-8 mt-8 flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={handleQRCODE}
                  className="items-center"
                >
                  <AntDesign name="scan1" size={24} color="black" />

                  <Text className="text-xl">Scan QR CODE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
};

export default PayModal;
