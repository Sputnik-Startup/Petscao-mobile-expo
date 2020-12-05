import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "../components/CustomTabBar";

import Home from "../screens/Home/index";
import Pet from "../screens/Pet/index";
import Appointment from "../screens/Appointment/index";
import Profile from "../screens/Profile/index";

import HeaderLogo from "../components/HeaderLogo";
import Notifications from "../screens/Notifications";

const Tab = createBottomTabNavigator();

export default () => (
  <>
    <HeaderLogo />
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Pet" component={Pet} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  </>
);
