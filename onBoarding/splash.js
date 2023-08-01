import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { H1 } from "../helper/element";
import { useState, useEffect } from "react";
const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => props.navigation.navigate("intro"), 5000);
  });
  return (
    <Container
      flex={1}
      backgroundColor={"#FFFFFF"}
      verticalAlignment="center"
      horizontalAlignment="center"
    >
      <Container direction="row">
        <ImageWrap
          source={AppIcons.appLogo}
          height={15}
          width={25}
          fit="contain"
        />
        <Container verticalAlignment="center" horizontalAlignment="center">
          <H1 fontWeight="bold" color={"#0174cf"}>
            Lateaumed
          </H1>
        </Container>
      </Container>
    </Container>
  );
};
export default Splash;
