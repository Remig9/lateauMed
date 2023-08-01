import Toast from 'react-native-simple-toast';

export const ToastShort = msg => {
  Toast.show(msg);
};

export const ToastLong = msg => {
  Toast.show(msg, Toast.LONG);
};
