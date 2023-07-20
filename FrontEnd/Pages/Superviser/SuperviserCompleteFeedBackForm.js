import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';
import{Button} from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../../src/Common/BaseURL';

const SuperviserCompleteFeedBackForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainID;

  const [complain, setComplain] = useState([]);
  const [createdDate, setCreatedDate] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const defaultCompletedFeedbacks = ['No Issue', 'Needs improvement', 'Satisfied'];
  const defaultDeclinedFeedbacks = ['Quality Issue', 'Not Satisfied'];

  useEffect(() => {
    axios
      .get(`${BASE_URL}complains/complainbyid/${complainId}`)
      .then((response) => {
        setComplain(response.data);
        setCreatedDate(response.data.created_date.split('T')[0]);
        setCreatedTime(response.data.created_date.split('T')[1].split('.')[0]); 
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  
  // const updateComplain = ({ status, complainID }) => {
  //   // console.log('complainID', complainID);
  //   // console.log('status', status);
  //   // console.log('feedback', feedback);
  
  //   axios
  //     .put(`${BASE_URL}complains/complainbyid/${complainID}`, {
  //       status: status,
  //       supervisor_feedback: feedback,
  //       resolved_date : Date.now()
  //     })
  //     .then((response) => {
  //       // console.log('response', response);
  //       Alert.alert(
  //         'Complain Updated',
  //         'Complain has been updated successfully!',
  //         [{ text: 'OK', onPress: () => navigation.navigate('SupervisorDashboard') }],
  //         { cancelable: false }
  //       );
  //       navigation.navigate('SupervisorDashboard');
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // };

  const updateComplain = ({ status, complainID }) => {
    // console.log('complainID', complainID);
    // console.log('status', status);
    // console.log('feedback', feedback);
  
    axios
      .put(`${BASE_URL}complains/complain/${complainID}`, {
        status: 'CompletedS',
        supervisor_feedback: feedback,
        resolved_date: Date.now()
      })
      .then((response) => {
        Alert.alert(
          'Complain Updated',
          'Complain has been updated successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('SupervisorDashboard') }],
          { cancelable: false }
        );
        navigation.navigate('SupervisorDashboard');
        // console.log('response', response);
        axios.put(`${BASE_URL}complains/batchReleaseUpdate/${complainID}`)
        .then((response) => {
        
      }).catch((error) => {console.log('error', error);});})
      .catch((error) => {
        console.log('error', error);
      });
  };
  
  



  const handleComplete = () => {
    console.log("Work Completed");
    setCompleted(true);
    setIsModalVisible(true);
  };

  const handleDecline = () => {
    setCompleted(false);
    setIsModalVisible(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const submitFeedback = () => {
    if (completed) {
      updateComplain({status: 'CompletedS', complainID: complain._id});
    } 
   else {
      updateComplain({status: 'DeclinedS', complainID: complain._id});
    }
  
    toggleModal();
 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complain Details</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Complainer ID:</Text>
        <Text style={styles.value}>{complain._id}</Text>
      </View>
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
        <Text style={styles.label}>Assigned Supervisor:</Text>
        <Text style={styles.value}>{complain.supervisorID}</Text>
      </View>
      <View>
        <Modal visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Select a default feedback:</Text>
            {completed ? (
              defaultCompletedFeedbacks.map((item) => (
                <TouchableOpacity key={item} onPress={() => setFeedback(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
            ) : (
              defaultDeclinedFeedbacks.map((item) => (
                <TouchableOpacity key={item} onPress={() => setFeedback(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
            )}
            <TextInput
              placeholder="Or enter your own feedback"
              value={feedback}
              onChangeText={setFeedback}
            />
            <Button  onPress={submitFeedback} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Submit Feedback
          </Button> 
          <Button  onPress={toggleModal} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Close 
          </Button>
          </View>
        </Modal>
      </View>
      <Button  onPress={handleComplete} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Complete Work
          </Button>
          <Button  onPress={handleDecline} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Decline The Work
          </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
    button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    },
});

export default SuperviserCompleteFeedBackForm;
