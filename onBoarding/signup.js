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

const Signup = (props) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Container marginTop={7} marginLeft={5}>
          <H1 fontWeight="bold">Sign up</H1>
        </Container>
        <Container height={30} width={100} marginTop={2}>
          <ImageWrap source={AppIcons.introC} fit="contain" />
        </Container>

        <Container
          width={100}
          direction="row"
          marginTop={5}
          horizontalAlignment="center"
        >
          <TextInput
            style={{
              height: 43,
              width: "43%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
            }}
            placeholder="First name"
            placeholderTextColor={"gray"}
          ></TextInput>
          <TextInput
            style={{
              height: 43,
              width: "43%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
              marginLeft: "3%",
            }}
            placeholder="Last Name"
            placeholderTextColor={"gray"}
          ></TextInput>
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
          direction="row"
          marginTop={5}
          horizontalAlignment="center"
        >
          <TextInput
            style={{
              height: 43,
              width: "43%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
            }}
            placeholder="Password"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            style={{
              height: 43,
              width: "43%",
              borderRadius: 8,
              borderColor: "gray",
              borderWidth: 1,
              paddingLeft: 10,
              marginLeft: "3%",
            }}
            placeholder="Comfirm Password"
            secureTextEntry={true}
            placeholderTextColor={"gray"}
          ></TextInput>
        </Container>

        <Container width={100} horizontalAlignment="center" marginTop={5}>
          <Button
            text={"Signup"}
            onPress={() => props.navigation.navigate("login")}
          />
        </Container>

        <Container
          direction="row"
          width={100}
          marginTop={5}
          horizontalAlignment="center"
        >
          <Container>
            <Text style={{ fontSize: 15 }}>Already have an account ?</Text>
          </Container>
          <TouchWrap onPress={() => props.navigation.navigate("login")}>
            <Text
              style={{
                fontSize: 15,
                color: "#0174cf",
                fontWeight: "bold",
                paddingLeft: 5,
              }}
            >
              SIgn in
            </Text>
          </TouchWrap>
        </Container>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default Signup;
