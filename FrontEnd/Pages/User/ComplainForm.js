import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Modal, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'

const { width, height } = Dimensions.get('window');
const titleTextSize = Math.round(height * 0.03);
const contentTextSize = Math.round(height * 0.015);

import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../src/Common/config';


const validationSchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  title: Yup.string().required('Title is required'),

});

const Slideshow = ({ images }) => {


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

const ComplainForm = () => {


  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);




  const handleFormSubmit = (values) => {

    const { location, subLocation, description, title } = values;

    console.log('selectedImages', selectedImages);

    navigation.navigate('ComplainPreview', { title, location, subLocation, description, selectedImages });
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    setModalVisible(true);
  };



  const handleChooseFromLibrary = async () => {
    setModalVisible(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedAssets = result.assets;
        const imageUris = selectedAssets.map((asset) => asset.uri);
        setSelectedImages(imageUris);
      }
    } catch (error) {
      console.log('Error selecting images:', error);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.getCameraPermissionsAsync();
    setModalVisible(false);

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your camera!");
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        // Handle permission denial
        return;
      }
    }

    try {
      const pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const selectedAsset = pickerResult.assets[0];
        const imageUri = selectedAsset.uri;
        setSelectedImages((prevImages) => [...prevImages, imageUri]);
        setImageUri(imageUri);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };



  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.lowerSection}>
          <Formik
            initialValues={{ location: '', subLocation: '', title: '', description: '', image: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View >
                  {/* <View style={styles.header}>
                    <Text style={styles.title}>Complain Form</Text>
                  </View> */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldText}>Complain Title</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Complain Title"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                    />
                    {errors.title && touched.title && (<Text style={{ color: 'red' }}>{errors.title}</Text>)}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.fieldText}>Location</Text>
                  <SelectList
                    setSelected={handleChange('location')}
                    data={[
                      { key: '1', value: 'Faculty Of Engineering' },
                      { key: '2', value: 'Faculty Of Technology' },
                      { key: '3', value: 'Faculty Of Agriculture' },
                      { key: '4', value: 'Boys Hostel' },
                      { key: '5', value: 'Girls Hostel' },
                    ]}
                    save="value"
                    defaultOption={{ key: '1', value: 'Faculty Of Engineering' }}
                    search={false}
                  />
                  {errors.location && touched.location && (
                    <Text style={styles.error}>{errors.location}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.fieldText}>Sub Location</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Computer Department,Lab 1"
                    onChangeText={handleChange('subLocation')}
                    onBlur={handleBlur('subLocation')}
                    value={values.subLocation}
                  />
                  {errors.subLocation && touched.subLocation && (<Text style={{ color: 'red' }}>{errors.subLocation}</Text>)}
                </View>

                <View>
                  <View >
                    <Text style={styles.fieldText}>Description</Text>
                    <TextInput
                      style={styles.textarea}
                      placeholder="Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {errors.description && touched.description && (
                      <Text style={{ color: 'red' }}>{errors.description}</Text>
                    )}
                  </View>



                  <Text style={styles.fieldText}>Image</Text>

                  <TouchableOpacity style={styles.button} onPress={handleAddPhoto}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </TouchableOpacity>

                  <View style={styles.imageContainer}>
                    {selectedImages.length > 0 ? (
                      <Slideshow images={selectedImages} />
                    ) : (
                      <Image
                        source={require('../../assets/icon.png')}
                        style={styles.placeholderImage}
                      />
                    )}
                  </View>
                </View>


                <Modal visible={modalVisible} animationType="slide" transparent>
                  <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => handleChooseFromLibrary()}>
                      <Text>Upload Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={() => handleTakePhoto()}>
                      <Text>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01a9e1',
  },

  lowerSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.1,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    marginTop: -height * 0.1,
  },

  // header: {
  //   backgroundColor: '#01a9e1',
  //   paddingVertical: 40,
  //   alignItems: 'center',
  //   marginBottom: 40,

  // },
  title: {
    color: '#fff',
    fontSize: titleTextSize,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: height * 0.015,
  },
  fieldText: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    paddingVertical: width * 0.03,
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
  button: {
    backgroundColor: '#01a9e1',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  optionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  imageStyle: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
  },
  slideshowContainer: {
    width: width * 0.9,
    height: width * 0.5,
    alignSelf: 'center',
  },
  slideshowImage: {
    width: width * 0.9,
    height: width * 0.5,
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
  activeDot: {
    backgroundColor: '#000',
  },
  imageContainer: {
    marginBottom: height * 0.02,
  },
  placeholderImage: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

});

export default ComplainForm;
