import * as React from "react";
import { Text, View, StyleSheet, Platform, StatusBar } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import Profilee from "../pages/profile";
import Dashboard from "../pages/dashboard";
import Stats from "../pages/stats";
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 0.9,
          left: 0,
          right: 0,
          elevation: 10,
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: 55,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <MaterialCommunityIcons
                name="view-dashboard"
                size={22}
                color={focused ? "#0174cf" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="stats"
        component={Stats}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Ionicons
                name="stats-chart"
                size={22}
                color={focused ? "#0174cf" : "gray"}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profilee}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={22}
                color={focused ? "#0174cf" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
