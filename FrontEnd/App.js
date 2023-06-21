import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './Common/Context';
import UserDashboard from './Pages/User/UserDashboard';
import ComplainForm from './Pages/User/ComplainForm';
import UserProfile from './Pages/User/UserProfile';
import LoginScreen from './Pages/Other/LoginScreen';
import SignUpScreen from './Pages/Other/SignUpScreen';
import ForgotPassword from './Pages/Other/ForgotPasswordScreen';
import CodeEnterScreen from './Pages/Other/CodeEnterScreen';
import PasswordChangeScreen from './Pages/Other/PasswordChangeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screens for the stack navigator
const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={ { headerShown: false }}/>
      <Stack.Screen name="Screen1" component={UserDashboard} options={ { headerShown: false }} />
      <Stack.Screen name="Screen2" component={ComplainForm} options={ { headerShown: false }}  />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={ { headerShown: false }}  />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ { headerShown: false }}  />
      <Stack.Screen name="CodeEnterScreen" component={CodeEnterScreen} options={ { headerShown: false }}  />
      <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen} options={ { headerShown: false }}  />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Stack" component={StackScreens} options={ { headerShown: false }} />
            <Tab.Screen name="Profile" component={UserProfile} options={ { headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
