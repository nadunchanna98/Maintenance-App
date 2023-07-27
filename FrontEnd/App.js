import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet ,ToastAndroid } from 'react-native';
import { AuthProvider } from './src/Context/AuthContext';
import { UserProvider } from './src/Context/UserContext';
import AppNav from './src/navigation/AppNav';
import NetInfo from '@react-native-community/netinfo';

const App = () => {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {

      //check internet connection
      const unsubscribeNet = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
        if (!state.isConnected) {
          ToastAndroid.show('No internet connection', ToastAndroid.LONG);
          ToastAndroid.show('Please check your internet connection', ToastAndroid.LONG);
        } 
      });

      return () => {     //clean up 
        unsubscribeNet();
      };

  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AppNav />
        </View>
      </UserProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
