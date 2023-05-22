import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './Common/Context';
import UserDashboard from './Pages/User/UserDashboard';
import ComplainForm from './Pages/User/ComplainForm';
import UserProfile from './Pages/User/UserProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screens for the stack navigator
const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={UserDashboard} />
      <Stack.Screen name="Screen2" component={ComplainForm} />
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
            <Tab.Screen name="Stack" component={StackScreens} />
            <Tab.Screen name="Profile" component={UserProfile} />
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
