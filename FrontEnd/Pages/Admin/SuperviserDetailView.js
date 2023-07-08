// for admin view perpose

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const SuperviserDetailView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userId = route.params.userId;

    console.log("userId", userId);
  
    const [pendingUser, setPendingUser] = useState([]);
  
    useEffect(() => {
      getUserDetail();
    }, []);
  
    const getUserDetail = () => {
      axios
        .get(`${BASE_URL}supervisors/user/${userId}`)
        .then((response) => {
          setPendingUser(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
  
    if (pendingUser.length === 0) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View>
        <Text>View detail of all supervisers</Text>
        <Text>{pendingUser.user.name}</Text>
        <Text>{pendingUser.user.email}</Text>
        <Text>{pendingUser.user.mobile_no}</Text>
        <Text>{pendingUser.user.role}</Text>
        <Text>{pendingUser.Data.work_type}</Text>
        <Text>{pendingUser.Data.approved_date}</Text>
      </View>
    );
  };
  
  export default SuperviserDetailView;
  


//   user: {
//     _id: new ObjectId("64a719f39206d83b6ac5575a"),
//     name: 'Thisaru Rathnayake',
//     email: 'thisaru@gmail.com',
//     mobile_no: '0999999999',
//     password: '$2b$10$u07oLFAN4ffP4kNYnuws..CRYHA1nToZhkYwfbnaU4QXN6qs9ofKS',
//     role: 'supervisor',
//     accepted: false,
//     complainer_type: 'other',
//     complains: [],
//     __v: 0
//   },
//   pendingData: {
//     _id: new ObjectId("64a719f39206d83b6ac5575b"),
//     userID: new ObjectId("64a719f39206d83b6ac5575a"),
//     work_type: 'irigation',
//     complains: [],
//     approved_date: 2023-07-06T19:45:55.797Z,
//     __v: 0
//   }
// }