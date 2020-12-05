import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";
import { UserContext } from "../../contexts/UserContext";
import * as SplashScreen from "expo-splash-screen";

export default () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(UserContext);

  async function preventSplashHide() {
    try {
      await SplashScreen.preventAutoHideAsync();
      // SplashScreen.show();
    } catch (error) {
      console.log(error);
    }
    checkToken();
  }
  const checkToken = async () => {
    const token = await AsyncStorage.getItem(
      "PC_TOKEN"
    ); /*Pega o Token do app*/

    if (token) {
      try {
        const me = await api({
          method: "get",
          url: "/customer/me",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        dispatch({
          type: "@user/SET_ALL",
          payload: { user: me.data, token },
        });
        await SplashScreen.hideAsync();
        navigation.replace("MainTab");
      } catch (error) {
        alert(error.response?.data.error || error.message);
      }
    } else {
      await SplashScreen.hideAsync();
      navigation.replace("SignIn");
    }
  };

  useEffect(() => {
    preventSplashHide();
  }, []);

  return null;
};
