import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { Button, H1 } from "../helper/element";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";

const Login = (props) => {
  const [hide, setHide] = useState(true);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Container marginTop={7} marginLeft={5}>
          <H1 fontWeight="bold">Login</H1>
        </Container>
        <Container height={30} width={100} marginTop={2}>
          <ImageWrap source={AppIcons.introA} fit="contain" />
        </Container>

        <Container width={100} horizontalAlignment="center" marginTop={5}>
          <TextInput
            style={{
              height: 43,
              width: "90%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
            }}
            placeholder="Email Address"
            placeholderTextColor={"gray"}
          ></TextInput>
        </Container>

        <Container
          width={100}
          horizontalAlignment="center"
          marginTop={5}
          direction="row"
        >
          <TextInput
            style={{
              height: 43,
              width: "90%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
              marginLeft: "-3%",
            }}
            secureTextEntry={hide}
            placeholder="Password"
            placeholderTextColor={"gray"}
          ></TextInput>
          <Container
            height={6}
            width={7}
            marginLeft={-10}
            verticalAlignment="center"
            horizontalAlignment="center"
          >
            <TouchWrap onPress={() => setHide(!hide)}>
              {hide ? (
                <FontAwesome5 name="eye-slash" size={18} color={"black"} />
              ) : (
                <FontAwesome5 name="eye" size={18} color={"black"} />
              )}
            </TouchWrap>
          </Container>
        </Container>
        <Container marginLeft={50} marginTop={5}>
          <TouchWrap>
            <Text style={{ color: "#0174cf", fontWeight: "bold" }}>
              Forgotten Password ?
            </Text>
          </TouchWrap>
        </Container>
        <Container width={100} horizontalAlignment="center" marginTop={5}>
          <Button
            text={"Login"}
            onPress={() => props.navigation.navigate("buttomTab")}
          />
        </Container>

        <Container
          direction="row"
          width={100}
          marginTop={5}
          horizontalAlignment="center"
        >
          <Container>
            <Text style={{ fontSize: 15 }}>Don't have an account yet?</Text>
          </Container>
          <TouchWrap onPress={() => props.navigation.navigate("signup")}>
            <Text
              style={{
                fontSize: 15,
                color: "#0174cf",
                fontWeight: "bold",
                paddingLeft: 5,
              }}
            >
              SIgn up
            </Text>
          </TouchWrap>
        </Container>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default Login;
