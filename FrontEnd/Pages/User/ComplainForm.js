import React, { useState , useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView,Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list'

const { width, height } = Dimensions.get('window');
const titleTextSize = Math.round(height * 0.03);
const contentTextSize = Math.round(height * 0.015);


const validationSchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  title: Yup.string().required('Title is required'),

});

const ComplainForm = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
const [imageUri, setImageUri] = useState(null);
const handleFormSubmit = (values) => {
  const { location, description, title } = values;

  console.log('Location:', location);
  console.log('Description:', description);
  console.log('Title:', title);
  console.log('Image:', imageUri);

  navigation.navigate('ComplainPreview', { title, location, description, imageUri });
};
  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      // Handle permission denial
      return;
    }
  
    setModalVisible(true);
  };
  
  const handleChooseFromLibrary = async () => {
    setModalVisible(false);
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!pickerResult.canceled && pickerResult.uri) {
      setImageUri(pickerResult.uri);
    }
  };
  
  const handleTakePhoto = async () => {
    setModalVisible(false);
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
    if (status !== 'granted') {
      // Handle permission denial
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!pickerResult.canceled && pickerResult.uri) {
      setImageUri(pickerResult.uri);
    }
   
    }
  };

  const handleComplain=async()=>{

    const complainData = new FormData();
    complainData.append('title', title);
    complainData.append('location', location);
    complainData.append('description', description);
    complainData.append('image', {
      name: imageUri.split('/').pop(),
      type: 'image/jpeg',
      uri: imageUri,
    });

    /*try {
      const response = await axios.post(`${BASE_URL}/complain`, complainData);
      console.log(response.data);
      alert('Complain submitted successfully');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }*/
    //navigate to complain preview page
    console.log('Title:', title);
    console.log('Location:', location);
    console.log('Selected Image:', imageUri);
    
    navigation.navigate('ComplainPreview', { title, location, description, imageUri});


  }
  
  
  
    
  
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync();
  
      // Explore the result
      console.log(result);
  
      if (!result.canceled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    }
  
  return (
    <ScrollView>
    <View style={styles.container}>
    
      <View style={styles.lowerSection}>
      <Formik
        initialValues={{ location: '' , title: '', description: '', image: ''}}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          <View >
            <View style={styles.header}>
           <Text style={styles.title}>Complain Form</Text>
           </View>
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
            <View>
            <View >
            <Text style={styles.fieldText}>Description</Text>
             <TextInput
               style={styles.textarea}
               multiline={true}
               numberOfLines={7}
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
        <TouchableOpacity onPress={handleAddPhoto}>
          
          {imageUri ? (
            <Image
            source={{ uri: imageUri }}
            style={{  height: 500 ,padding:10,marginBottom: 20,marginTop: 20}} // Adjust the width and height as needed
          />
          ) : (
            <Image source={require('../../assets/icon.png')}
            style={{  height: 500,padding:10,marginBottom: 20,marginTop: 20 }} />
          )}
        </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleChooseFromLibrary}>
            <Text>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleTakePhoto}>
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
  
header:{
  backgroundColor: '#01a9e1',
  paddingVertical: 40,
  alignItems: 'center',
  marginBottom:40,

    },
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
  fieldText:{
    fontSize: height * 0.02,
    //bold
    fontWeight: 'bold',
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
});

export default ComplainForm;
