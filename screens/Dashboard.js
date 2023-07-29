import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
  RefreshControl,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import PayModal from "../components/PayModal";
import { useCallback, useContext, useEffect, useState } from "react";
import DepositModal from "../components/DepositModal";
import BarcodeScannerScreen from "../components/Scanner";
import QrCODE from "../components/QrCODE";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { DB_URL } from "../config";
import Help from "../components/Help";

const ios = Platform.OS == "ios";

const Dashboard = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [trx, setTrx] = useState(null);
  const [trxCount, setTrxCount] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getTrx = async () => {
      await axios
        .post(`${DB_URL}/api/userTrx`, {
          email: user?.email,
        })
        .then((res) => {
          // console.log(res.data);

          setTrx(res.data);
        });
      await axios
        .post(`${DB_URL}/api/trxCount`, {
          email: user?.email,
        })
        .then((res) => {
          // console.log(res.data);

          setTrxCount(res.data);
        });
    };

    getTrx();
  }, [refreshing]);

  const getUser = async () => {
    if (user?.email) {
      console.log(user?.email);
      await axios
        .post(`${DB_URL}/api/getUser`, {
          email: user?.email,
        })
        .then((res) => {
          console.log("USERS Data", res.data);

          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [payToggle, setPayToggle] = useState(false);
  const [depositToggle, setDepositToggle] = useState(false);
  const [scanToggle, setScanToggle] = useState(false);
  const [qrcodeToggle, setQrcodeToggle] = useState(false);
  const [helpToggle, setHelpToggle] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 w-[100%] bg-white">
      <View
        className={`h-2/5 rounded-lg w-full space-y-3 ${
          ios ? "-mb-2 mt-0" : "mb-3 mt-12"
        }  p-4`}
      >
        {/* profile */}
        <View className="flex-row items-center space-x-2">
          <FontAwesome name="user-circle-o" size={24} color="brown" />
          <Text className="font-semibold text-base">{user?.username}</Text>
          <Text
            className={`${
              user?.userType == "student" ? "bg-orange-800" : "bg-purple-800"
            } text-white py-1 px-2 font-semibold rounded `}
          >
            {user?.userType}
          </Text>
          <TouchableOpacity onPress={getUser} className="px-4">
            <FontAwesome name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* profile */}
        <View className="flex-1  space-y-3">
          <View className="h-1/5">
            <TouchableOpacity className="h-full flex-1 flex-row rounded-lg items-center justify-center space-x-3 bg-blue-400">
              <FontAwesome name="money" size={24} color="black" />
              <Text className="text-xl font-semibold">₦{user?.wallet}</Text>
            </TouchableOpacity>
          </View>
          <View className="h-2/5 w-full space-x-3 flex-row">
            <Pressable className="h-full flex-1 rounded-lg  items-center py-2 justify-between bg-green-400">
              <FontAwesome5 name="bus-alt" size={24} color="black" />
              <Text className="text-xl font-bold">{trxCount?.count || 0}</Text>
              <Text className="text-md">Rides</Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => setDepositToggle(true)}
              className="h-full rounded-lg flex-1 items-center py-2 justify-center space-y-5 bg-purple-400"
            >
              <Text className="text-xl font-bold">Deposit</Text>
              <FontAwesome name="credit-card" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="h-2/5 w-full space-x-3 flex-row">
            {user?.userType != "student" && (
              <TouchableOpacity
                onPress={() => setQrcodeToggle(true)}
                className="h-full rounded-lg flex-1 items-center py-2 justify-center space-y-5 bg-orange-400"
              >
                <Text className="text-xl font-bold">Recieve</Text>
                <FontAwesome name="send" size={24} color="black" />
              </TouchableOpacity>
            )}

            {user?.userType == "student" && (
              <TouchableOpacity
                onPress={() => setPayToggle(true)}
                className="h-full rounded-lg flex-1 items-center py-2 justify-center space-y-5 bg-orange-400"
              >
                <Text className="text-xl font-bold">Send</Text>
                <FontAwesome name="send" size={24} color="black" />
              </TouchableOpacity>
            )}

            <TouchableOpacity className="h-full flex-1 rounded-lg items-center py-4 justify-between bg-red-400">
              <FontAwesome name="bank" size={24} color="black" />
              <Text className="text-xl font-bold ">Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {payToggle && (
        <PayModal
          setPayToggle={setPayToggle}
          setScanToggle={setScanToggle}
          visible={payToggle}
        />
      )}
      {depositToggle && (
        <DepositModal
          setDepositToggle={setDepositToggle}
          visible={depositToggle}
        />
      )}
      {scanToggle && (
        <BarcodeScannerScreen
          visible={scanToggle}
          setScanToggle={setScanToggle}
        />
      )}
      {qrcodeToggle && (
        <QrCODE visible={qrcodeToggle} setQrcodeToggle={setQrcodeToggle} />
      )}
      {helpToggle && (
        <Help visible={helpToggle} setHelpToggle={setHelpToggle} />
      )}

      <TouchableOpacity
        onPress={() => setHelpToggle(true)}
        className="absolute z-20 bottom-0 right-0 p-4"
      >
        <Entypo name="help-with-circle" size={45} color="black" />
      </TouchableOpacity>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="pt-2"></View>

        {trx &&
          trx.map((item, index) => (
            <View
              key={index}
              className="w-full flex-row items-start justify-between p-6 border-b-[0.5px] border-gray-400"
            >
              <View className="flex-row items-center h-full">
                {item.status == "pay" ? (
                  <FontAwesome5 name="bus-alt" size={24} color="black" />
                ) : (
                  <FontAwesome name="credit-card" size={24} color="black" />
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
                  {item.status != "pay" && "Deposited Into Bus Fare"}
                </Text>
                <Text>12:44 PM 4TH 2023</Text>
              </View>

              {user?.userType == "student" ? (
                <Text
                  className={`font-bold ${
                    item.status == "pay" ? "text-red-500" : "text-green-500"
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
          ))}

        {/* Help */}

        {/* Help */}

        {/* view more */}
        <View className="w-full flex-row  justify-center p-6 mb-4">
          <TouchableOpacity className="w-1/3  flex-row items-center space-x-2 border-[1px] justify-center p-2 rounded-lg border-gray-300">
            <Text className="text-md font-semibold text-purple-800">
              View More
            </Text>
            <AntDesign name="search1" size={16} color="purple" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
