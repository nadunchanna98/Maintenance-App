import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const ViewComplain = () => {
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
        const formattedTime = moment(response.data.created_date).format('hh:mm A');
        const formattedDate = moment(response.data.created_date).format('MMMM DD, YYYY');
        setCreatedTime(formattedTime);
        setCreatedDate(formattedDate);
        setVisible(response.data.status === 'AssignedA');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowRatio = windowWidth / 425;

  const handleImagePress = () => {
    setShowScaledImage(true);
  };

  let rate = 3;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.dataContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Title:</Text>
            <Text style={styles.fieldValue}>{complain.title}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Created Date:</Text>
            <Text style={styles.fieldValue}>{createdDate}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Created Time:</Text>
            <Text style={styles.fieldValue}>{createdTime}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Location:</Text>
            <Text style={styles.fieldValue}>{complain.location}</Text>
          </View>
          <View style={styles.bottomLine} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Description:</Text>
          </View>
          <Text style={styles.fieldValue}>{complain.description}</Text>
          <View style={styles.bottomLine} />

          {userInfo.role === 'admin' && !(complain.status === 'AssignedA') && (
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Assigned:</Text>
              <Text style={styles.fieldValue}>{complain.supervisorID}</Text>
            </View>
          )}

          {userInfo.role === 'admin' && !(complain.status === 'AssignedA') && <View style={styles.bottomLine} />}

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Status:</Text>
            <Text style={styles.fieldValue}>{complain.status !== 'Completed' ? 'In Progress' : 'Completed'}</Text>
          </View>
          <View style={styles.bottomLine} />
        </View>
        </ScrollView>
        {(userInfo.role === 'admin' && complain.status === 'AssignedS') && (
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
              <Text style={styles.buttonText}>Change the Supervisor</Text>
            </TouchableOpacity>
          </View>
        )}

        {(userInfo.role === 'admin' && complain.status === 'AssignedA') && (
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
              <Text style={styles.buttonText}>Assign A Supervisor</Text>
            </TouchableOpacity>
          </View>
        )}

        {userInfo.role === 'supervisor' && complain.status === 'AssignedL' && (
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCompleteSupervisor}>
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        )}

        {(userInfo.role === 'complainer' && complain.status === 'CompletedA') ? (
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
              <Text style={styles.buttonText}>Rate the Complaint</Text>
            </TouchableOpacity>
          </View>
        ) : (userInfo.role === 'complainer' && complain.status === 'Completed') && (
          <View style={styles.dataContainer}>
            <Text style={styles.buttonText}>View My Rating</Text>
            {rate === 3 ? <Text>1</Text> : <Text>2</Text>}
          </View>
        )}
      

      {showScaledImage && (
        <TouchableOpacity style={styles.scaledImageContainer} onPress={() => setShowScaledImage(false)}>
          <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.scaledImage} />
        </TouchableOpacity>
      )}
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
});

export default ViewComplain;
