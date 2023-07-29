import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import { DB_URL } from "../config";
import { UserContext } from "../context/UserContext";

const Activity = () => {
  const [ride, setRide] = useState(true);
  const [trx, setTrx] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getTrx = async () => {
      axios
        .post(`${DB_URL}/api/userTrx`, {
          email: user?.email,
        })
        .then((res) => {
          console.log(res.data);

          setTrx(res.data);
        });
    };

    getTrx();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 w-[100%] bg-white">
      <View className="flex-1">
        <View className="h-1/12 p-4 flex-row space-x-5 w-full">
          <Pressable onPress={() => setRide(true)}>
            <Text
              className={`text-lg font-semibold ${
                ride
                  ? "bg-orange-400 text-white"
                  : "border-[1px] border-gray-500 text-black"
              } p-2 rounded-md`}
            >
              Bus Ride
            </Text>
          </Pressable>
          <Pressable onPress={() => setRide(false)}>
            <Text
              className={`text-lg font-semibold ${
                !ride
                  ? "bg-orange-400 text-white"
                  : "border-[1px] border-gray-500 text-black"
              } p-2 rounded-md`}
            >
              Deposits
            </Text>
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* bus trx */}
          {ride && (
            <>
              {trx &&
                trx.map((item, index) => (
                  <>
                    {item.status == "pay" ? (
                      <View
                        key={index}
                        className="w-full flex-row items-start justify-between p-6 border-b-[0.5px] border-gray-400"
                      >
                        <View className="flex-row items-center h-full">
                          {item.status == "pay" ? (
                            <FontAwesome5
                              name="bus-alt"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <FontAwesome
                              name="credit-card"
                              size={24}
                              color="black"
                            />
                          )}
                        </View>
                        <View className="space-y-1">
                          <Text className="font-semibold text-base">
                            {item.status == "pay" &&
                              user?.userType == "driver" &&
                              "Payment for ride"}
                            {item.status == "pay" &&
                              user?.userType != "driver" &&
                              "Paid for Bus Fee In Uniben"}
                          </Text>
                          <Text>12:44 PM 4TH 2023</Text>
                        </View>

                        {user?.userType == "student" ? (
                          <Text
                            className={`font-bold ${
                              item.status == "pay"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            ₦{item.amount}
                          </Text>
                        ) : (
                          <Text className={`font-bold text-green-500`}>
                            ₦{item.amount}
                          </Text>
                        )}
                      </View>
                    ) : (
                      ""
                    )}
                  </>
                ))}
            </>
          )}
          {/* bus trx */}

          {/* deposits */}
          {!ride && (
            <>
              {trx &&
                trx.map((item, index) => (
                  <>
                    {item.status != "pay" ? (
                      <View
                        key={index}
                        className="w-full flex-row items-start justify-between p-6 border-b-[0.5px] border-gray-400"
                      >
                        <View className="flex-row items-center h-full">
                          {item.status == "pay" ? (
                            <FontAwesome5
                              name="bus-alt"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <FontAwesome
                              name="credit-card"
                              size={24}
                              color="black"
                            />
                          )}
                        </View>
                        <View className="space-y-1">
                          <Text className="font-semibold text-base">
                            {item.status == "pay"
                              ? "Paid for Bus Fee In Uniben"
                              : "Deposited Into Bus Fare"}
                          </Text>
                          <Text>12:44 PM 4TH 2023</Text>
                        </View>

                        <Text
                          className={`font-bold ${
                            item.status === "pay"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          ₦{item.amount}
                        </Text>
                      </View>
                    ) : (
                      ""
                    )}
                  </>
                ))}
            </>
          )}
          {/* deposits */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Activity;
