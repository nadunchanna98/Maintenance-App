import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal ,Linking,Alert} from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';





const LaborerAssignmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const  complainID  = route.params.complainID;
  console.log("----------------------",complainID);
  const [availableLaborers, setAvailableLaborers] = useState([]);
  const [selectedLaborers, setSelectedLaborers] = useState([]);
  const [selectedLaborerDetails, setSelectedLaborerDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[mobile_no,setMobileNo]=useState('');
  //get commplaint id from the previous screen
  

  useEffect(() => {
    // Fetch available laborers from the API endpoint
    axios.get(`${BASE_URL}users/labours/list`)
      .then(response => {
        // Assuming the laborers' data is an array of objects like [{_id, name, email, ...}, ...]
        // Extracting only the "name" property from each laborer object
        const laborerNames = response.data.map(laborer => [laborer.name, laborer._id]);
        setAvailableLaborers(laborerNames);
        
      })
      .catch(error => {
        console.log('Error fetching laborers:', error);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = 150; 

  

  const handleAssignLaborer = (laborer) => {
    if (!selectedLaborers.includes(laborer)) {
      setSelectedLaborers(prevState => [...prevState, laborer]);
    }
  };
  const handleRemoveLaborer = (laborer) => {
    setSelectedLaborers(prevState => prevState.filter(selected => selected !== laborer));
  };
  const makeCall = () => {
    //use link to make a call
    if(Platform.OS === 'android'){
    Linking.openURL(`tel:${mobile_no}`);
    }else{
    Linking.openURL(`telprompt:${mobile_no}`);
    }

  }
  const handleUpdateSelectedLaborersStatus = (newStatus) => {
    // Collect the IDs of all selected laborers
    const laborerIds = selectedLaborers.map(laborer => laborer[1]);
    console.log("Laborer Ids: ",laborerIds);
    console.log("Complain ID: ",complainID);    

    // Make a single PUT request to update the status of all selected laborers
    axios.put(`${BASE_URL}complains/batchUpdate` ,{ laborerIds, complainID })
      .then(response => {
        // Handle successful update if needed
      })
      .catch(error => {
        console.log('Error updating selected laborers status:', error);
      });
  };


  const handleSubmit=()=>{
    Alert.alert(
        'Assign Complaint',
        'Are you sure you want to assign this complaint?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              handleUpdateSelectedLaborersStatus();
              navigation.navigate('SupervisorDashboard');
            },
          },
        ],
        { cancelable: true }
      );
    
    //navigate to dashboard
    console.log("HAndle Submit");



  }

  const handleViewDetails = (laborer) => {
    
    // Fetch laborer details from the API endpoint based on the selected laborer
    axios.get(`${BASE_URL}users/labour/${laborer[1]}`)
      .then(response => {
        setSelectedLaborerDetails(response.data);
        setMobileNo(response.data.mobile_no);
        setIsModalVisible(true);
      })
      .catch(error => {
        console.log('Error fetching laborer details:', error);
      });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderAvailableLaborerRow = ({ item }) => {
    const isSelected = selectedLaborers.includes(item);
    return (
      <View style={styles.availableLaborerRow}>
        <Text style={styles.availableLaborerName}>{item[0]}</Text>
        <View style={styles.buttonContainer}>
          {!isSelected && (
            <TouchableOpacity
              onPress={() => handleAssignLaborer(item)}
              style={[styles.button, styles.assignButton]}
            >
              <Text style={styles.buttonText}>Assign</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleViewDetails(item)} style={[styles.button, styles.viewButton]}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Laborers</Text>
      <FlatList
        data={availableLaborers}
        renderItem={renderAvailableLaborerRow}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.availableLaborersList}
        horizontal={false}
      />

      <Text style={styles.heading}>Selected Laborers</Text>
      <View style={styles.box}>
        {selectedLaborers.map((laborer, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveLaborer(laborer)}>
            <View style={styles.selectedLaborer}>
              <Text>{laborer}</Text>
              <TouchableOpacity onPress={() => handleRemoveLaborer(laborer)} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
      </View>
      <View>
     <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
     <Text style={styles.closeButtonText}>Assign</Text>
   </TouchableOpacity>
   </View>

      
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {selectedLaborerDetails ? (
            <>
              <Text style={styles.modalHeading}>{selectedLaborerDetails.name}</Text>
              <Text>Email: {selectedLaborerDetails.email}</Text>
              <Text>Mobile: {selectedLaborerDetails.mobile_no}</Text>
              {/* Add more laborer details as needed */}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          {isModalVisible&&<TouchableOpacity onPress={makeCall} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Call</Text>
          </TouchableOpacity>}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  availableLaborersList: {
    paddingBottom: 20,
  },
  availableLaborerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  availableLaborerName: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButton: {
    backgroundColor: '#4CAF50',
  },
  viewButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedLaborer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LaborerAssignmentScreen;
