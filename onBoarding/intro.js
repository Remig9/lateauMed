import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { H1, H2, H4 } from "../helper/element";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { useState, useEffect } from "react";
const { width } = Dimensions.get("window");

const DATA = [
  {
    coverImage: AppIcons.introA,
    cornerLabelColor: "red",
    cornerLabelText: "WELCOME TO Lateaumed",
    cornerLabelText2: "Lateaumed is a digital financial services Company",
    cornerLabelText3: "that Specializes in mobile & other forms of E-payment",
  },
  {
    coverImage: AppIcons.con,
    cornerLabelColor: "#0080ff",
    cornerLabelText: "WELCOME TO Lateaumed",
    cornerLabelText2: "Lateaumed is a member company of Taylorcomms Group",
    cornerLabelText3: "which has commercial services running in Nigeria",
  },
  {
    coverImage: AppIcons.introC,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "WELCOME TO Lateaumed",
    cornerLabelText2: "Lateaumed is a member company of Taylorcomms Group",
    cornerLabelText3: "which has commercial services running in Nigeria",
  },
  {
    coverImage: AppIcons.introD,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "WELCOME TO Lateaumed",
    cornerLabelText2: "fast - moving consumer goods company on the continent",
    cornerLabelText3: "located in Lagos, Nigria,Lateaumed was founded in 2014",
  },
];
const Intro = (props) => {
  useEffect(() => {
    setTimeout(() => props.navigation.navigate("login"), 12000);
  });
  const renderItem = (data) => (
    <Container
      verticalAlignment="center"
      horizontalAlignment="center"
      key={data.coverImage}
      width={100}
    >
      <Container overflow="hidden">
        <ImageWrap
          source={data.coverImage}
          width={100}
          height={100}
          fit="contain"
        />
        <Container
          verticalAlignment="center"
          horizontalAlignment="center"
          position={"absolute"}
          marginTop={70}
          width={100}
        >
          <H1 color={"#5A5A5A"} fontWeight="bold">
            {" "}
            {data.cornerLabelText}
          </H1>
          <H2 color={"#5A5A5A"} fontWeight="bold" fontSize={5}>
            {" "}
            {data.cornerLabelText2}
          </H2>
          <H2 color={"#5A5A5A"} fontWeight="bold">
            {" "}
            {data.cornerLabelText3}
          </H2>
        </Container>
      </Container>
    </Container>
  );
  return (
    <Container
      flex={1}
      backgroundColor={"#FFFFFF"}
      verticalAlignment="center"
      horizontalAlignment="center"
    >
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </Container>
  );
};
export default Intro;
