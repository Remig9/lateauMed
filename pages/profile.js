import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { Button, H1 } from "../helper/element";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";

const Profilee = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <Container height={25} width={100} marginTop={5}>
        <ImageWrap source={AppIcons.introD} fit="contain" />
      </Container>

      <Container direction="row" marginLeft={5}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100 / 2,

            marginTop: "-15%",
          }}
        >
          <Image
            source={AppIcons.user}
            style={{ height: 120, width: 120, borderRadius: 120 / 2 }}
          />
        </View>
        <Container
          height={3}
          width={60}
          marginTop={1}
          verticalAlignment="center"
          horizontalAlignment="center"
          marginLeft={7}
        >
          <Text style={{ color: "#0174cf", fontWeight: "bold", fontSize: 18 }}>
            Profile
          </Text>
        </Container>
      </Container>
      <Container
        horizontalAlignment="center"
        marginTop={8}
        direction="row"
        marginLeft={2}
      >
        <Container verticalAlignment="center">
          <FontAwesome name="user" color={"#0174cf"} size={20} />
        </Container>

        <TextInput
          style={{
            width: "90%",
            height: 43,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            marginLeft: -25,
            paddingLeft: 35,
          }}
          placeholder="Remi Frank"
          placeholderTextColor={"black"}
          editable={false}
        ></TextInput>
      </Container>

      <Container
        horizontalAlignment="center"
        marginTop={4}
        direction="row"
        marginLeft={2}
      >
        <Container verticalAlignment="center">
          <Foundation name="mail" size={20} color={"#0174cf"} />
        </Container>

        <TextInput
          style={{
            width: "90%",
            height: 43,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            marginLeft: -25,
            paddingLeft: 35,
          }}
          placeholder="remifrank49@gmail.com"
          placeholderTextColor={"black"}
          editable={false}
        ></TextInput>
      </Container>
      <Container width={100} horizontalAlignment="center" marginTop={10}>
        <Button text={"Logout"} />
      </Container>
    </Container>
  );
};
export default Profilee;
