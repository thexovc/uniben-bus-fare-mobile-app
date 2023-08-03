import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { UserContext } from "../context/UserContext";

const QrCODE = ({ visible, setQrcodeToggle }) => {
  const [src, setSrc] = useState("");

  const { user } = useContext(UserContext);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <BlurView className="flex-1 " intensity={100} tint="dark">
        <View className="h-2/3 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
          <Pressable
            onPress={() => setQrcodeToggle(false)}
            className="w-full p-3 flex-row justify-end"
          >
            <Ionicons name="close-circle-sharp" size={24} color="black" />
          </Pressable>

          <View className="flex-1 justify-center space-y-8 items-center">
            <Text className="text-center text-lg font-semibold">
              Scan QRCODE to make Payment
            </Text>

            <Image
              source={{
                uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=userID:${user?.email}`,
              }}
              className="w-60 h-60"
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default QrCODE;
