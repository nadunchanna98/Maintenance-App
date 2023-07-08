import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, List, Surface, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const PendingList = () => {

  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);

  const navigation = useNavigation();
  const route = useRoute();
  // const PendingType = route.params.PendingType;
  const data = route.params.pendingData;
  // console.log("PendingType",PendingType);

  const [activeSections, setActiveSections] = useState([]);
  // const [data , setData] = useState([]);
  const theme = useTheme();

  // useEffect(() => {
  //   getListOfPending();
  // }, []);

  // const getListOfPending = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}users/pending/list`, {
  //       params: {
  //           PendingType : PendingType,
  //       }
  //     });
  //     setData(response.data);
  //     console.log(response.data[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const renderHeader = (section, index, isActive) => (
    <Surface style={[isActive ? styles.activeSurface : styles.inactiveSurface, styles.surface]} elevation={2}>
      <List.Item
        title={section.user.name}
        description={section.user.role === 'supervisor' ? section.pendingUser.work_type : section.user.mobile_no}
        style={[isActive ? styles.activeHeader : styles.inactiveHeader, { borderRadius: 8 }]}
        left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
        right={() => (
          <Button
            icon="arrow-right"
            mode="outlined"
            onPress={() => navigation.navigate('PendingUserDetailView', { userId: section.user._id })}
            borderColor='#01a9e1'
            color='#f08e25'
            labelStyle={{ color: "#01a9e1", fontSize: 15 }}
            style={[styles.button, { borderColor: "#707070" }]} // Use theme colors for border color //  theme.colors.primary
          >
            View
          </Button>
        )}
      /></Surface>
  );

  const renderContent = (section, index, isActive) => (
    <Surface style={[styles.surface, styles.contentSurface]} elevation={2}>
      <View style={styles.content}>
        <Text style={styles.description}>Name: {section.user.name}</Text>
        <Text style={styles.description}>Work Type: {section.pendingUser.work_type}</Text>
      </View>
    </Surface>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <ScrollView>
      <View style={styles.requestList}>
        <List.Section>
          {/* <List.Subheader>New users List</List.Subheader> */}
          <Accordion
            sections={data}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            underlayColor="transparent"
          />
        </List.Section>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  requestList: {
    marginTop: 8,
  },
  activeHeader: {
    backgroundColor: 'white',  //#F5F5F5     #ffd000
    // marginBottom: 0,
    // marginHorizontal: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inactiveHeader: {
    backgroundColor: 'white',   //white
    // marginHorizontal: 15,
    // marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 15,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',   //#F5F5F5   #14ff2c
    // marginHorizontal: 15,
    // marginBottom: 15,
    // borderRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderColor: "#c7c7c7",
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  surface: {
    marginHorizontal: 15,
    // marginBottom: 15,
    borderRadius: 8,
  },
  contentSurface: {
    marginBottom: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  activeSurface: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inactiveSurface: {
    marginBottom: 15,
  },
});

export default PendingList;




// {
//     user: {
//       _id: new ObjectId("64a71a8bded55e1b353879a8"),
//       name: 'Thisaru Rathnayake',
//       email: 'thisaru@gmail.com',
//       mobile_no: '0999999998',
//       password: '$2b$10$Nd9GfVAMAiX69wYhvU.1ceu7Hl2aAOWMI4xiOJlV2Rdm4Zap8pqMK',
//       role: 'supervisor',
//       accepted: false,
//       complainer_type: 'other',
//       complains: [],
//       __v: 0
//     },
//     pendingUser: {
//       _id: new ObjectId("64a71a8bded55e1b353879a9"),
//       userID: new ObjectId("64a71a8bded55e1b353879a8"),
//       work_type: 'irigation',
//       _id: new ObjectId("64a71ad3fc2422d9f32e402e"),
//       userID: new ObjectId("64a71ad3fc2422d9f32e402d"),
//       work_type: 'irigation',
//       complains: [],
//       approved_date: 2023-07-06T19:49:39.956Z,
//       __v: 0
//     }
//   }