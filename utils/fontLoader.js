import * as Font from "expo-font";

export const loadCustomFonts = () => {
  return Font.loadAsync({
    custom: require("../fonts/AkatabRegular.ttf"),
  });
};
