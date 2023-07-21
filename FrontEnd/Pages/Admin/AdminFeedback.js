import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';
import{Button} from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../../src/Common/BaseURL';

const AdminFeedback = () => {
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

  const handleComplete = () => {
    console.log("Work Completed");
    setCompleted(true);
    setIsModalVisible(true);
  };

 
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const submitFeedback = () => {
    if (completed) {
      // axios to update the status of complain to completed
      axios.put(`${BASE_URL}complains/complain/${complainId}`, {
        status: 'Completed',
        admin_feedback:feedback}).then((response) => {
          console.log('response', response);
          Alert.alert(
            'Complain Updated',
            'Complain has been updated successfully!',

            [{ text: 'OK', onPress: () => navigation.navigate('AdminDashboard') }],
            { cancelable: false }
          );
          navigation.navigate('AdminDashboard');
        })
        .catch((error) => {
          console.log('error', error);

        });

    } else {
      // axios to update the status of complain to declined
    }
    setFeedback('');
    toggleModal();
    Alert.alert(
      'Feedback Submitted',
      'Thank you for your feedback!',
      [{ text: 'OK', onPress: () => console.log('Navigate to') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complain Details</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Complainer ID:</Text>
        <Text style={styles.value}>{complain.userID}</Text>
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
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Supervisor Feedback:</Text>
        <Text style={styles.value}>{complain.supervisor_feedback}</Text>
      </View>
      <View>
        <Modal visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Select a default feedback:</Text>
            {
              defaultCompletedFeedbacks.map((item) => (
                <TouchableOpacity key={item} onPress={() => setFeedback(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))
             
            }
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

export default AdminFeedback;
