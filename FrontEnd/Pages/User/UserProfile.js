import React from 'react'

const UserProfile = () => {

  // get the logged in user details from the context
  const { getUserInfo, userInfo ,  logout } = useContext(AuthContext)

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

    const dataToBeSend = { name: updatedData.name, email: updatedData.email } //password: "123"
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
    <div>UserProfile</div>
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