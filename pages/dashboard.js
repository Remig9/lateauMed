import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { Button, H1 } from "../helper/element";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { FontAwesome5 } from "@expo/vector-icons";

import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import PropCard from "../component/propCard";
import Modalbutton from "../component/modalButton";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Dashboard = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [details, setDetails] = useState({});
  const [modalSeen, setModalSeen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState([
    {
      id: 1,
      name: "Remite",
      description: "testing",
      time: 10,
      dosage: 1,
      take: "Completed",
    },
    {
      id: 2,
      name: "Kinsley",
      description: "medicine",
      time: 12,
      dosage: 2,
      take: "Pending",
    },
    {
      id: 3,
      name: "Julius",
      description: "pricing",
      time: 23,
      dosage: 3,
      take: "Ignored",
    },
  ]);

  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 10;
  const [see, setSee] = useState(true);
  const [modalAdd, setModalAdd] = useState(false);
  const [medicationReminders2, setMedicationReminders2] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [date, setDate] = useState(new Date());

  const timeFormat = (time) => {
    console.log("this is the incoming time", time);
    const convertedTime = moment(time).format("hh:mm A");
    console.log("this is the convertedTime", convertedTime);
    // setTime(convertedTime);
    setShowTimeModal(false);
  };
  const dateFormat = (date) => {
    console.log("this is the incoming date", date.nativeEvent.timestamp);
    var dateString = new Date(date.nativeEvent.timestamp);
    // var dateString = moment.unix(date.nativeEvent.timestamp).format('DD/MM/YYYY');
    console.log("this is the incoming date after formatting>>>", dateString);
    const convertedDate = moment(dateString).format("DD/MM/YYYY");
    console.log(
      "this is the incoming date after   convertedDat >>>",
      convertedDate
    );

    setShowDateModal(false);
  };

  const emptyStates = () => {
    setName("");
    setTime("");
    setDescription("");
    setDosage("");
    setDate("");
  };

  const EditReminder = async (item) => {
    console.warn("ite coming >>>", item);
    setAdd(true);
    let Add = {
      id: item.id,
      name: item.name,
      description: item.description,
      time: item.time,
      dosage: item.dosage,
      take: null,
      date: item.date,
    };

    console.warn("item.iditem.id>>", item.id);
    const remove = await medicationReminders.filter(
      (element) => element.id != id
    );
    console.warn("Found", remove);
    setMedicationReminders(remove);
    setRefresh(!refresh);

    setName(item.name);
    setTime(item.time);
    setDate(item.data);
    setDosage(item.dosage);
  };

const editFunction=()=>{
  
  setName(details.name);
  setTime(details.time);
  setDate(details.data);
  setDosage(details.dosage);
  setDescription(details.description);
  setEditable(true)
}

  const create = async () => {
    let Add = {
      id: medicationReminders.length + 1,
      name: name,
      description: description,
      time: time,
      dosage: dosage,
      take: null,
      date: dateSelected,
    };

    console.log("details to create rimainder", Add);
    const check = await medicationReminders.push(Add);

    console.warn("checking>>>", check);

    console.warn("checking>> > medicationReminder", medicationReminders);
    var last = medicationReminders;
    setMedicationReminders(medicationReminders);
    setRefresh(!refresh);
    emptyStates();
    schedulePushNotification2("sec", name, description, dosage, time, date);
  };

  const Delete = async (item) => {
    console.warn("Id of the object to be deleted",item );
    const found = await medicationReminders.filter(
      (element) => element.id != item.id
    );
    console.warn("Found", found);
    setMedicationReminders(found);
    setRefresh(!refresh);
    setModalVisible(false)
  };
  const deleteControl = async (item) => {
    setDetails(item)
    setModalVisible(true)

  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [medicationReminders, setMedicationReminders]);

  async function schedulePushNotification2(
    seconds,
    name,
    description,
    dosage,
    time,
    date
  ) {
    var datetime_in = "06/30/2017 7:56 AM";
    var datetime_out = "06/30/2017 5:16 PM";
    console.log("date", date);
    console.log("time", time);
    console.log("date", date);
  }

const cancel=()=>{
  setName(details.name);
  setTime(details.time);
  setDate(details.data);
  setDosage(details.dosage);
  setDescription(details.description);
  setEditable(false)
  setModalSeen(false)
}

  async function schedulePushNotification(
    seconds,
    name,
    description,
    dosage,
    time,
    date
  ) {
    var datetime_in = "06/30/2017 7:56 AM";
    var datetime_out = "06/30/2017 5:16 PM";
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${name}`,
        description: `${description}`,
        dosage: dosage,
        data: { data: "It works" },
      },
      trigger: { seconds: seconds },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    console.log("token at start", token);
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "No Notification Permission",
          "please goto setting and on notification permission manual",
          [
            { text: "cancel", onPress: () => console.log("cancel") },
            { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
          ],
          { cancelable: false }
        );
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const moreDetails=async(item)=>{
    setName(item.name);
    setTime(item.time);
    setDate(item.data);
    setDosage(item.dosage);
    setDescription(details.description);
    setDetails(item)
    console.warn('more details to see>>',item)
    setModalSeen(true)

    console.warn(' want to see what is inside>>',details)
  }

  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container height={10} width={95} marginLeft={5} marginTop={6}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Container
              width={17}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <TouchWrap onPress={() => setNotificationModal(true)}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
                  }}
                >
                  <Image
                    source={AppIcons.user}
                    style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                  />
                </View>

                <Text>David</Text>
              </TouchWrap>
            </Container>

            <Container
              width={20}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              >
                <Image
                  source={AppIcons.introB}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View>

              <Text>Charlse</Text>
            </Container>

            <Container
              width={20}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              >
                <Image
                  source={AppIcons.con}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View>

              <Text>Feranmi</Text>
            </Container>

            <Container
              width={20}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              >
                <Image
                  source={AppIcons.introD}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View>

              <Text>Adam</Text>
            </Container>

            <Container
              width={20}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              >
                <Image
                  source={AppIcons.introA}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View>

              <Text>Segun</Text>
            </Container>

            <Container
              width={20}
              height={10}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                }}
              >
                <Image
                  source={AppIcons.introC}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View>

              <Text>Samuel</Text>
            </Container>
          </ScrollView>
        </Container>
        <Container
          height={20}
          width={90}
          marginLeft={5}
          backgroundColor={"#0174cf"}
          marginTop={3}
          borderRadius={8}
        >
          <Container
            marginTop={2}
            marginLeft={3}
            direction="row"
            verticalAlignment="center"
          >
            <FontAwesome5 name="medrt" size={25} color="white" />
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "bold",
                paddingLeft: 10,
              }}
            >
              Lateaumed
            </Text>
            <TouchWrap>
              <Text style={{ paddingLeft: "15%", color: "#FFFFFF" }}>
                Transaction history
              </Text>
            </TouchWrap>
          </Container>
          <Container
            marginLeft={3}
            marginTop={3}
            direction="row"
            verticalAlignment="center"
          >
            <Text style={{ color: "#FFFFFF" }}>Wallet balance</Text>
            <Container
              horizontalAlignment="center"
              width={10}
              height={3}
              verticalAlignment="center"
            >
              <TouchWrap onPress={() => setSee(!see)}>
                {see ? (
                  <FontAwesome5 name="eye-slash" size={13} color={"#FFFFFF"} />
                ) : (
                  <FontAwesome5 name="eye" size={13} color={"#FFFFFF"} />
                )}
              </TouchWrap>
            </Container>
          </Container>
          <Container marginLeft={3}>
            <Text
              style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
            >
              {see ? "******" : "\u20A6 50000"}
            </Text>
          </Container>
        </Container>
        <TouchWrap onPress={() => setModalAdd(true)}>
          <Container
            marginTop={2}
            width={87}
            marginLeft={5}
            verticalAlignment="center"
            horizontalAlignment="flex-end"
          >
            <Container verticalAlignment="center" horizontalAlignment="center">
              <Ionicons name="ios-add-circle-sharp" size={36} color="#0174cf" />
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Add item</Text>
            </Container>
          </Container>
        </TouchWrap>

        <Container marginTop={2} marginBottom={15} marginLeft={5}>
          {medicationReminders ? (
            <FlatList
              data={medicationReminders}
              extraData={refresh}
              renderItem={({ item }) => (
                <PropCard
                  index={item.id}
                  name={item.name}
                  time={item.time}
                  dose={item.dosage}
                  status={item.take}
                  onPress={()=>moreDetails(item)}
                  delete={()=>deleteControl(item)}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </Container>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        elevation={10}
      >
         <Container backgroundColor={'rgba(52, 52, 52, 0.8)'} flex={1}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Container marginTop={37} horizontalAlignment="center">
            <Container
              backgroundColor={"#E5E5E5"}
              padding={2}
              width={95}
              horizontalAlignment="center"
              borderRadius={10}
            >
              <Container marginTop={1}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Create a Medication
                </Text>
              </Container>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                  }}
                  multiline={true}
                  placeholder="Name:"
                  placeholderTextColor={"gray"}
                  onChangeText={(value)=>setName(value)}
                ></TextInput>
              </Container>

              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                  }}
                  multiline={true}
                  placeholder="Dose:"
                  onChangeText={(value)=>setDosage(value)}
                  placeholderTextColor={"gray"}
                ></TextInput>
              </Container>
              <TouchWrap onPress={()=>setShowTimeModal(true)}>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                  multiline={true}
                  placeholder="Time"
                  value={time}
                  placeholderTextColor={"gray"}
                  editable={false}
                ></TextInput>
              </Container>
</TouchWrap>


<TouchWrap onPress={()=>setShowDateModal(true)}>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                  multiline={true}
                  placeholder="Date"
                  value={time}
                  placeholderTextColor={"gray"}
                  editable={false}
                ></TextInput>
              </Container>
              </TouchWrap>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                  }}
                  multiline={true}
                  placeholder="Description:"
                  placeholderTextColor={"gray"}
                  onChangeText={(value)=>setDescription(value)}
                ></TextInput>
              </Container>
              <Container direction="row" marginTop={5}>
                <Container>
                  <Container marginLeft={1}>
                    <Modalbutton
                      color={"red"}
                      text={"back"}
                      onPress={() => setModalAdd(false)}
                    />
                  </Container>
                </Container>

                <Container marginLeft={20}>
                  <Modalbutton color={"#0174cf"} text={"save"}  onPress={() => create()} />
                </Container>
              </Container>
            </Container>
          </Container>
        </KeyboardAvoidingView>
        </Container>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationModal}
        elevation={10}
      >
        <Container
          marginTop={55}
          horizontalAlignment="center"
          marginBottom={20}
        >
          <Container
            backgroundColor={"#E5E5E5"}
            padding={2}
            width={95}
            horizontalAlignment="center"
            borderRadius={8}
          >
            <Container
              height={7}
              width={15}
              borderRadius={50}
              backgroundColor={"white"}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <Ionicons name="ios-warning" size={30} color="red" />
            </Container>
            <Container marginTop={1}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Delete Medication
              </Text>
            </Container>
            <Container
              marginTop={2}
              direction="row"
              width={80}
              horizontalAlignment="center"
            >
              <Container padding={1} marginLeft={20}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "black" }}
                >
                  Name:
                </Text>
              </Container>
              <Container padding={1} width={50} verticalAlignment="center">
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  malaria drug
                </Text>
              </Container>
            </Container>
            <Container direction="row" width={90} horizontalAlignment="center">
              <Container padding={1} marginLeft={20}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "black" }}
                >
                  Dose:
                </Text>
              </Container>
              <Container padding={1} width={50} verticalAlignment="center">
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  2 in the morning
                </Text>
              </Container>
            </Container>

            <Container direction="row" width={90} horizontalAlignment="center">
              <Container padding={1} marginLeft={5}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "black" }}
                >
                  Description:
                </Text>
              </Container>
              <Container padding={1} width={55} verticalAlignment="center">
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  this is the drug to be taken by this user
                </Text>
              </Container>
            </Container>
            <Container direction="row" marginTop={5}>
              <Container marginLeft={1}>
                <Modalbutton
                  color={"red"}
                  text={"back"}
                  onPress={() => setNotificationModal(false)}
                />
              </Container>

              <Container marginLeft={20}>
                <Modalbutton color={"#0174cf"} text={"Delete"} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSeen}
        elevation={10}
        backgroundColor='blue'
      >
        <Container backgroundColor={'rgba(52, 52, 52, 0.8)'} flex={1}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Container marginTop={34} horizontalAlignment="center">
            <Container
              backgroundColor={"#E5E5E5"}
              padding={10}
              width={95}
              horizontalAlignment="center"
              borderRadius={10}
            >
              <Container marginTop={0}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Medication Details
                </Text>
              </Container>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                 
                  value={name}
                  onChangeText={(value)=>setName(value)}
                  placeholder="eg cough syrub"
                  placeholderTextColor={"gray"}
                  editable={editable}
                ></TextInput>
              </Container>

              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                  multiline={true}
                  placeholder="3"
                  value={dosage}
                  onChangeText={(value)=>setDosage(value)}
                  placeholderTextColor={"gray"}
                  editable={editable}
                ></TextInput>
              </Container>

<TouchWrap onPress={()=>setShowTimeModal(true)}>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                  multiline={true}
                  placeholder="Time"
                  value={time}
                  placeholderTextColor={"gray"}
                  editable={false}
                ></TextInput>
              </Container>
              </TouchWrap>

              {/* {showTimeModal ? (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'time'}
            is24Hour={true}
            
            onChange={(value) => timeFormat(value.nativeEvent.timestamp)}
          />
        ):null}
              {showDateModal && (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'date'}
            is24Hour={true}
            minimumDate={new Date()}
            maximumDate={new Date(2023, 10, 20)}
            onChange={(value) => dateFormat(value)}
          />
        )} */}
   {showDateModal && (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'date'}
            is24Hour={true}
            minimumDate={new Date()}
            maximumDate={new Date(2023, 10, 20)}
            onChange={(value) => dateFormat(value)}
          />
        )}

        {showTimeModal && (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'time'}
            is24Hour={true}
            onChange={(value) => timeFormat(value.nativeEvent.timestamp)}
          />
        )}
      
<TouchWrap onPress={()=>setShowDateModal(true)}>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:45
                  }}
                  multiline={true}
                  placeholder="Date"
                  value={date}
                  placeholderTextColor={"gray"}
                  editable={false}
                ></TextInput>
              </Container>
              </TouchWrap>
              <Container marginTop={2} width={90} horizontalAlignment="center">
                <TextInput
                  style={{
                    padding: 1,
                    width: "90%",

                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 10,
                    height:65
                  }}
                  multiline={true}
                  value={description}
                  placeholder="this is the description of the drug used by tis user"
                  placeholderTextColor={"gray"}
                  editable={editable}
                ></TextInput>
              </Container>
              <Container direction="row" marginTop={5}>
                <Container>
                  <Container marginLeft={1}>
                    <Modalbutton
                      color={"green"}
                      text={editable?'Cancel' : "Edit"}
                      onPress={()=>editable? cancel(): editFunction()}
                    
                    />
                  </Container>
                </Container>

                <Container marginLeft={20}>
                  <Modalbutton color={"#0174cf"} text={ editable? "Save":"Ok"}  onPress={()=>editable? console.warn('editable'): setModalSeen(false)} />
                </Container>
              </Container>
            </Container>
          </Container>
        </KeyboardAvoidingView>
        </Container>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        elevation={10}
      >
          <Container backgroundColor={'rgba(52, 52, 52, 0.8)'} flex={1}>
            <ScrollView>
        <Container
          marginTop={61}
          horizontalAlignment="center"
       
        >
          <Container
            backgroundColor={"#E5E5E5"}
            padding={2}
            width={95}
            horizontalAlignment="center"
            borderRadius={8} 
          >
            <Container
              height={6}
              width={13}
              borderRadius={50}
              backgroundColor={"white"}
              verticalAlignment="center"
              horizontalAlignment="center" 
            >
              <Ionicons name="ios-warning" size={25} color="red" />
            </Container>
            <Container marginTop={1}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Delete Medication
              </Text>
            </Container>
            <Container marginTop={1}>
              <Text style={{  fontSize: 15, color:'gray' }}>
                Are you sure you want to delete this reminder?
              </Text>
            </Container>
            <Container
              marginTop={2}
              direction="row"
              width={90}
               
            >
              <Container padding={1} width={45}  direction="row" >
                <Container verticalAlignment="center">
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: "black" }}
                >
                  Name:
                </Text>
                </Container>
                <Container padding={1} verticalAlignment="center"  width={33} >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                  {details?details.name:null}
                </Text>
              </Container>
              </Container>

              <Container direction="row"  >
              <Container padding={1} verticalAlignment="center"  >
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: "black" }}
                >
                  Dose:
                </Text>
              </Container>
              <Container padding={1} verticalAlignment="center"  width={35} >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                 {details?details.dosage:null}
                </Text>
              </Container>
            </Container>
             
            </Container>
          

            <Container direction="row" width={90} >
              <Container padding={1}  >
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: "black" }}
                >
                  Description:
                </Text>
              </Container>
              <Container padding={1} width={69}  verticalAlignment="center"  >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                {details?details.description:null}
                </Text>
              </Container>
            </Container>
          
            <Container
         
              direction="row"
              width={90}
               
            >
              <Container padding={1} width={45}  direction="row" >
                <Container verticalAlignment="center">
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: "black" }}
                >
                  Time:
                </Text>
                </Container>
                <Container padding={1} verticalAlignment="center"  width={33} >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                  {details?details.time:null}
                </Text>
              </Container>
              </Container>

              <Container direction="row"  >
              <Container padding={1} verticalAlignment="center"  >
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: "black" }}
                >
                  Date:
                </Text>
              </Container>
              <Container padding={1} verticalAlignment="center"  width={35} >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "gray",
                  }}
                >
                 {details?details.date:null}
                </Text>
              </Container>
            </Container>
             
            </Container>
            <Container direction="row" marginTop={3}>
              <Container marginLeft={1}>
                <Modalbutton
                  color={"red"}
                  text={"back"}
                  onPress={() => setModalVisible(false)}
                />
              </Container>

              <Container marginLeft={20}>
                <Modalbutton
                  color={"#0174cf"}
                  text={"Delete"}
                  onPress={() => Delete(details)}
                />
              </Container>
            </Container>
          </Container>
        </Container>
        </ScrollView>
        </Container>
      </Modal>
    </Container>
  );
};
export default Dashboard;
