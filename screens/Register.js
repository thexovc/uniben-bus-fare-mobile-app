import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/login/unibenLogo.png";
import { isEmail } from "../utils/Helper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { DB_URL } from "../config";
import { ActivityIndicator } from "react-native";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentRole, setStudentRole] = useState(true);

  const handleRegister = async () => {
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

    if (confirmPassword != password) {
      setPassword("");
      setConfirmPassword("");
      Toast.show({
        type: "error",
        text1: "Password don't match",
        position: "bottom",
        bottomOffset: 70,
        visibilityTime: 5000,
      });

      setLoading(false);

      return;
    }

    await axios
      .post(`${DB_URL}/api/register`, {
        email,
        password,
        username,
        userType: studentRole ? "student" : "driver",
      })
      .then((res) => {
        setLoading(false);

        console.log(res);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        Toast.show({
          type: "success",
          text1: "Registration Successful",
          position: "bottom",
          bottomOffset: 70,
          visibilityTime: 5000,
        });
        navigation.navigate("Login");
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        Toast.show({
          type: "error",
          text1: "Registration Error",
          position: "bottom",
          bottomOffset: 70,
          visibilityTime: 5000,
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 w-[100%]">
      <KeyboardAvoidingView className="flex-1">
        <View className="h-1/4 w-full flex items-center justify-center">
          <Image source={logo} className="w-20 h-20 mt-10" />
          <Text className="text-lg text-purple-800">Register</Text>
        </View>
        <View className="h-3/4 space-y-4 flex flex-col items-center w-5/6 mx-auto">
          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg">Nick Name</Text>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              className="border-[1px] border-gray-300 rounded-md p-3 w-full text-lg"
              placeholder="Nick Name"
            />
          </View>
          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="border-[1px] border-gray-300 rounded-md p-3 w-full text-lg"
              placeholder="Email"
            />
          </View>

          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg">Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="border-[1px] border-gray-300 rounded-md p-3 w-full text-lg"
              placeholder="Password"
              secureTextEntry
            />
          </View>

          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg">Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              className="border-[1px] border-gray-300 rounded-md p-3 w-full text-lg"
              placeholder="Confirm Password"
              secureTextEntry
            />
          </View>

          <View className="w-full space-y-2">
            <Text className="w-full mx-2 text-lg">Role</Text>
            <View className="flex space-x-2 flex-row w-full justify-between px-4">
              <TouchableOpacity
                onPress={() => setStudentRole(true)}
                className={`p-3 ${
                  studentRole ? "bg-green-400" : "bg-slate-300"
                }  rounded-lg w-1/2 flex-row justify-center`}
              >
                <Text className="text-white font-semibold">Student</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStudentRole(false)}
                className={`p-3 ${
                  !studentRole ? "bg-stone-700 " : "bg-slate-300"
                } rounded-lg w-1/2 flex-row justify-center`}
              >
                <Text className="text-white font-semibold">Driver</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Pressable
            className="w-full flex justify-center"
            onPress={handleRegister}
          >
            {loading ? (
              <View className="w-full p-4 mt-4 bg-blue-400 text-center rounded">
                <ActivityIndicator />
              </View>
            ) : (
              <Text className="w-full p-3 mt-4 bg-blue-400 text-center rounded text-neutral-200 font-medium block text-xl focus:bg-red-500">
                Register
              </Text>
            )}
          </Pressable>

          <View className="w-full mt-4 flex-row justify-center items-center space-x-2">
            <Text className="text-base">already have an account ?</Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
              className="justify-center"
            >
              <Text className="text-base text-orange-600">signin</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
