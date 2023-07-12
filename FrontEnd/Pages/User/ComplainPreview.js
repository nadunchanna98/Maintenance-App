import React, { useContext } from 'react';
import { View,Alert, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';


const { width, height } = Dimensions.get('window');
const titleTextSize = Math.round(height * 0.03);
const contentTextSize = Math.round(height * 0.015);


const ComplainPreview = ({ route }) => {
    const navigation = useNavigation();
    const { title, location, description, imageUri } = route.params;
    const { userInfo } = useContext(AuthContext);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
  
    const handleDataSubmission = () => {
      console.log('Data submitted:', {
        userID : userInfo.userId,
        title,
        location,
        description,
        status: 'Pending',
        imageUri,
      });

      // console.log('Data submitted:', userInfo.userId );  


      // API call to submit data
        axios.post(`${BASE_URL}complains/add`, {
          userID : userInfo.userId,
          title,
          location,
          description,
          status: 'Pending',
          imageUri,
        })
        .then((res) => {
          Alert.alert('Complain Submitted Successfully');
          navigation.navigate('ViewComplain', { complainId: res.data._id });
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
  
    return (
        <View style={styles.container}>
           <View style={styles.header}>
          <Text style={styles.title}>Complain Details</Text>
        </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Complainer Name:</Text>
            <Text style={styles.value}>{userInfo.name}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{currentDate}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{currentTime}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{title}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{location}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDataSubmission}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEditData}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: '#fff',
            padding: 20,
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
      dataContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        
      },
      label: {
        fontWeight: 'bold',
        fontSize: contentTextSize,
        marginRight: 10,
        marginTop: 3, // Adjust the margin as needed
      },
      value: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: contentTextSize,
      },
      image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        backgroundColor: '#01a9e1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: contentTextSize,
        fontWeight: 'bold',
      },
      editButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
      },
      editButtonText: {
        color: '#000',
        fontSize: contentTextSize,
        fontWeight: 'bold',
      },
     fieldValue: {
        flex: 1,
        flexWrap: 'wrap',
      },
      fieldTitle: {
        fontWeight: 'bold',
        marginRight: 10,
      },
      fieldValue: {
        flex: 1,
        flexWrap: 'wrap',
      },
    });
  
  export default ComplainPreview;
