import React from 'react'

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
    <div>ComplainForm</div>
  )
}

export default ComplainForm