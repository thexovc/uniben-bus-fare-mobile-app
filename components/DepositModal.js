import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";

import { BlurView } from "expo-blur";
import { Paystack } from "react-native-paystack-webview";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import { DB_URL } from "../config";
import { UserContext } from "../context/UserContext";

const DepositModal = ({ visible, setDepositToggle }) => {
  const closeModal = () => {
    setDepositToggle(false);
  };

  const [amount, setAmount] = useState(100);
  const [pskToggle, setPskToggle] = useState(false);

  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {pskToggle && (
        <Paystack
          paystackKey="pk_test_09fb04f2fd1bf6f74fec541c28905308fa9a6d37"
          amount={`${amount}.00`}
          billingEmail="paystackwebview@something.com"
          activityIndicatorColor="green"
          onCancel={(e) => {
            setPskToggle(false);
            setDepositToggle(false);
          }}
          onSuccess={async (res) => {
            await axios
              .post(`${DB_URL}/api/deposit`, {
                email: user?.email,
                amount: amount,
              })
              .then(async (res) => {
                // console.log("DEPOSIT", res.data);
                await axios
                  .post(`${DB_URL}/api/getUser`, {
                    email: user?.email,
                  })
                  .then((res1) => {
                    // console.log(res1.data);
                    setUser(res1.data.user);
                    setPskToggle(false);
                    setDepositToggle(false);
                  });
              });
          }}
          autoStart={true}
        />
      )}
      <Modal visible={visible} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1">
          <BlurView className="flex-1" intensity={100} tint="dark">
            <View className="min-h-4/5 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
              <Pressable
                onPress={() => setDepositToggle(false)}
                className="w-full p-3 flex-row justify-end"
              >
                <Ionicons name="close-circle-sharp" size={24} color="black" />
              </Pressable>

              <ScrollView className="bg-white">
                <View className="flex-1 space-y-4 items-center pb-14">
                  <Text className="mt-4 text-lg">Amount to Deposit</Text>

                  <TextInput
                    value={amount.toString()}
                    onChangeText={(text) => setAmount(Number(text))}
                    className="border-[1px] border-gray-400 rounded-md p-4 w-5/6 text-lg"
                    placeholder="Amount"
                    keyboardType="numeric"
                    min="100"
                  />

                  <TouchableOpacity
                    onPress={() => setPskToggle(true)}
                    className="h-3/12 bg-purple-600 space-x-5 py-4 w-2/3 flex-row items-center justify-center rounded-lg"
                  >
                    <Text className="text-white font-bold text-xl">
                      Deposit
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </BlurView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },
  modalContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 12,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default DepositModal;
