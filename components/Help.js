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

const Help = ({ visible, setHelpToggle }) => {
  const [userID, setUserID] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView className="flex-1">
        <BlurView className="flex-1" intensity={100} tint="dark">
          <View className="h-4/5 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
            <Pressable
              onPress={() => setHelpToggle(false)}
              className="w-full p-3 flex-row justify-end"
            >
              <Ionicons name="close-circle-sharp" size={24} color="black" />
            </Pressable>

            <View className="min-h-4/5 space-y-4 items-center">
              <Text className="mt-4 text-lg font-semibold">Bus Fare Help</Text>
            </View>

            <ScrollView className="flex-1">
              <View className="flex-1 mb-8 mt-4 space-y-5 justify-start p-4">
                <TouchableOpacity className=" w-full space-x-2">
                  <Text className="text-md font-semibold">
                    How does the payment process work?
                  </Text>
                  <Text className="text-sm font-light">
                    When you make a payment, we securely process the transaction
                    using your chosen payment method. The funds are transferred
                    to the recipient's account, and you will receive a
                    confirmation notification once the payment is completed.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className=" w-full space-x-2">
                  <Text className="text-md font-semibold">
                    Are there any deposit limits?
                  </Text>
                  <Text className="text-sm font-light">
                    Yes, there are deposit limits in place. The specific limits
                    depend on your account type and any restrictions set by the
                    payment provider. You can find detailed information about
                    deposit limits in the app's settings or contact our customer
                    support for assistance.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className=" w-full space-x-2">
                  <Text className="text-md font-semibold">
                    What should I do if my payment fails?
                  </Text>
                  <Text className="text-sm font-light">
                    If your payment fails, please ensure that you have
                    sufficient funds in your account and that your payment
                    details are entered correctly. If the issue persists,
                    contact our customer support team, and they will assist you
                    in resolving the problem.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className=" w-full space-x-2">
                  <Text className="text-md font-semibold">
                    Where can I view my transaction history?
                  </Text>
                  <Text className="text-sm font-light">
                    You can access your transaction history within the app. Go
                    to the "Transactions" or "History" section, and you will
                    find a detailed list of your past payments and deposits,
                    including dates, amounts, and recipient information.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className=" w-full space-x-2">
                  <Text className="text-md font-semibold">
                    How secure is my payment and personal information?
                  </Text>
                  <Text className="text-sm font-light">
                    We prioritize the security and privacy of your information.
                    Our app utilizes encryption and industry-standard security
                    measures to safeguard your payment details. Rest assured
                    that your data is protected, and we do not share it with
                    third parties without your consent.
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
};

export default Help;
