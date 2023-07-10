// for admin view perpose

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      <SafeAreaView>
        <ScrollView>
          <View style={styles.topbar}>
            <Text style={styles.text}>Superviser Details</Text>
          </View>
          <View style={styles.circle}></View>
            <View>
              <Text style={styles.nameText}>Supervisor's Name</Text>
              <Text style={styles.joinDate}>Joined 23 July 2023</Text>
            </View>
          
            
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    topbar: {
      backgroundColor: "#19AFE2",
      width: "100%",
      height: 67,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginTop:15,
    },
    circle: {
      width: 80,
      height: 80,
      backgroundColor: '#D9D9D9',
      borderRadius: 40,
      marginTop: 20,
      marginBottom: 20,
      left: windowWidth*0.4,
     
    },
    nameText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,

    },
    joinDate: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'regular',
      
    },
  })
  
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