import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const ViewComplain = () => {


  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);



  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainId;

  const [complain, setComplain] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [visible, setVissible] = useState('');

  const handleDataSubmission = () => {
    // console.log("Supervisor Assign");
    // console.log("Complain ID: ", complainId);
    navigation.navigate("SuperviserList", { complainID: complainId })
  }

  // console.log("Complain ID: ", complainId);

  useEffect(() => {
    axios.get(`${BASE_URL}complains/complainbyid/${complainId}`)
      .then((response) => {
        // console.log("response",response.data);
        setComplain(response.data);
        setCreatedDate(response.data.created_date.split('T')[0]);
        setCreatedTime(response.data.created_date.split('T')[1].split('.')[0]);
        setVissible(response.data.status === "AssignedA");


      })
      .catch((error) => {
        console.log("error", error);
      })
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complain Details</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}> Title:</Text>
        <Text style={styles.value}>{complain.title}</Text>
      </View>
      {/* <View style={styles.dataContainer}>
        <Text style={styles.label}>Complainer ID:</Text>
        <Text style={styles.value}>{complain.userID}</Text>
      </View> */}
      <View style={styles.dataContainer}>
        <Text style={styles.label}> Created Date:</Text>
        <Text style={styles.value}>{createdDate}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}> Created Time:</Text>
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
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Status:</Text>
        {
          complain.status !== "Completed" ? (<Text style={styles.value}>In Progress</Text>
          ) : (<Text style={styles.value}>Completed</Text>)
        }
      </View>

      {/* {userInfo.role === "admin" && (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Assigned Supervisor :</Text>
          <Text style={styles.value}>{complain.supervisorID}</Text>
        </View>)}
      {!visible && (<TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
        <Text style={styles.buttonText}>Assign A Supervisor</Text>
      </TouchableOpacity>)} */}

      {userInfo.role === "admin" ? (
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
            <Text style={styles.buttonText}>Assign A Supervisor</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{complain.supervisorID}</Text>
        </View>
      ) : userInfo.role === "supervisor" ? (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Mark as completed as the superser</Text>
        </View>
      ) : userInfo.role === "labour" ? (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Mark as completed as a labour</Text>
        </View>
      ) : (


        complain.status !== "Completed" ? (<Text style={styles.label}>We will complete as soon as possible !!</Text>
        ) : (<Text style={styles.label}>
          Is ther any problem, Please contact us through new complain !!
        </Text>)

      )
      }
    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    backgroundColor: '#01a9e1',
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 40,

  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
    marginTop: 3, // Adjust the margin as needed
  },
  value: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#01a9e1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',

    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  editButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fieldValue: {
    flex: 1,
    flexWrap: 'wrap',
  },
  fieldTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default ViewComplain;