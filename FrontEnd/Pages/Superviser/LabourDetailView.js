// for superviser view perpose

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const LabourDetailView = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userId = route.params.userId;

    console.log("userId", userId);
  
    const [user, setUser] = useState([]);
  
    useEffect(() => {
      getUserDetail();
    }, []);
  
    const getUserDetail = () => {
      axios
        .get(`${BASE_URL}users/labour/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
  
    if (user.length === 0) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View>
        <Text>View detail of all supervisers</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.mobile_no}</Text>
        <Text>{user.role}</Text>
      </View>
    );
  };
  
  export default LabourDetailView;
  