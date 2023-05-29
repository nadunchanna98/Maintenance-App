import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer,ScrollView } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './Common/Context';
import UserDashboard from './Pages/User/UserDashboard';
import ComplainForm from './Pages/User/ComplainForm';
import ComplainPreview from './Pages/User/ComplainPreview';
import UserProfile from './Pages/User/UserProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Screens for the stack navigator
const StackScreens = () => {
  return (
    
      <Stack.Navigator>
      <Stack.Screen name="Complain" component={ComplainForm} options={{
        title: 'Send Your Complain',
        headerStyle: {
          backgroundColor: '#19AFE2', // Set the background color of the header
          height: 250,
        },
        headerTitleStyle: {
          fontSize: 40, // Set the font size of the header title
          color: 'white', // Set the color of the header title
        },
      }}/>
      <Stack.Screen name="ComplainPreview" 
      component={ComplainPreview}
      options={{
        title: 'Complain Preview',
        headerStyle: {
          backgroundColor: '#19AFE2', // Set the background color of the header
          height: 250,
        },
        headerTitleStyle: {
          fontSize: 40, // Set the font size of the header title
          color: 'white', // Set the color of the header title
        },
      }}/>

      
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
