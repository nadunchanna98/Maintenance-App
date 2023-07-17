// for superviser view perpose

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Dimensions } from 'react-native';
import { Ionicons,AntDesign,MaterialIcons  } from '@expo/vector-icons';
import {  List } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

const LabourDetailView = () => {

  
  const [activeSections, setActiveSections] = useState([]);
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

    
    // const renderHeader = (user, index, isActive) => (
    //   <List.Item
    //     title={user.name}
    //     description={user.mobile_no}
    //     style={isActive ? styles.activeHeader : styles.inactiveHeader}
    //     left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
        
    //   />
    // );

    // const renderContent = (user, index, isActive) => (
    //   <View style={styles.content}>
    //     <Text style={styles.description}>name : {user.name}</Text>
    //     <Text style={styles.description}>Date: {user.data}</Text>
    //   </View>
    // );
    // const updateSections = (activeSections) => {
    //   setActiveSections(activeSections);
    // };
  

    if (user.length === 0) {
      return <Text>Loading...</Text>;
    }


    return (
      <ScrollView style={styles.container}>

        <View style={styles.profileContainer}>
            <Ionicons name="person" size={windowWidth * 0.18} color="black" />
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.heading}>{user.name}</Text>
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.label}>Information</Text>
        </View>

        <View style={styles.detail}>
              <Ionicons name="mail-outline" size={24} color="black" />
              <Text style={styles.detailText}>{user.email}</Text>
        </View>

        <View style={styles.detail}>
              <Ionicons name="phone-portrait-outline" size={24} color="black" />
              <Text style={styles.detailText}>{user.mobile_no}</Text>
        </View>
        
        <View style={styles.detail}>
              <AntDesign  name="setting" size={24} color="black" />
              <Text style={styles.detailText}></Text>
        </View>
        <View style={styles.detail}>
              <MaterialIcons name="construction" size={24} color="black" />
              <Text style={styles.detailText}></Text>
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.label}>In Progress Works</Text>
        </View>


        {/* <View >
          <List.Section>
          <Accordion
            sections={user.complains}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            underlayColor="transparent"
          />

          </List.Section>
        </View> */}
        

        
        
        </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      
    },
    profileContainer: {
      width: windowWidth * 0.3,
      height: windowHeight * 0.15,
      backgroundColor: "#FFFFFF",
      borderRadius: 500,
      marginTop: 20,
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
    },

    dataContainer: {
    flexDirection: 'row',
    marginBottom: 10,

  },

  heading: {
    flex: 1,
    fontWeight: "bold",
    textAlign: 'center', // Aligns the first item to the left
    flexWrap: 'wrap',
    fontSize: 20,
  },

  label: {
    flex: 1,
    paddingTop: 15,
    textAlign: 'left', // Aligns the first item to the left
    flexWrap: 'wrap',
    fontSize: 20,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: windowWidth * 0.05,
    borderColor: "#19AFE2",
    borderBottomWidth: 1,
  },
  detailText: {
    fontSize: windowWidth * 0.042,
    paddingLeft: windowWidth * 0.06,
  },
  activeHeader: {
    backgroundColor: '#F5F5F5',
  },
  inactiveHeader: {
    backgroundColor: 'white',
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  });

  export default LabourDetailView;
  