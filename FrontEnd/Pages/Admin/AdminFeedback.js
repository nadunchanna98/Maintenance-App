import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../../src/Common/BaseURL';

const { width } = Dimensions.get('window');

const AdminFeedback = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const complainId = route.params.complainID;


  const [complain, setComplain] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(true);
  const defaultCompletedFeedbacks = ['No Issue', 'Needs improvement', 'Satisfied', 'Great work', 'Good job', 'Took long time to finish'];

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

  const submitFeedback = () => {
    if (completed) {
      // axios to update the status of complain to completed
      axios.put(`${BASE_URL}complains/complain/${complainId}`, {
        status: 'Completed',
        admin_feedback: feedback
      }).then((response) => {
        Alert.alert(
          'Feedback Submitted',
          'Thank you for your feedback!',
          [{ text: 'OK', onPress: () => navigation.navigate('AdminDashboard') }],
          { cancelable: false }
        );
      })
        .catch((error) => {
          console.log('error', error);

        });
    }
    setFeedback('');
  };

  return (
    <View style={styles.container}>

      <View style={styles.feedbackContainer}>
        <Text variant='titleLarge' style={styles.feedbackTitle}>Select a default feedback:</Text>
        <View style={styles.defaultFeedbacks}>
          {
            defaultCompletedFeedbacks.map((item) => (
              <TouchableOpacity key={item} onPress={() => setFeedback(item)}>
                <Text style={styles.feedbackItem}>{item}</Text>
              </TouchableOpacity>
            ))

          }
        </View>
        <TextInput
          placeholder="Enter your own feedback"
          value={feedback}
          onChangeText={setFeedback}
          multiline={true}
          label="Feedback"
          mode='outlined'
          selectionColor='#01a9e1'
          activeOutlineColor='#01a9e1'
          style={styles.textInput}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={() => { navigation.goBack() }} buttonColor='#8c8c8c' textColor='white' mode='contained' style={[styles.button]}>Close</Button>
          <Button onPress={submitFeedback} buttonColor='#01a9e1' textColor='white' mode='contained' style={[styles.button, { borderColor: '#01a9e1' }]} disabled={feedback ? false : true}>Submit Feedback</Button>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
  },
  header: {
    marginBottom: width * 0.04,
  },
  title: {
    fontSize: width * 0.04,
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
    width: width * 0.4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: width * 0.04,
  },
  textInput: {
    marginVertical: width * 0.04,
  },
  feedbackTitle: {
    fontWeight: 'bold',
  },
  feedbackItem: {
    borderColor: '#b5b5b5',
    borderWidth: 1,
    marginBottom: width * 0.02,
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 4,
    marginRight: width * 0.02,
    // width: width * 0.3,
  },
  defaultFeedbacks: {
    marginTop: width * 0.04,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AdminFeedback;
