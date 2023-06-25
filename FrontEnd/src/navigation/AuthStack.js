import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Pages/Other/LoginScreen';
import SignUpScreen from '../../Pages/Other/SignUpScreen';
import ForgotPassword from '../../Pages/Other/ForgotPasswordScreen';
import CodeEnterScreen from '../../Pages/Other/CodeEnterScreen';
import PasswordChangeScreen from '../../Pages/Other/PasswordChangeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="CodeEnterScreen" component={CodeEnterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
