import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { AuthProvider } from './src/Context/AuthContext';
import { UserProvider } from './src/Context/UserContext';
import AppNav from './src/navigation/AppNav';

const App = () => {



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
