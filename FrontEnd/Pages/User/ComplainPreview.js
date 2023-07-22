import React, { useContext, useState } from 'react';
import { View, Alert, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions , ActivityIndicator } from 'react-native';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import { firebase } from '../../src/Common/config';

const Slideshow = ({ images }) => {

  // console.log('inside of slider', images);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentIndex(Math.round(currentIndex));
  };

  return (
    <View style={styles.slideshowContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSlide}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.slideshowImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const ComplainPreview = ({ route }) => {

  const navigation = useNavigation();
  const { title, location,subLocation, description, selectedImages } = route.params;

  const imageUri = selectedImages[0];

  const { userInfo } = useContext(AuthContext);
  const currentDate = moment().format('MMMM DD, YYYY');
  const currentTime = moment().format('hh:mm A');
  const [showScaledImage, setShowScaledImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadImageToFirebase = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);
      const uploadTask = ref.put(blob);
  
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            try {
              await uploadTask;
              const url = await ref.getDownloadURL();
              resolve(url);
            } catch (error) {
              console.log("Error getting download URL:", error);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.log("Error uploading image:", error);
      throw error;
    }
  };
  
  const uploadImagesToFirebase = async (imageUris) => {
    try {
      const uploadedUrls = await Promise.all(imageUris.map(uploadImageToFirebase));
      return uploadedUrls;
    } catch (error) {
      console.log("Error uploading images:", error);
      throw error;
    }
  };
  
  const handleDataSubmission = async () => {
    console.log('Data submitted:', {
      userID: userInfo.userId,
      title,
      location,
      subLocation,
      description,
      status: 'Pending',
    });
  
    try {
      setLoading(true);
      const firebaseLinks = await uploadImagesToFirebase(selectedImages);
      console.log('Firebase links:', firebaseLinks);
  
      // API call to submit data
      await axios.post(`${BASE_URL}complains/add`, {
        userID: userInfo.userId,
        title,
        location,
        subLocation,
        description,
        status: 'Pending',
        complaineImages: firebaseLinks,
      });
  
      Alert.alert('Complain Submitted Successfully');
      navigation.navigate('UserDashboard');
    } catch (error) {
      console.log('Error during data submission:', error);
      Alert.alert('Error submitting complain');
    }
    finally {
      setLoading(false);
    }
  };
  

  const handleEditData = () => {
    navigation.navigate('ComplainForm', {
      title,
      location,
      subLocation,
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


        
        <View style={styles.imageContainer}>
          {selectedImages.length > 0 ? (
            <Slideshow images={selectedImages} />
          ) : (
            <Image
              source={require('../../assets/icon.png')}
              style={styles.image}
            />
          )}
        </View>






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
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>sub Location:</Text>
            <Text style={styles.fieldValue}>{subLocation}</Text>
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


        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View> )}
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
  imageContainer: {
    marginBottom: Dimensions.get('window').height * 0.05,
    marginTop: Dimensions.get('window').height * 0.05,
  },
  placeholderImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  imageStyle: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
  },
  slideshowImage: {
    width: width * 0.9,
    height: width * 0.5,

  },
  slideshowContainer: {
    width: width * 0.9,
    height: width * 0.5,
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ComplainPreview;
