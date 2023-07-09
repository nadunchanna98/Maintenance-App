import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserDashboard from '../../Pages/User/UserDashboard';
import ComplainForm from '../../Pages/User/ComplainForm';
import UserProfile from '../../Pages/User/UserProfile';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
import SupervisorDashboard from '../../Pages/Superviser/SuperviserDashboard';
import LaborerDashboard from '../../Pages/Laborer/LaborerDashboard';
import { UserContext } from '../Context/UserContext';
import { AuthContext } from '../Context/AuthContext';
import NewRequests from '../../Pages/Admin/NewRequests';
import InProgressWorks from '../../Pages/Admin/InProgressWorks';
import CompletedWorks from '../../Pages/Admin/CompletedWorks';
import Supervisors from '../../Pages/Admin/Supervisors';
import CompletedComplainsList from '../../Pages/CommonScreens/ComplainsListByIdAndStatus';
import ViewComplain from '../../Pages/CommonScreens/ViewComplain';
import SuperviserList from '../../Pages/Admin/SuperviserList';
import PendingList from '../../Pages/CommonScreens/PendingList';
import PendingUserDetailView from '../../Pages/CommonScreens/PendingUserDetailView';
import SuperviserDetailView from '../../Pages/Admin/SuperviserDetailView';
import LaborerList from '../../Pages/Superviser/LabourList';
import LaborerDetailView from '../../Pages/Superviser/LabourDetailView';
import Instruction from '../../Pages/Other/Instruction';
import AboutApp from '../../Pages/Other/AboutApp';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminDashboard"
      component={AdminDashboard}
      options={{ headerShown: false }}
      initialParams={{ initialRoute: true }}
    />
    <Stack.Screen
      name="NewRequests"
      component={NewRequests}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={CompletedComplainsList}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CompletedWorks"
      component={CompletedWorks}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Supervisors"
      component={Supervisors}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SuperviserList"
      component={SuperviserList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PendingList"
      component={PendingList}
      options={{
        headerShown: true,
        title: "New Supervisor Requests",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="PendingUserDetailView"
      component={PendingUserDetailView}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SuperviserDetailView"
      component={SuperviserDetailView}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SupervisorScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SupervisorDashboard"
      component={SupervisorDashboard}
      options={{ headerShown: false }}
      initialParams={{ initialRoute: true }}
    />
    <Stack.Screen
      name="PendingList"
      component={PendingList}
      options={{
        headerShown: true,
        title: "New Labour Requests",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="PendingUserDetailView"
      component={PendingUserDetailView}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={CompletedComplainsList}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LaborerList"
      component={LaborerList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LaborerDetailView"
      component={LaborerDetailView}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const LaborerScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LaborerDashboard"
      component={LaborerDashboard}
      options={{ headerShown: false }}
      initialParams={{ initialRoute: true }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={CompletedComplainsList}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

const UserScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserDashboard"
      component={UserDashboard}
      options={{ headerShown: false }}
      initialParams={{ initialRoute: true }}
    />
    <Stack.Screen
      name="ComplainForm"
      component={ComplainForm}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={CompletedComplainsList}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const InstructionScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Instruction"
      component={Instruction}
      options={{ headerShown: false }}
      initialParams={{ initialRoute: true }}
    />

    <Stack.Screen
      name="AboutApp"
      component={AboutApp}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>


);


const AppStack = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {userInfo.role === 'admin' ? (
        <Stack.Screen

          options={{ headerShown: false }}
          name="AdminTab">
          {() => (
            <Tab.Navigator
              options={{ headerShown: false }}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'AdminScreens') {
                    iconName = 'home';
                  } else if (route.name === 'UserProfile') {
                    iconName = 'account';
                  }
                  else if (route.name === 'InstructionScreens') {
                    iconName = 'book';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="AdminScreens" component={AdminScreens} options={{ headerShown: false }} />
              <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
              <Tab.Screen name="InstructionScreens" component={InstructionScreens} options={{ headerShown: false }} />

            </Tab.Navigator>
          )}
        </Stack.Screen>
      ) : userInfo.role === 'supervisor' ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="SupervisorTab">
          {() => (
            <Tab.Navigator
              options={{ headerShown: false }}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'SupervisorScreens') {
                    iconName = 'home';
                  } else if (route.name === 'UserProfile') {
                    iconName = 'account';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="SupervisorScreens" component={SupervisorScreens} options={{ headerShown: false }} />
              <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      ) : userInfo.role === 'labour' ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="LaborerTab">
          {() => (
            <Tab.Navigator
              options={{ headerShown: false }}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'LaborerScreens') {
                    iconName = 'home';
                  } else if (route.name === 'UserProfile') {
                    iconName = 'account';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="LaborerScreens" component={LaborerScreens} options={{ headerShown: false }} />
              <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserTab">
          {() => (
            <Tab.Navigator

              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'UserScreens') {
                    iconName = 'home';
                  } else if (route.name === 'UserProfile') {
                    iconName = 'account';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="UserScreens" component={UserScreens} options={{ headerShown: false }} />
              <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
