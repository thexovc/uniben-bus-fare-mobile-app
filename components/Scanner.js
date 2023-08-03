import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DB_URL } from "../config";

export default function BarcodeScannerScreen({
  setScanToggle,
  visible,
  amountToPay,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);

    console.log(`Scanned data: ${data}`);
    const extractedData = data.split("userID:")[1];
    if (extractedData) {
      console.log(`Extracted data: ${extractedData}`);

      await axios
        .post(`${DB_URL}/api/payBusFee`, {
          receiverEmail: extractedData,
          senderEmail: user?.email,
          userEmail: user?.email,
          amount: Number(amountToPay),
        })
        .then((res) => {
          console.log(res.data);

          Toast.show({
            type: "success",
            text1: "Payment Successful",
            position: "bottom",
            bottomOffset: 70,
            visibilityTime: 5000,
          });
          setUser(res.data.user);
          // navigation.navigate("Dashboard");
        })
        .catch((err) => {
          console.log(err);

          Toast.show({
            type: "error",
            text1: "Insufficient funds",
            position: "bottom",
            bottomOffset: 70,
            visibilityTime: 5000,
          });
        });

      setScanToggle(false);
    } else {
      Toast.show({
        type: "error",
        text1: "Not a valid user ID",
        position: "bottom",
        bottomOffset: 70,
        visibilityTime: 5000,
      });
      setScanToggle(false);
    }
  };

  if (hasPermission === null) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1">
          <BlurView className="flex-1 " intensity={100} tint="dark">
            <View className="h-2/3 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
              <Pressable
                onPress={() => setScanToggle(false)}
                className="w-full p-3 flex-row justify-end"
              >
                <Ionicons name="close-circle-sharp" size={24} color="black" />
              </Pressable>
              <View className="flex-1 justify-center">
                <Text className="text-lg text-center font-semibold">
                  Requesting camera permission...
                </Text>
              </View>
            </View>
          </BlurView>
        </SafeAreaView>
      </Modal>
    );
  }
  if (hasPermission === false) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <SafeAreaView className="flex-1">
          <BlurView className="flex-1 " intensity={100} tint="dark">
            <View className="h-2/3 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
              <Pressable
                onPress={() => setScanToggle(false)}
                className="w-full p-3 flex-row justify-end"
              >
                <Ionicons name="close-circle-sharp" size={24} color="black" />
              </Pressable>
              <View className="flex-1 justify-center">
                <Text className="text-lg text-center text-red-600 font-semibold">
                  No access to camera !!!
                </Text>
              </View>
            </View>
          </BlurView>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView className="flex-1">
        <BlurView className="flex-1 " intensity={100} tint="dark">
          <View className="h-2/3 mt-10 border-[1px] border-gray-600 rounded-xl m-auto w-[90%]  bg-white">
            <Pressable
              onPress={() => setScanToggle(false)}
              className="w-full p-3 flex-row justify-end items-center space-x-20"
            >
              <Text className="text-base font-semibold">Scan QRCODE</Text>
              <Ionicons name="close-circle-sharp" size={30} color="red" />
            </Pressable>
            <View className="flex-1 bg-black p-2 rounded-b-xl">
              <BarCodeScanner
                onBarCodeScanned={scanned ? () => {} : handleBarCodeScanned}
                className="w-[100%] h-full"
              />
            </View>
            {scanned && (
              <View style={styles.scanDataContainer}>
                <Text
                  style={styles.scanDataText}
                >{`Scanned Data: ${scannedData}`}</Text>
                <Button title="Scan Again" onPress={() => setScanned(false)} />
              </View>
            )}
          </View>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanDataContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
  },
  scanDataText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
