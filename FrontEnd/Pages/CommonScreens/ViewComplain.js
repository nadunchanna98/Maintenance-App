import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Modal } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const ViewComplain = () => {

  const windowWidth = Dimensions.get('window').width;
  const windowRatio = windowWidth / 425;


  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);

  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainId;

  const [complain, setComplain] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [visible, setVisible] = useState('');
  const [showScaledImage, setShowScaledImage] = useState(false);
  const [supervisorName, setSupervisorName] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up message visibility
  const [rating, setRating] = useState(''); // State variable for rating selection
  const [showThankYou, setShowThankYou] = useState(false); // State variable for showing "Thank you" pop-up


  const handleChangeSupervisor = () => {
    navigation.navigate('SuperviserList', { complainID: complainId });
  };

  const handleDataSubmission = () => {
    navigation.navigate('SuperviserList', { complainID: complainId });
  };

  const handleCompleteSupervisor = () => {
    navigation.navigate('SupervisorFeedback', { complainID: complainId });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}complains/complainbyid/${complainId}`)
      .then((response) => {
        setComplain(response.data);
        setCreatedDate(response.data.created_date.split('T')[0]);
        setCreatedTime(response.data.created_date.split('T')[1].split('.')[0]);
        setVissible(response.data.status === "AssignedA");
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);


  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);



  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Complainer ID:</Text>
        <Text style={styles.value}>{complain.userID}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Created Date:</Text>
        <Text style={styles.value}>{createdDate}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Created Time:</Text>
        <Text style={styles.value}>{createdTime}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{complain.location}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{complain.description}</Text>
      </View>
      {!visible && (<View style={styles.dataContainer}>
        <Text style={styles.label}>Assigned Supervisor :</Text>
        <Text style={styles.value}>{complain.supervisorID}</Text>
      </View>)}
      {visible && (<TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
        <Text style={styles.buttonText}>Assign A Supervisor</Text>
      </TouchableOpacity>)}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowRatio = windowWidth / 425;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 20 * windowRatio,
  },
  image: {
    alignSelf: 'center',
    width: 200 * windowRatio,
    height: 200 * windowRatio,
    resizeMode: 'cover',
    marginBottom: 20 * windowRatio,
    borderRadius: 20 * windowRatio,
    marginTop: 20 * windowRatio,
  },
  dataContainer: {
    marginHorizontal: 20 * windowRatio,
    marginBottom: 20 * windowRatio,
    top: 30 * windowRatio,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15 * windowRatio,
  },
  fieldTitle: {
    fontWeight: 'bold',
    color: '#45474b',
    fontSize: 20 * windowRatio,
    marginRight: 10 * windowRatio,
    textAlign: 'left',
  },
  fieldValue: {
    color: '#45474b',
    fontSize: 20 * windowRatio,
    textAlign: 'left',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#19AFE2',
    marginHorizontal: -20 * windowRatio,
    marginTop: windowRatio,
  },
  button: {
    backgroundColor: '#01a9e1',
    padding: 20 * windowRatio,
    borderRadius: 5 * windowRatio,
    alignItems: 'center',
    marginRight: 5 * windowRatio,
    marginBottom: 25 * windowRatio,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
  },
  scaledImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scaledImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 40 * windowRatio,
    borderRadius: 10 * windowRatio,
    alignItems: 'center',
    width: '90%',
  },
  popupText: {
    fontSize: 25 * windowRatio,
    fontWeight: 'bold',
    marginBottom: 10 * windowRatio,
    textAlign: 'center',
  },
  popupDescription: {
    fontSize: 20 * windowRatio,
    marginBottom: 20 * windowRatio,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5 * windowRatio,
    marginLeft: 5 * windowRatio,
  },
  starContainer: {
    marginHorizontal: 5 * windowRatio,
  },
  starButton: {
    marginHorizontal: 8 * windowRatio,
  },
  starIcon: {
    width: 30 * windowRatio,
    height: 30 * windowRatio,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20 * windowRatio,
  },
  submitButton: {
    backgroundColor: '#01a9e1',
    padding: 10 * windowRatio,
    borderRadius: 10 * windowRatio,
    flex: 1,
    marginRight: 10 * windowRatio,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dismissButton: {
    backgroundColor: '#ccc',
    padding: 10 * windowRatio,
    borderRadius: 10 * windowRatio,
    flex: 1,
    marginLeft: 10 * windowRatio,
  },
  dismissButtonText: {
    color: 'black',
    fontSize: 20 * windowRatio,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ViewComplain;
