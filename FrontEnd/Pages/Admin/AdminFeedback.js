import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, TextInput, Dimensions , useFocusEffect } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import {  useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../../src/Common/BaseURL';

const AdminFeedback = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainID;

  const [complain, setComplain] = useState([]);
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
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleComplete = () => {
    setCompleted(true);
    setIsModalVisible(true);
  };

  const handleDecline = () => {
    setCompleted(false);
    setIsModalVisible(true);
  };

  const assignNewSupervisor = () => {
    navigation.navigate('SuperviserList', { complainId: complainId });
  };


  const submitFeedback = () => {
    if (completed) {
      axios.put(`${BASE_URL}complains/complain/${complainId}`, {
        status: 'Completed',
        admin_feedback: feedback
      }).then((response) => {
        console.log('response', response);
        Alert.alert(
          'Work Completed!',
          'Good Job!',
          [{ text: 'OK', onPress: () => navigation.navigate('AdminDashboard') }],
          { cancelable: false }
        );
        navigation.navigate('AdminDashboard');
      }).catch((error) => {
        console.log('error', error);
      });
    } else {
      // axios to update the status of complain to declined
    }
    setFeedback('');
    toggleModal();
    Alert.alert(
      'Work Declined!',
      'Feedback submitted successfully!',
      [{ text: 'OK', onPress: () => console.log('AdminDashboard') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>

      <View>
        <Modal visible={isModalVisible} onRequestClose={toggleModal} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a default feedback:</Text>
              {completed ? (
                defaultCompletedFeedbacks.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setFeedback(item)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>{item}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                defaultDeclinedFeedbacks.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setFeedback(item)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>{item}</Text>
                  </TouchableOpacity>
                ))
              )}
              <TextInput
                style={styles.modalInput}
                placeholder="Or enter your own feedback"
                value={feedback}
                onChangeText={setFeedback}
                multiline={true}
                numberOfLines={4}
              />
              <Button onPress={submitFeedback} mode='contained' style={styles.modalSubmitButton}>
                Mark as {completed ? 'Completed' : 'Declined'}
              </Button>
              <Button onPress={toggleModal} mode='contained' style={styles.modalCloseButton}>
                Go back
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.buttonContainer}>

        <View style={styles.twobuttons}>
    

      {
        complain.status === 'CompletedS' ? (
          <TouchableOpacity
          onPress={handleComplete}
            activeOpacity={0.8}
            style={[styles.button1, { backgroundColor: '#19AFE2' }]}
          >
            <Text style={styles.buttonText}>Complete Work</Text>
          </TouchableOpacity>
        ) : complain.status === 'DeclinedS' ? (
          <TouchableOpacity
          onPress={assignNewSupervisor}
            activeOpacity={0.8}
            style={[styles.button1, { backgroundColor: '#19AFE2' }]}
          >
            <Text style={styles.buttonText}>Assign Another supervisor</Text>
          </TouchableOpacity>
        ) : null
      }




          <TouchableOpacity
            onPress={handleDecline}
            activeOpacity={0.8}
            style={[styles.button1, { backgroundColor: 'red' }]}
          >
            <Text style={styles.buttonText}>Decline The Work</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#01a9e1',
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#01a9e1',
    textAlign: 'center',
    fontWeight: '700',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  modalSubmitButton: {
    marginTop: 10,
    backgroundColor: '#01a9e1',
  },
  modalCloseButton: {
    marginTop: 10,
    backgroundColor: 'gray',
  },
  twobuttons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  button1: {
    marginTop: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
  },
});

export default AdminFeedback;
