import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const AppStack = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      {userInfo.role === 'admin' ? (
        <>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="NewRequests" component={NewRequests} options={{ headerShown: false }} />
          <Stack.Screen name="InProgressWorks" component={InProgressWorks} options={{ headerShown: false }} />
          <Stack.Screen name="CompletedWorks" component={CompletedWorks} options={{ headerShown: false }} />
          <Stack.Screen name="Supervisors" component={Supervisors} options={{ headerShown: false }} />
          {/* Additional admin screens */}
        </>
      ) : userInfo.role === 'supervisor' ? (
        <>
          <Stack.Screen name="SupervisorDashboard" component={SupervisorDashboard} options={{ headerShown: false }} />
          {/* Additional supervisor screens */}

        </>
      ) : userInfo.role === 'labour' ? (
        <>
          <Stack.Screen name="LaborerDashboard" component={LaborerDashboard} options={{ headerShown: false }} />
          {/* Additional laborer screens */}
        </>
      ) : (
        <>
          {/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} /> */}
          <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="ComplainForm" component={ComplainForm} options={{ headerShown: false }} />
          {/* <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} /> */}
        </>
      )}

      {/*  */}
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      {/*  */}

    </Stack.Navigator>
  );
};

export default AppStack;