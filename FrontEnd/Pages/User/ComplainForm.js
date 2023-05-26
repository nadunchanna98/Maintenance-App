import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';



const MyForm = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleImageSelection = () => {
    const options = {
      title: 'Select Image',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button:', response.customButton);
      } else {
        setSelectedImage(response.uri);
      }
    });
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Selected Option:', selectedOption);
    console.log('Selected Image:', selectedImage);
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

        <TouchableOpacity onPress={handleImageSelection} style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Select Image</Text>
          )}
        </TouchableOpacity>
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
