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
  Pressable,
  Platform,
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
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  // birthday: yup.string().required("Birthday is required!"),
  email: yup.string().email("Enter a valid email!").required("Email is required!"),
});

const UserProfile = () => {

  // get the logged in user details from the context
  const { userInfo } = useContext(AuthContext)

  // current user details
  const id = userInfo.userId
  const phoneNumber = userInfo.mobile_no
  const role = userInfo.role

  let name = userInfo.name
  let birthday = userInfo.birthday
  let email = userInfo.email


  //state to save the updated user information as object
  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo)

  const [date, setDate] = useState(new Date()); //use the default data as user's birthday {userInfo.birthday}
  const [showPicker, setShowPicker] = useState(false);

  // update the user with new details
  const updateUserDetails = async (values) => {
    updatedData = { ...updatedUserInfo, name: values.name, email: values.email }
    setUpdatedUserInfo(updatedData)
    //Alert.alert(JSON.stringify(updatedData))

    const dataToBeSend = { name: updatedData.name, password: "123", email: updatedData.email } //password: "123"
    const url = `${BASE_URL}users/user/edit/${id}`
    console.log(url)

    try {
      const response = await axios.put(url, dataToBeSend)
      console.log(response.data)
      Alert.alert("User Updated Successfully!")
    } catch (error) {
      console.log(error)
      Alert.alert("Something Went Wrong!")
    }

  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; //this count the month from 0
    let day = date.getDate();
    return `${year}/${month}/${day}`
  }

  const onDateChange = ({ type }, selectedDate) => { //here type is even type from the event here it is destructing to get the type of event
    if (type == "set") { //if the type is set, then the current date is set to the selected date
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setBirthday(formatDate(currentDate));
      }
    } else {
      toggleDatePicker(); //if the type is "dismissed" then we have to toggle the date picker to hide it
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
              <Text style={styles.detailText}>Name: {userInfo.name}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="calendar-outline" size={28} color="black" />
              <Text style={styles.detailText}>Birthday: {userInfo.birthday}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="phone-portrait-outline" size={28} color="black" />
              <Text style={styles.detailText}>Mobile: {phoneNumber}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="mail-outline" size={28} color="black" />
              <Text style={styles.detailText}>Email: {userInfo.email}</Text>
            </View>
            <View style={styles.detail}>
              <FontAwesome5 name="user-cog" size={24} color="black" />
              <Text style={styles.detailText}>Role: {userInfo.role}</Text>
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
                  initialValues={{ name: name, email: email }} /*{{  name: userInfo.name, birthday: userInfo.birthday, mobile: userInfo.mobile_no, email: userInfo.email, role: userInfo.role  }}*/
                  validationSchema={schema}
                  onSubmit={(values) => {
                    hide()
                    updateUserDetails(values)
                  }}
                >
                  {({ handleChange, handleSubmit, setFieldTouched, isValid, touched, values, errors }) => {
                    return (<View>
                      {/* <Field name="name" type="text" placeholder="David Boby" /> */}
                      <View>
                        <Text style={styles.textInputTitle}>Name</Text>
                        <TextInput style={styles.input} value={values.name} onBlur={() => { setFieldTouched('name') }} onChangeText={handleChange('name')} placeholder="Ex: David Boby" />
                        {touched.name && errors.name && (<Text style={styles.errorText}>{errors.name}</Text>)}
                      </View>
                      <View>
                        <Text style={styles.textInputTitle}>Birthday</Text>
                        {showPicker && (<DateTimePicker mode='date' display='spinner' value={date} onChange={onDateChange} />)}
                        <Pressable onPress={toggleDatePicker}>
                          <TextInput style={styles.input} value={/*userInfo.birthday*/birthday} /* onChangeText={changeBirthday} */ placeholder="1998/2/5" editable={false} />
                        </Pressable>
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