import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, Dimensions, Linking, Platform, Alert } from 'react-native';
import { Button, List, Surface, IconButton, Dialog, Portal, Provider } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { AuthContext } from '../../src/Context/AuthContext';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';


const { width } = Dimensions.get("window");

regId = ''

const PendingList = () => {

  const navigation = useNavigation();

  const route = useRoute();
  const data = route.params.pendingData;

  const role = data[0] ? data[0].user.role : "none";
  // role = data[0].user.role;
  // const role = data[0] ? data[0].role : "none";
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
  const deleteRequest = (id) => {

    axios.delete(`${BASE_URL}users/user/${id}`)
      .then((response) => {
        Alert.alert(
          "Succesfully Rejected",
          "Pending request rejected",
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

  // to accept a request from the pending list
  const acceptRequest = () => {
    setVisibleAccept(false)
    console.log("Accepted!")
    acceptRole(regId);
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

    // console.log("newUserID", newUserID);
    // console.log("approvedby", approvedby);

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
          "Pending request accepted successfully",
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

    // console.log("section Id -------------------- ", section.user._id),

    regId = section.user._id,
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

            <Button
              icon="plus"
              mode="outlined"
              onPress={() => {
                Alert.alert(
                  "Confirm",
                  "Are you sure to assign this user?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => acceptRole(section.user._id) }
                  ],
                  { cancelable: false }
                )
              }}
              borderColor='#01a9e1'
              labelStyle={{ color: "green", fontSize: width * 0.04, fontWeight: "bold" }}
              style={[styles.button, { borderColor: "green" }]} // Use theme colors for border color //  theme.colors.primary //#707070
            >
              Accept
            </Button>
          </View>

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button icon={"phone"} mode='contained' buttonColor={"#19AFE2"} style={styles.callButton} onPress={dialCall}>Call</Button>
          <Button icon={"minus"} mode='contained' buttonColor={"red"} style={styles.callButton}
            onPress={() => {
              Alert.alert(
                "Confirm",
                "Are you sure to remove this Supervisor?",
                [
                  { text: "Yes", onPress: () => deleteRequest(section.user._id) },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                ],
                { cancelable: false }
              )
            }} >
            Reject
          </Button>

        </View>

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
            {/* role === 'supervisor' ? "supervisor" : "labour" */}
            <Dialog.Title style={styles.dialogTitle} >Are you sure to delete this new {role} request?</Dialog.Title>
            <Dialog.Content>
              <Text>Delete this new {role} request from the pending list</Text>
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
            <Dialog.Title style={styles.dialogTitle} >Are you sure to accept he/she as a new {role}?</Dialog.Title>
            <Dialog.Content>
              <Text>Accept this request and add to registered {role}</Text>
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
    marginTop: width * 0.06,
  },
  activeHeader: {

    backgroundColor: 'white',
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
  },
  inactiveHeader: {
    backgroundColor: 'white',
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginLeft: width * 0.03,
  },
  content: {
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.04,
    backgroundColor: 'white',
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
    borderTopWidth: 1,
    borderColor: "#c7c7c7",
  },
  description: {
    fontSize: width * 0.035,
    color: 'gray',
    paddingVertical: width * 0.005,
  },
  button: {
    width: width * 0.38,
    paddingHorizontal: 0,
    marginHorizontal: 0,

  },
  surface: {
    marginHorizontal: width * 0.04,
    borderRadius: width * 0.02,
  },
  contentSurface: {
    marginBottom: width * 0.03,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  activeSurface: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inactiveSurface: {
    marginBottom: width * 0.03,
  },
  labourRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.39,
    overflow: 'hidden',
    marginLeft: width * 0.32,
  },
  callButton: {
    width: width * 0.3,
    marginVertical: width * 0.02,
  },
});

export default PendingList;

