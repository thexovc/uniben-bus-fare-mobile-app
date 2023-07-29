import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/CustomToast";
import { UserProvider } from "./context/UserContext";
import Main from "./Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "NanumGothicCoding-Regular": require("./fonts/NanumGothicCoding-Regular.ttf"),
  });

  if (!fontsLoaded) {
  } else {
    return (
      <>
        <UserProvider>
          <StatusBar backgroundColor="transparent" barStyle="default" />
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </UserProvider>
        <Toast config={toastConfig} />
      </>
    );
  }
}
