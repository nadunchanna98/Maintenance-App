import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text,ScrollView, Dimensions,Image,Modal,SafeView,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';





const MyForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Nipun Harsha');
  const[title,setTitle]=useState('');
  const[location,setLocation]=useState('FOE');
  const [description,setDescription]=useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);




  const handleTitleChange=(text)=>{
    setTitle(text);
    setTitleError(false);
  };
  const handleDescriptionChange=(text)=>{
    setDescription(text);
    setDescriptionError(false);
  };
  const handleOptionChange = (option) => {
    setLocation(option);
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
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.uri) {
      setImageUri(pickerResult.uri);
    }
  };

  const handleTakePhoto = async () => {
    setModalVisible(false);

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
  };


  const handleSubmit = () => {
    let isFormValid = true;

  
  if (!title) {
    setTitleError(true);
    isFormValid = false;
  }

  if (!description) {
    setDescriptionError(true);
    isFormValid = false;
  }


  if (isFormValid) {
   
    console.log('Title:', title);
    console.log('Location:', location);
    console.log('Selected Image:', imageUri);
    navigation.navigate('ComplainPreview', { title, location, description, imageUri, name });
  } else {
    console.log('Please fill in all required fields.');
  }
  };

  const windowHeight = Dimensions.get('window').height;
  const formTextFontSize=windowHeight*0.02;

  return (
    <ScrollView>
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={[styles.inputTitle,{ fontSize: formTextFontSize }]}>Complain Title</Text>
          <TextInput
            placeholder="Enter The Title"
            value={title}
            onChangeText={handleTitleChange}
            style={[styles.input, titleError && styles.errorInput]}
          />
        
          <Text style={[styles.inputTitle,{ fontSize: formTextFontSize }]}>Location</Text>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue, itemIndex) =>
              handleOptionChange(itemValue)
            }
            style={styles.picker}>
            <Picker.Item label="Faculty Of Engineering" value="FOE" />
            <Picker.Item label="Faculty Of Technology" value="FOT" />
            <Picker.Item label="Faculty Of Agriculture" value="FOA" />
            <Picker.Item label="Boys Hostel" value="BH" />
            <Picker.Item label="GirlsHostel" value="GH" />
          </Picker>
          <Text style={[styles.inputTitle,{ fontSize: formTextFontSize }]}>Description</Text>
          <TextInput
            placeholder="Enter The description"
            value={description}
            onChangeText={handleDescriptionChange}
            style={[styles.inputDescription, descriptionError && styles.errorInput]}
          />
        <Text style={[styles.inputTitle,{ fontSize: formTextFontSize }]}>Add a photo</Text>
        <View>
        <TouchableOpacity onPress={handleAddPhoto}>
          
          {imageUri ? (
            <Image
            source={{ uri: imageUri }}
            style={{  height: 500 ,padding:10}} // Adjust the width and height as needed
          />
          ) : (
            <Image source={require('../../assets/icon.png')}
            style={{  height: 500,padding:10 }} />
          )}
        </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
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
    </View>
    
    </SafeAreaView>
  </ScrollView>

  );
};

const styles =StyleSheet.create( {
  container: {
    flex: 1,
    padding: 8,
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
  button: {
    borderRadius: 30,
    backgroundColor: '#19AFE2',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    width: 400,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    padding:25 
  },
  input: {
    
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    padding:20,
    
   
  },
  picker:{
    backgroundColor: '#98E2FB'
  },
  inputDescription: {
    
      height: 240, 
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingTop: 10,
      fontSize: 16,
      backgroundColor: '#98E2FB',
      textAlignVertical: 'top'
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
    marginTop: 10,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
  }

});

export default MyForm;
