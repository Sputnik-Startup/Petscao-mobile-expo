import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./src/contexts/UserContext";
import MainStack from "./src/stacks/MainStack";
import { StatusBar } from "expo-status-bar";
import { NotificationProvider } from "./src/contexts/NotificationContext";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);
//Retornar JSX
export default () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <NotificationProvider>
          <StatusBar backgroundColor="#fb6340" translucent={false} />
          <MainStack />
        </NotificationProvider>
      </UserProvider>
    </NavigationContainer>
  );
};
