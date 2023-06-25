import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfile = () => {
  //Get user details and assign those details to state variables
  const [username, setUsername] = useState("user");
  const [birthday, setBirthday] = useState("06/26/1997");
  const [phoneNumber, setPhoneNumber] = useState("0777123456");
  const [email, setEmail] = useState("default@eng.jfn.ac.lk");

  const changeUsername = (inputUsername) => {
    setUsername(inputUsername);
  }
  const changeBirthday = (inputUsername) => {
    setBirthday(inputUsername);
  }
  const changePhoneNumber = (inputUsername) => {
    setPhoneNumber(inputUsername);
  }
  const changeEmail = (inputUsername) => {
    setEmail(inputUsername);
  }

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
        <Modal visible={visible} animationType="slide" onRequestClose={hide}>
          <View style={styles.modalContainer}>
            <Text style={styles.editTitleText}>Edit Profile</Text>
            <View style={styles.editContainer}>
              <TextInput style={styles.input} value={username} onChangeText={changeUsername} placeholder="username" />
              <TextInput style={styles.input} value={birthday} onChangeText={changeBirthday} placeholder="birthday" />
              <TextInput style={styles.input} value={phoneNumber} onChangeText={changePhoneNumber} placeholder="0777123456" keyboardType="phone-pad" />
              <TextInput style={styles.input} value={email} onChangeText={changeEmail} placeholder="email" />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={hide}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    padding: 10,
  },
  editTitleText: {
    fontSize: windowWidth * 0.1,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: windowWidth * 0.05,
  },
  input: {
    borderWidth: 1,
    borderColor: "#95A695",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
});

export default UserProfile