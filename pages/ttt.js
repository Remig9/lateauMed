import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Text,
  View,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Linking, Alert, FlatList } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [dateSelected, setDateSelected] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [notification, setNotification] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState([
    {
      id: 1,
      name: 'Remite',
      description: 'testing',
      time: 10,
      dosage: 1,
      take: null,
    },
    {
      id: 2,
      name: 'Kinsley',
      description: 'medicine',
      time: 12,
      dosage: 2,
      take: false,
    },
    {
      id: 3,
      name: 'Julius',
      description: 'pricing',
      time: 23,
      dosage: 3,
      take: true,
    },
  ]);
  const [medicationReminders2, setMedicationReminders2] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [date, setDate] = useState(new Date());

  const timeFormat = (time) => {
    console.log('this is the incoming time', time);
    const convertedTime = moment(time).format('hh:mm A');
    console.log('this is the convertedTime', convertedTime);
    setTime(convertedTime);
    setShowTimeModal(false);
  };
  const dateFormat = (date) => {
    console.log('this is the incoming date', date.nativeEvent.timestamp);
    var dateString= new Date(date.nativeEvent.timestamp);
    // var dateString = moment.unix(date.nativeEvent.timestamp).format('DD/MM/YYYY');
    console.log('this is the incoming date after formatting>>>', dateString);
    const convertedDate = moment(dateString).format('DD/MM/YYYY');
    console.log('this is the incoming date after   convertedDat >>>', convertedDate);
    
    setShowDateModal(false);
  };
  const emptyStates = () => {
    setName('');
    setTime('');
    setDescription('');
    setDosage('');
    setDate('');
  };

  const EditReminder = async (item) => {
    console.warn('ite coming >>>', item);
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

    console.warn('item.iditem.id>>', item.id);
    const remove = await medicationReminders.filter(
      (element) => element.id != id
    );
    console.warn('Found', remove);
    setMedicationReminders(remove);
    setRefresh(!refresh);

    setName(item.name);
    setTime(item.time);
    setDate(item.data);
    setDosage(item.dosage);
  };

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

    console.log('details to create rimainder', Add);
    const check = await medicationReminders.push(Add);

    console.warn('checking>>>', check);

    console.warn('checking>> > medicationReminder', medicationReminders);
    var last = medicationReminders;
    setMedicationReminders(medicationReminders);
    setRefresh(!refresh);
    emptyStates();
    schedulePushNotification2('sec', name, description, dosage, time, date);
  };

  const Delete = async (id) => {
    console.warn('Id of the object to be deleted', id);
    const found = await medicationReminders.filter(
      (element) => element.id != id
    );
    console.warn('Found', found);
    setMedicationReminders(found);
    setRefresh(!refresh);
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 75,
        width: '100%',
      }}>
      <ScrollView>
        {notification ? (
          <View>
            <Text>
              Title: {notification && notification.request.content.title}{' '}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text>
          </View>
        ) : null}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {notification ? (
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                height: 50,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <Text style={{ color: 'white' }}> Take </Text>
            </TouchableOpacity>
          ) : null}

          {notification ? (
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                height: 50,
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                borderRadius: 10,
              }}>
              <Text style={{ color: 'white' }}> Ignore </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {add ? (
          <View
            style={{
              marginTop: 20,
              height: 150,
              width: '100%',
              marginBottom: 220,
              marginLeft: 1,
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(value) => {
                setName(value);
              }}
              placeholder={'Name of medication'}
              value={name}
            />

            <TouchableOpacity onPress={() => setShowTimeModal(true)}>
              <TextInput
                style={styles.input}
                placeholder={'Time in seconds'}
                onChangeText={(value) => {
                  setTime(value);
                }}
                color={'black'}
                value={time}
                editable={false}
                keyboardType="numeric"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowDateModal(true)}>
              <TextInput
                style={styles.input}
                placeholder={'Enter Date'}
                onChangeText={(value) => {
                  setDate(value);
                }}
                value={date}
                editable={false}
                keyboardType="numeric"
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder={'Amount of Dosage'}
              onChangeText={(value) => {
                setDosage(value);
              }}
              value={dosage}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input2}
              placeholder={'Description'}
              multiline={true}
              onChangeText={(value) => {
                setDescription(value);
              }}
              value={description}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  height: 50,
                  width: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                  marginLeft: 20,
                }}
                onPress={() => create()}>
                <Text style={{ color: 'white' }}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <TouchableOpacity onPress={() => setAdd(true)}>
          <View style={{ marginLeft: '78%', marginTop: 2 }}>
            <AntDesign name="pluscircle" size={30} color="blue" />
          </View>
        </TouchableOpacity>

        {medicationReminders ? (
          <FlatList
            data={medicationReminders}
            extraData={refresh}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  borderRadius: 10,
                  flexDirection: 'row',
                }}
                onPress={() => Delete(item.id)}>
                <Text style={{ color: 'white' }}>{item.name} </Text>
                <View style={{ marginLeft: '40%' }}>
                  {item.take == null ? (
                    <Feather name="loader" size={32} color="white" />
                  ) : item.take == true ? (
                    <Ionicons
                      name="md-checkmark-circle"
                      size={32}
                      color="white"
                    />
                  ) : (
                    <AntDesign name="closecircle" size={28} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}

        {showTimeModal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={true}
            onChange={(value) => timeFormat(value.nativeEvent.timestamp)}
          />
        )}

        {showDateModal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            minimumDate={new Date()}
            maximumDate={new Date(2023, 10, 20)}
            onChange={(value) => dateFormat(value)}
          />
        )}
      </ScrollView>
    </View>
  );
}

async function schedulePushNotification2(
  seconds,
  name,
  description,
  dosage,
  time,
  date
) {
  var datetime_in = '06/30/2017 7:56 AM';
  var datetime_out = '06/30/2017 5:16 PM';
  console.log('date', date);
  console.log('time', time);
  console.log('date', date);
}

async function schedulePushNotification(
  seconds,
  name,
  description,
  dosage,
  time,
  date
) {
  var datetime_in = '06/30/2017 7:56 AM';
  var datetime_out = '06/30/2017 5:16 PM';
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${name}`,
      description: `${description}`,
      dosage: dosage,
      data: { data: 'It works' },
    },
    trigger: { seconds: seconds },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  console.log('token at start', token);
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'No Notification Permission',
        'please goto setting and on notification permission manual',
        [
          { text: 'cancel', onPress: () => console.log('cancel') },
          { text: 'Allow', onPress: () => Linking.openURL('app-settings:') },
        ],
        { cancelable: false }
      );
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
   console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
  },
  input2: {
    height: 85,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
  },
});
