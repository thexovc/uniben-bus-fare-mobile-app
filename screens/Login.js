import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Pressable,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import logo from "../assets/login/unibenLogo.png";
import axios from "axios";
import { DB_URL } from "../config";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { isEmail } from "../utils/Helper";
import { UserContext } from "../context/UserContext";

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    if (!isEmail(email)) {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      Toast.show({
        type: "error",
        text1: "Enter a valid email",
        position: "bottom",
        bottomOffset: 70,
        visibilityTime: 5000,
      });
      setLoading(false);

      return;
    }

    await axios
      .post(`${DB_URL}/api/login`, {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);

        console.log(res.data);
        setEmail("");
        setPassword("");
        Toast.show({
          type: "success",
          text1: "Login Success",
          position: "bottom",
          bottomOffset: 70,
          visibilityTime: 5000,
        });
        setUser(res.data.user);
        // navigation.navigate("Dashboard");
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        setEmail("");
        setPassword("");
        Toast.show({
          type: "error",
          text1: "login error try again",
          position: "bottom",
          bottomOffset: 70,
          visibilityTime: 5000,
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 w-[100%]">
      <KeyboardAvoidingView className="flex-1">
        <View className="h-1/3 w-full flex items-center justify-center">
          <Image source={logo} className="w-20 h-20" />
          <Text className="text-lg text-purple-800">Login</Text>
        </View>
        <View className="h-2/3 space-y-5 flex flex-col items-center w-5/6 mx-auto">
          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg ">Email</Text>
            <TextInput
              value={email}
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
              className="border-[1px] border-gray-300 rounded-md p-4 w-full text-lg"
              placeholder="Email"
            />
          </View>

          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg ">Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="border-[1px] border-gray-300 rounded-md p-4 w-full text-lg"
              placeholder="Password"
              secureTextEntry
            />
          </View>

          <Pressable
            className="w-full flex justify-center"
            onPress={handleLogin}
          >
            {loading ? (
              <View className="w-full p-4 mt-4 bg-blue-400 text-center rounded">
                <ActivityIndicator />
              </View>
            ) : (
              <Text className="w-full p-4 mt-4 bg-blue-400 text-center rounded text-neutral-200 font-medium block text-xl focus:bg-red-500">
                Sign In
              </Text>
            )}
          </Pressable>

          <View className="w-full mt-4 flex-row justify-center items-center space-x-2">
            <Text className="text-base">don't have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate("Register")}
              className="justify-center"
            >
              <Text className="text-base text-orange-600">Signup</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
