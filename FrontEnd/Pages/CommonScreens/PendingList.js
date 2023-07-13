import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, Dimensions, Linking, Platform, Alert } from 'react-native';
import { Button, List, Surface, IconButton, Dialog, Portal, Provider } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { AuthContext } from '../../src/Context/AuthContext';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';


const { width } = Dimensions.get("window");

const PendingList = () => {

      const navigation = useNavigation();

  const route = useRoute();
  const data = route.params.pendingData;

  const role = data[0].role;
  // setActiveRequest.user.role

  const { userInfo } = useContext(AuthContext);

  const [activeSections, setActiveSections] = useState([]);
  const [activeRequest, setActiveRequest] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [visibleDelete, setVisibleDelete] = useState(false); //visibility of the delete dialog
  const [visibleAccept, setVisibleAccept] = useState(false); //visibility of the accept dialog

  // this will set the active request
  useEffect(() => {
    if (activeSections.length != 0) {
      setActiveRequest(data[activeSections[0]])
    }
  }, [activeSections])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500); //after 1.5s refreshing will stop 
  }, []);

  // to delete a request from the pending list
  const deleteRequest = () => {
    setVisibleDelete(false)
    console.log("Deleted!")
  };

  // to accept a request from the pending list
  const acceptRequest = () => {
    setVisibleAccept(false)
    console.log("Accepted!")
  };

  // open dial pad with the user mobile number dialed when click call button
  const dialCall = () => {
    phoneNum = activeRequest.user.mobile_no;
    if (Platform.OS === 'android') {
      phoneNum = `tel:${phoneNum}`;
    } else {
      phoneNum = `telprompt:${phoneNum}`;
    }
    Linking.openURL(phoneNum);
  }

  const acceptRole = (newUserID) => {
    const approvedby = userInfo.userId;
    let role = '';
  
    console.log("newUserID", newUserID);
    console.log("approvedby", approvedby);
  
    if (userInfo.role === 'supervisor') {
      role = 'labour';
    } else if (userInfo.role === 'admin') {
      role = 'supervisor';
    }
  
    console.log("role", role);
  
    axios.post(`${BASE_URL}pending/approve/${newUserID}/${role}/${approvedby}`)
      .then((response) => {
        Alert.alert(
          "Success",
          "User has been approved",
          [
            { text: "OK" },
          ],
          { cancelable: false }
        );
        if (userInfo.role === 'supervisor') navigation.navigate("SupervisorDashboard");
        else if (userInfo.role === 'admin') navigation.navigate("AdminDashboard");
        
        console.log(response.data);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Something went wrong",
          [
            { text: "OK" },
          ],
          { cancelable: false }
        );
  
        console.error(error);
      });
  };
  

  // open whatsapp with the user mobile number dialed when click whatsapp button
  const openWhatsapp = () => {
    phoneNum = activeRequest.user.mobile_no;
    Linking.openURL(`whatsapp://send?text=hello&phone=+94${phoneNum}`);
  }

  const renderHeader = (section, index, isActive) => (
    <Surface style={[isActive ? styles.activeSurface : styles.inactiveSurface, styles.surface]} elevation={2}>

      <List.Item
        title={section.user.name}
        titleStyle={{ width: width * 0.28 }}
        description={section.user.role === 'supervisor' ? section.pendingUser.work_type : section.user.mobile_no}
        descriptionStyle={{ width: width * 0.28 }}
        style={[isActive ? styles.activeHeader : styles.inactiveHeader, { borderRadius: 8 }]}
        left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={[styles.avatar, { alignSelf: "center" }]} />}
        right={() => (
          <View style={styles.labourRequest}>
            <IconButton
              icon={"delete"}
              iconColor='white' size={18}
              style={{ backgroundColor: 'red' }}
              onPress={() => {
                setVisibleDelete(!visibleDelete);
              }}
            />
            <Button
              icon="check"
              mode="outlined"
              onPress={() => acceptRole(section.user._id)}
              borderColor='#01a9e1'
              labelStyle={{ color: "green", fontSize: 14 }}
              style={[styles.button, { borderColor: "green" }]} // Use theme colors for border color //  theme.colors.primary //#707070
            >
              Accept
            </Button>

            {/* <IconButton icon={"delete"} iconColor='white' size={18} style={{ backgroundColor: 'red' }} onPress={() => { console.log("Delete Pressed!") }} /> */}

          </View>
          // <Button
          //   icon="arrow-right"
          //   mode="outlined"
          //   onPress={() => navigation.navigate('PendingUserDetailView', { userId: section.user._id })}
          //   borderColor='#01a9e1'
          //   color='#f08e25'
          //   labelStyle={{ color: "#01a9e1", fontSize: 15 }}
          //   style={[styles.button, { borderColor: "#707070" }]} // Use theme colors for border color //  theme.colors.primary
          // >
          //   View
          // </Button>
        )}
      />
    </Surface>
  );

  const renderContent = (section, index, isActive) => (
    <Surface style={[styles.surface, styles.contentSurface]} elevation={2}>
      <View style={styles.content}>
        <Text style={styles.description}>Name: {section.user.name}</Text>
        <Text style={styles.description}>Work Type: {section.pendingUser.work_type}</Text>
        <Text style={styles.description}>Mobile No: {section.user.mobile_no}</Text>
        <Button icon={"phone"} mode='contained' buttonColor={"#19AFE2"} style={styles.callButton} onPress={dialCall}>Call</Button>
      </View>
    </Surface>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Provider>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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
        <Portal>
          <Dialog visible={visibleDelete} dismissable={false}>
            <Dialog.Icon icon={"alert"} />
            <Dialog.Title style={styles.dialogTitle} >Are you sure to delete this new {role === 'supervisor' ? "supervisor" : "labour"} request?</Dialog.Title>
            <Dialog.Content>
              <Text>Delete this new {role === 'supervisor' ? "supervisor" : "labour"} request from the pending list</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setVisibleDelete(false) }}>Cancel</Button>
              <Button onPress={deleteRequest}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visibleAccept} dismissable={false}>
            <Dialog.Icon icon={"alert"} />
            <Dialog.Title style={styles.dialogTitle} >Are you sure to accept he/she as a new {role === 'supervisor' ? "supervisor" : "labour"}?</Dialog.Title>
            <Dialog.Content>
              <Text>Accept this request and add to registered {role === 'supervisor' ? "supervisors" : "labourers"}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setVisibleAccept(false) }}>Cancel</Button>
              <Button onPress={acceptRequest}>Accept</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  requestList: {
    marginTop: 8,
  },
  activeHeader: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inactiveHeader: {
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderColor: "#c7c7c7",
  },
  description: {
    fontSize: 14,
    color: 'gray',
    paddingVertical: width * 0.005,
  },
  button: {},
  surface: {
    marginHorizontal: 15,
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
  labourRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.39,
    overflow: 'hidden',
  },
  callButton: {
    width: width * 0.3,
    marginVertical: width * 0.02,
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