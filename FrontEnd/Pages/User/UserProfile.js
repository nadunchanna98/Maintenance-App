import React, { useState, useContext } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../src/Context/AuthContext';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import BASE_URL from '../../src/Common/BaseURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Enter a valid email!").required("Email is required!"),
});

const UserProfile = () => {

  // get the logged in user details from the context
  const { getUserInfo, userInfo, logout } = useContext(AuthContext)

  // current user details
  const id = userInfo.userId
  const phoneNumber = userInfo.mobile_no
  const role = userInfo.role

  let name = userInfo.name
  let email = userInfo.email


  //state to save the updated user information as object
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo)

  // update the user with new details
  const updateUserDetails = async (values) => {
    updatedData = { ...updatedUserInfo, name: values.name, email: values.email }
    setUpdatedUserInfo(updatedData)
    //Alert.alert(JSON.stringify(updatedData))

    const dataToBeSend = { name: updatedData.name, email: updatedData.email }
    const url = `${BASE_URL}users/user/edit/${id}`

    // console.log(url)

    try {
      const response = await axios.put(url, dataToBeSend)
      // console.log(response.data)
      getUserInfo(id)
      Alert.alert("User Updated Successfully!")
    } catch (error) {
      console.log(error)
      Alert.alert("Something Went Wrong!")
    }

  }

  //Handling the edit profile modal
  const [visible, setVisible] = useState(false);
  const show = () => { setVisible(true) };
  const hide = () => { setVisible(false) };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topBar}></View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Ionicons name="person" size={windowWidth * 0.18} color="black" />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Ionicons name="person-outline" size={28} color="black" />
              <Text style={styles.detailText}>{userInfo.name}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="phone-portrait-outline" size={28} color="black" />
              <Text style={styles.detailText}>{phoneNumber}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="mail-outline" size={28} color="black" />
              <Text style={styles.detailText}>{userInfo.email}</Text>
            </View>
            <View style={styles.detail}>
              <FontAwesome5 name="user-cog" size={24} color="black" />
              <Text style={styles.detailText}>{userInfo.role}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={show}><Text style={styles.buttonText}>Edit Profile</Text></TouchableOpacity>
          </View>

          <Modal visible={visible} animationType="slide" onRequestClose={hide}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalContainer}>
                <Text style={styles.editTitleText}>Edit Profile</Text>
                <Formik
                  initialValues={{ name: name, email: email }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    hide()
                    updateUserDetails(values)
                  }}
                >
                  {({ handleChange, handleSubmit, setFieldTouched, isValid, touched, values, errors }) => {
                    return (<View>
                      <View>
                        <Text style={styles.textInputTitle}>Name</Text>
                        <TextInput style={styles.input} value={values.name} onBlur={() => { setFieldTouched('name') }} onChangeText={handleChange('name')} placeholder="Ex: David Boby" />
                        {touched.name && errors.name && (<Text style={styles.errorText}>{errors.name}</Text>)}
                      </View>
                      <View>
                        <Text style={styles.textInputTitle}>Phone Number</Text>
                        <TextInput style={styles.input} value={phoneNumber} placeholder="0777123456" keyboardType="phone-pad" editable={false} />
                      </View>
                      <View>
                        <Text style={styles.textInputTitle}>Email</Text>
                        <TextInput style={styles.input} value={values.email} onBlur={() => { setFieldTouched('email') }} onChangeText={handleChange('email')} placeholder="sample@email.com" />
                        {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                      </View>
                      <View>
                        <Text style={styles.textInputTitle}>Role</Text>
                        <TextInput style={styles.input} value={role} placeholder="Ex: Supervisor" editable={false} />
                      </View>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={hide}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleSubmit}
                          disabled={!isValid}
                          style={[styles.submitButton, { backgroundColor: isValid ? "#19AFE2" : "#7a7a7a", opacity: isValid ? 1 : 0.8 }]}
                        >
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>);
                  }}
                </Formik>
              </View>
            </ScrollView>
          </Modal>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button2} onPress={() => { logout() }}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
          </View>

        </View>
      </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#19AFE2",
    marginVertical: windowWidth * 0.1,
    padding: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.1,
    borderRadius: 500,
  },
  button2: {
    backgroundColor: "red",
    marginVertical: windowWidth * 0.001,
    padding: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.1,
    borderRadius: 500,
  },
  cancelButton: {
    backgroundColor: "#707070",
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
  textInputTitle: {
    fontSize: windowWidth * 0.045,
  },
  errorText: {
    color: "#ff0000",
  },
  submitButton: {
    marginVertical: windowWidth * 0.1,
    padding: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.1,
    borderRadius: 500,
  },
});

export default UserProfile