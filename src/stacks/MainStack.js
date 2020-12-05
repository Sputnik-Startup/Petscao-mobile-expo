import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload/index";
import SignIn from "../screens/SignIn/index";
import SignUp from "../screens/SignUp/index";
import MainTab from "./MainTab";
import PostItem from "../screens/PostItem/index";
import NewPet from "../screens/NewPet/index";
import NewAppointment from "../screens/NewAppointment/index";
import SelectPet from "../screens/SelectPet";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="PostItem" component={PostItem} />
    <Stack.Screen name="NewPet" component={NewPet} />
    <Stack.Screen name="NewAppointment" component={NewAppointment} />
    <Stack.Screen name="SelectPet" component={SelectPet} />
  </Stack.Navigator>
);
