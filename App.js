import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./onBoarding/login";
import Signup from "./onBoarding/signup";
import Splash from "./onBoarding/splash";
import Intro from "./onBoarding/intro";
import BottomTabNavigator from "./buttomtab/buttomtab";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="intro"
          component={Intro}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="buttomTab"
          component={BottomTabNavigator}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
