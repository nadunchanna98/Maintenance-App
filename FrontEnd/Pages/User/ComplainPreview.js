import React, { useContext, useState } from 'react';
import { View, Alert, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import moment from 'moment';

const ComplainPreview = ({ route }) => {
  const navigation = useNavigation();
  const { title, location, description, imageUri } = route.params;
  const { userInfo } = useContext(AuthContext);
  const currentDate = moment().format('MMMM DD, YYYY');
  const currentTime = moment().format('hh:mm A');
  const [showScaledImage, setShowScaledImage] = useState(false);

  const handleDataSubmission = () => {
    console.log('Data submitted:', {
      userID: userInfo.userId,
      title,
      location,
      description,
      status: 'Pending',
      imageUri,
    });

    // console.log('Data submitted:', userInfo.userId );  


    // API call to submit data
    axios.post(`${BASE_URL}complains/add`, {
      userID: userInfo.userId,
      title,
      location,
      description,
      status: 'Pending',
      imageUri,
    })
      .then((res) => {
        Alert.alert('Complain Submitted Successfully');
        // navigation.navigate('ViewComplain', { complainId: res.data._id });
        navigation.navigate('UserDashboard');
      }
      )
      .catch((err) => {
        console.log(`get users error : ${err}`);
        //  Alert.alert('Complain Submission Failed');
      }
      );


  };
  const handleEditData = () => {
    navigation.navigate('ComplainForm', {
      title,
      location,
      description,
      imageUri,
    });
  };

  const handleImagePress = () => {
    setShowScaledImage(true);
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.dataContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Complainer Name:</Text>
            <Text style={styles.fieldValue}>{userInfo.name}</Text>
          </View>

          <View style={styles.bottomLine} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Date:</Text>
            <Text style={styles.fieldValue}>{currentDate}</Text>
          </View>

          <View style={styles.bottomLine} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Time:</Text>
            <Text style={styles.fieldValue}>{currentTime}</Text>
          </View>

          <View style={styles.bottomLine} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Title:</Text>
            <Text style={styles.fieldValue}>{title}</Text>
          </View>

          <View style={styles.bottomLine} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Location:</Text>
            <Text style={styles.fieldValue}>{location}</Text>
          </View>

          <View style={styles.bottomLine} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Description:</Text>
          </View>
          <Text style={styles.fieldValue}>{description}</Text>
          <View style={styles.bottomLine} />

        </View>        
      </ScrollView>

      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEditData}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>

      {imageUri && showScaledImage && (
        <TouchableOpacity style={styles.scaledImageContainer} onPress={() => setShowScaledImage(false)}>
          <Image source={{ uri: imageUri }} style={styles.scaledImage} />
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
    marginBottom: 30 * windowRatio,
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
    flex: 1,
    marginHorizontal: 20 * windowRatio,
    marginBottom: 20 * windowRatio,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ComplainPreview;
