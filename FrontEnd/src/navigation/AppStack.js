import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserDashboard from '../../Pages/User/UserDashboard';
import ComplainForm from '../../Pages/User/ComplainForm';
import ComplainPreview from '../../Pages/User/ComplainPreview';
import UserProfile from '../../Pages/User/UserProfile';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
import SupervisorDashboard from '../../Pages/Superviser/SuperviserDashboard';
import LaborerDashboard from '../../Pages/Laborer/LaborerDashboard';
import { UserContext } from '../Context/UserContext';
import { AuthContext } from '../Context/AuthContext';
import NewRequests from '../../Pages/Admin/NewRequests';
// import InProgressWorks from '../../Pages/Admin/InProgressWorks';
// import CompletedWorks from '../../Pages/Admin/CompletedWorks';
import ListView from '../../Pages/CommonScreens/ComplainsList';
import RegisteredSupervisersList from '../../Pages/Admin/RegisteredSupervisorsList';
//
import Supervisors from '../../Pages/Admin/Supervisors';
import ComplainsList from '../../Pages/CommonScreens/ComplainsListByIdAndStatus';
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
      name="NewComplainRequests"
      component={ListView}
      options={{
        headerShown: true,
        title: "New Requests",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="InProgressComplains"
      component={ListView}
      options={{
        headerShown: true,
        title: "In Progress Works",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{
        headerShown: true,
        title: "Complain Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="CompletedComplainsList"
      component={ListView}
      options={{
        headerShown: true,
        title: "Completed Works",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="SuperviserList"
      component={RegisteredSupervisersList}
      options={{
        headerShown: true,
        title: "Available Supervisors",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="RegisteredSupervisors"
      component={RegisteredSupervisersList}
      options={{
        headerShown: true,
        title: "Registered Supervisors",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
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
      name="SuperviserDetailView"
      component={SuperviserDetailView}
      options={{
        headerShown: true,
        title: "Supervisor Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
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
      options={{
        headerShown: true,
        title: "Request Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={ComplainsList}
      options={{
        headerShown: true,
        title: "Completed Works",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{
        headerShown: true,
        title: "Complain Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="LaborerList"
      component={LaborerList}
      options={{
        headerShown: true,
        title: "Registered Labourers",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="LaborerDetailView"
      component={LaborerDetailView}
      options={{
        headerShown: true,
        title: "Labour Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
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
      component={ComplainsList}
      options={{
        headerShown: true,
        title: "Assigned Tasks",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{
        headerShown: true,
        title: "Complain Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
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
      options={{
        headerShown: true,
        title: "Complain Form",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="ComplainPreview"
      component={ComplainPreview}
      options={{
        headerShown: true,
        title: "Complain Preview",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
    <Stack.Screen
      name="ComplainsListByIdAndStatus"
      component={ComplainsList}
      options={{
        headerShown: true,
        title: "Completed Complains",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />

    <Stack.Screen
      name="ViewComplain"
      component={ViewComplain}
      options={{
        headerShown: true,
        title: "Complain Details",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
    />
  </Stack.Navigator>
);

const InstructionScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Instruction"
      component={Instruction}
      options={{
        headerShown: true,
        title: "Instructions",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
      initialParams={{ initialRoute: true }}
    />

    <Stack.Screen
      name="AboutApp"
      component={AboutApp}
      options={{
        headerShown: true,
        title: "About App",
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: "#19AFE2" },
        headerTintColor: "#ffffff"
      }}
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

                  if (route.name === 'Dashboard') {
                    iconName = 'home';
                  } else if (route.name === 'Profile') {
                    iconName = 'account';
                  } else if (route.name === 'Instruction') {
                    iconName = 'book';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Dashboard" component={AdminScreens} options={{ headerShown: false }} />
              <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
              <Tab.Screen name="Instruction" component={InstructionScreens} options={{ headerShown: false }} />

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

                  if (route.name === 'Dashboard') {
                    iconName = 'home';
                  } else if (route.name === 'Profile') {
                    iconName = 'account';
                  } else if (route.name === 'Instruction') {
                    iconName = 'book';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Dashboard" component={SupervisorScreens} options={{ headerShown: false }} />
              <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
              <Tab.Screen name="Instruction" component={InstructionScreens} options={{ headerShown: false }} />

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

                  if (route.name === 'Dashboard') {
                    iconName = 'home';
                  } else if (route.name === 'Profile') {
                    iconName = 'account';
                  } else if (route.name === 'Instruction') {
                    iconName = 'book';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Dashboard" component={LaborerScreens} options={{ headerShown: false }} />
              <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
              <Tab.Screen name="Instruction" component={InstructionScreens} options={{ headerShown: false }} />

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

                  if (route.name === 'Dashboard') {
                    iconName = 'home';
                  } else if (route.name === 'Profile') {
                    iconName = 'account';
                  } else if (route.name === 'Instruction') {
                    iconName = 'book';
                  }

                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Dashboard" component={UserScreens} options={{ headerShown: false }} />
              <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
              <Tab.Screen name="Instruction" component={InstructionScreens} options={{ headerShown: false }} />

            </Tab.Navigator>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
