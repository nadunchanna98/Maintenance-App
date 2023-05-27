import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Dimensions,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import ImagePickerModal from 'react-native-image-picker-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';




const MyForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [image, setImage] = useState(null);





  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const [imageUri, setImageUri] = useState(null);
  const handleImageCapture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Camera permission not granted');
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        if (result.assets && result.assets.length > 0) {
          setImageUri(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error); // Handle or log the error as needed
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }
  

  



  const handleSubmit = () => {
    // Perform form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Selected Option:', selectedOption);
    console.log('Selected Image:', image);
  };

  const windowHeight = Dimensions.get('window').height;
  const headerTextFontSize=windowHeight*0.03;
  const formTextFontSize=windowHeight*0.02;

  return (
    
    <View style={styles.container}>
      <View style={[styles.container, { borderColor: 'blue' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontSize: headerTextFontSize }]}>Send Your Complain</Text>
      </View>
      <View style={[styles.formContainer, { height: windowHeight * 0.8 }]}>
      <Text style={[styles.inputTitle,{ fontSize: formTextFontSize }]}>Complain Title</Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={handleNameChange}
            style={styles.input}
          />
        
          <Text style={styles.inputTitle}>Select an option:</Text>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOption(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
        />
     
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Image source={require('../../assets/icon.png')} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Capture Image" onPress={handleImageCapture} />
      
        <Button onPress={openCamera} title="Open camera" />
  
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Capture Image" onPress={handleImageCapture} />
        
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#19AFE2',
    height: '21.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    position: 'relative',
  },
  backButtonContainer: {
    
    position: 'absolute',
    left: 20,
    top: 10,
  },
  backButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  formContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left', 
  },
  input: {
    
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    padding:20,
    
   
  },
};

export default MyForm;
