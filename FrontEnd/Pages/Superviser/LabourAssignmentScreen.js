import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';

const LaborerAssignmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const complainID = route.params.complainID;
  console.log('----------------------', complainID);
  const [availableLaborers, setAvailableLaborers] = useState([]);
  const [selectedLaborers, setSelectedLaborers] = useState([]);
  const [selectedLaborerDetails, setSelectedLaborerDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mobile_no, setMobileNo] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLaborerNames, setSelectedLaborerNames] = useState([]);

  useEffect(() => {
    // Fetch available laborers from the API endpoint
    axios
      .get(`${BASE_URL}users/labours/list`)
      .then((response) => {
        // Assuming the laborers' data is an array of objects like [{_id, name, email, ...}, ...]
        // Extracting only the "name" property from each laborer object
        const laborerNames = response.data.map((laborer) => [
          laborer.name,
          laborer._id,
        ]);
        setAvailableLaborers(laborerNames);
      })
      .catch((error) => {
        console.log('Error fetching laborers:', error);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = 150;

  const handleAssignLaborer = (laborer) => {
    if (!selectedLaborers.includes(laborer)) {
      setSelectedLaborers((prevState) => [...prevState, laborer]);
    }
  };

  const handleRemoveLaborer = (laborer) => {
    setSelectedLaborers((prevState) =>
      prevState.filter((selected) => selected !== laborer)
    );
  };

  const makeCall = () => {
    // Use link to make a call
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${mobile_no}`);
    } else {
      Linking.openURL(`telprompt:${mobile_no}`);
    }
  };

  const handleUpdateSelectedLaborersStatus = () => {
    // Collect the IDs of all selected laborers
    const laborerIds = selectedLaborers.map((laborer) => laborer[1]);
    console.log('Laborer Ids: ', laborerIds);
    console.log('Complain ID: ', complainID);

    // Make a single PUT request to update the status of all selected laborers
    axios
      .put(`${BASE_URL}complains/batchUpdate`, { laborerIds, complainID })
      .then((response) => {
        // Handle successful update if needed
      })
      .catch((error) => {
        console.log('Error updating selected laborers status:', error);
      });
  };

  const handleSubmit = () => {
    if (selectedLaborers.length === 0) {
      // Show an alert message if no laborers are selected
      Alert.alert('Please Select Laborers', 'You need to select at least one laborer.');
    } else {
      // Get the names of selected laborers
      const selectedLaborerNames = selectedLaborers.map((laborer) => laborer[0]);
      setShowPopup(true);
      setSelectedLaborerNames(selectedLaborerNames);
    }
  };

  const handleConfirm = () => {
    handleUpdateSelectedLaborersStatus();
    navigation.navigate('SupervisorDashboard');
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleViewDetails = (laborer) => {
    // Fetch laborer details from the API endpoint based on the selected laborer
    axios
      .get(`${BASE_URL}users/labour/${laborer[1]}`)
      .then((response) => {
        setSelectedLaborerDetails(response.data);
        setMobileNo(response.data.mobile_no);
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.log('Error fetching laborer details:', error);
      });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderAvailableLaborerRow = ({ item }) => {
    const isSelected = selectedLaborers.includes(item);
    const isAssigned = isSelected && selectedLaborers.length > 0;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.availableLaborerRow}>
        <TouchableOpacity onPress={() => handleViewDetails(item)} style={styles.laborViewContainer}>
          <Text style={styles.availableLaborerName}>{item[0]}</Text>
        </TouchableOpacity>

        {!isSelected && (
          <TouchableOpacity
            onPress={() => handleAssignLaborer(item)}
            style={[styles.button, styles.assignButton]}
          >
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        )}
        {isSelected && (
          <TouchableOpacity
            onPress={() => handleRemoveLaborer(item)}
            style={[styles.button, styles.assignButton, styles.assignedButton]}
          >
            <Text style={styles.buttonText}>Selected</Text>
          </TouchableOpacity>
        )}
      </View>
      </ScrollView>
    );
    
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={availableLaborers}
        renderItem={renderAvailableLaborerRow}
        keyExtractor={(item) => item[1]}
        contentContainerStyle={styles.availableLaborersList}
        horizontal={false}
      />

      <View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.assignButtonText}>Assign laborers</Text>
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
          {isModalVisible && (
            <TouchableOpacity onPress={makeCall} style={styles.callButton}>
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {showPopup && (
        <Modal visible={showPopup} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.overlay} />

            <View style={[styles.popupContainer]}>
              <Text style={styles.popupText}>
                Are you sure you want to assign the complaint to the following laborers?
              </Text>
              <Text style={styles.selectedLaborerNames}>{selectedLaborerNames.join(', ')}</Text>
              <View style={styles.popupButtonContainer}>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={[styles.popupButton, styles.confirmButton]}
                >
                  <Text style={styles.popupButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={[styles.popupButton, styles.cancelButton]}
                >
                  <Text style={styles.popupButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ratio = windowWidth / 425;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * ratio,
  },
  heading: {
    fontSize: 20 * ratio,
    fontWeight: 'bold',
    marginBottom: 10 * ratio,
  },
  availableLaborersList: {
    paddingBottom: 20 * ratio,
  },
  availableLaborerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  availableLaborerName: {
    fontSize: 20 * ratio,
    color: '#fff',
  },
  laborViewContainer: {
    flex: 1,
    marginTop: 20 * ratio,
    height: 60 * ratio,
    justifyContent: 'center',
    paddingVertical: 10 * ratio,
    paddingHorizontal: 20 * ratio,
    backgroundColor: '#01a9e1',
    borderRadius: 5 * ratio,
  },
  assignButton: {
    backgroundColor: 'gray',
    width: 100 * ratio,
    height: 60 * ratio,
    marginTop: 20 * ratio,
    paddingVertical: 10 * ratio,
    paddingHorizontal: 20 * ratio,
    borderRadius: 5 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignedButton: {
    backgroundColor: '#007BFF',
  },
  submitButton: {
    position: 'absolute',
    height: 50 * ratio,
    width: 350 * ratio,
    left: 20 * ratio,
    bottom: ratio,
    backgroundColor: '#007BFF',
    borderRadius: 10 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 25 * ratio,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 10 * ratio,
    paddingVertical: 5 * ratio,
    borderRadius: 5 * ratio,
    marginLeft: 10 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18 * ratio,
  },
  modalContainer: {
    flexGrow: 1,
    padding: 20 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 24 * ratio,
    fontWeight: 'bold',
    marginBottom: 10 * ratio,
  },
  closeButton: {
    marginTop: 20 * ratio,
    backgroundColor: '#007BFF',
    paddingVertical: 10 * ratio,
    paddingHorizontal: 20 * ratio,
    borderRadius: 5 * ratio,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  callButton: {
    marginTop: 10 * ratio,
    backgroundColor: '#007BFF',
    paddingVertical: 10 * ratio,
    paddingHorizontal: 20 * ratio,
    borderRadius: 5 * ratio,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  popupContainer: {
    width: 380 * ratio,
    height: 380 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20 * ratio,
    padding: 20 * ratio,
  },
  popupText: {
    fontSize: 30 * ratio,
    fontWeight: 'bold',
    marginBottom: 20 * ratio,
    color: '#000',
    textAlign: 'center',
  },
  selectedLaborerNames: {
    fontSize: 25 * ratio,
    marginBottom: 20 * ratio,
    color: '#000',
    textAlign: 'center',
    color: '',
  },
  popupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20 * ratio,
  },
  popupButton: {
    flex: 1,
    paddingHorizontal: 20 * ratio,
    paddingVertical: 10 * ratio,
    borderRadius: 5 * ratio,
    marginHorizontal: 10 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#01a9e1',
    height: 50 * ratio,
  },
  cancelButton: {
    backgroundColor: 'gray',
    height: 50 * ratio,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 20 * ratio,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LaborerAssignmentScreen;
