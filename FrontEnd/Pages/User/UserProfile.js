import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = () => {
  //Get user details and assign those details to state variables

  //Handling the edit profile modal
  const [visible, setVisible] = useState(false);
  const show = () => { setVisible(true) };
  const hide = () => { setVisible(false) };

  return (
    <SafeAreaView>
      <View style={styles.topBar}></View>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Ionicons name="person" size={windowWidth * 0.18} color="black" />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Ionicons name="person-outline" size={28} color="black" />
            <Text style={styles.detailText}>Username</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="calendar-outline" size={28} color="black" />
            <Text style={styles.detailText}>Birthday</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="phone-portrait-outline" size={28} color="black" />
            <Text style={styles.detailText}>0777123456</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="mail-outline" size={28} color="black" />
            <Text style={styles.detailText}>username@eng.jfn.ac.lk</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={show}><Text style={styles.buttonText}>Edit Profile</Text></TouchableOpacity>
        </View>
        <Modal visible={visible} animationType="slide" onRequestClose={hide}><TouchableOpacity style={styles.button} onPress={hide}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity></Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#19AFE2",
    width: "100%",
    height: windowHeight * 0.2,
  },
  container: {
    padding: 10,
  },
  profileContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    backgroundColor: "#FFFFFF",
    borderRadius: 500,
    top: -(windowWidth * 0.15 + 10),
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {},
  detail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: windowWidth * 0.05,
    borderColor: "#19AFE2",
    borderBottomWidth: 1,
  },
  detailText: {
    fontSize: windowWidth * 0.05,
    paddingLeft: windowWidth * 0.06,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#19AFE2",
    marginVertical: windowWidth * 0.1,
    padding: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.1,
    borderRadius: 500,
  },
  buttonText: {
    fontSize: windowWidth * 0.045,
    color: "#FFFFFF",
  },
});

export default UserProfile