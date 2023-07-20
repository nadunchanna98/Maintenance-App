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
    const [labour, setLabour] = useState([]);
    const [supervisorName, setSupervisorName] = useState('');
  
    useEffect(() => {
      getUserDetail();
      getSupervisorName(labour.approvedby);
      getSpecificLabourDetail();
    }, [labour.approvedby]);
  
    const getSpecificLabourDetail = () => {

      axios.get(`${BASE_URL}labours/user/${userId}`)
        .then((response) => {
          setLabour(response.data.labours);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getSupervisorName = (id) => {

      if(id !== undefined){
        
        console.log('id', id);
    
        axios.get(`${BASE_URL}supervisors/user/${id}`)
          .then((response) => {
            setSupervisorName(response.data.user.name);
          })
          .catch((error) => {
            console.log('error', error);
          });
    
        }
    
      };



    const getUserDetail = () => {
      axios
        .get(`${BASE_URL}users/labour/${userId}`)
        .then((response) => {
          setUser(response.data);
          // console.log(response.data);
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
        <Text>{supervisorName}</Text>
        <Text>{labour.approved_date}</Text>
      </View>
    );
  };
  
  export default LabourDetailView;
  

  