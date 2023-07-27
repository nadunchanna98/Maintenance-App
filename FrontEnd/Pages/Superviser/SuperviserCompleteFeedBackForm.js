import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../../src/Common/BaseURL';

const SuperviserCompleteFeedBackForm = () => {
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

  const updateComplain = ({ status, complainID }) => {
    axios
      .put(`${BASE_URL}complains/complain/${complainID}`, {
        status: status,
        supervisor_feedback: feedback,
        resolved_date: Date.now()
      })
      .then((response) => {

        if ( status === 'CompletedS') {
          
        Alert.alert(
          'Work Completed!',
          'Good Job!',
          [{ text: 'OK', onPress: () => navigation.navigate('SupervisorDashboard') }],
          { cancelable: false }
        );
        }
        else {
          Alert.alert(
            'Work Declined!',
            'Feedback submitted successfully!',
            [{ text: 'OK', onPress: () => navigation.navigate('SupervisorDashboard') }],
            { cancelable: false }
          );
        }
      })

  };

  const handleComplete = () => {
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
      updateComplain({ status: 'CompletedS', complainID: complain._id });
    } else {
      updateComplain({ status: 'DeclinedS', complainID: complain._id });
    }

    toggleModal();
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
                Submit Feedback
              </Button>
              <Button onPress={toggleModal} mode='contained' style={styles.modalCloseButton}>
                Go back
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.twobuttons}>
        <TouchableOpacity
          onPress={handleComplete}
          activeOpacity={0.8}
          style={[styles.button1, { backgroundColor: '#01a9e1' }]}
        >
          <Text style={styles.buttonText}>Complete Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDecline}
          activeOpacity={0.8}
          style={[styles.button1, { backgroundColor: 'red' }]}
        >
          <Text style={styles.buttonText}>Decline The Work</Text>
        </TouchableOpacity>
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
    width: Dimensions.get('window').width * 0.8,
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
});

export default SuperviserCompleteFeedBackForm;
