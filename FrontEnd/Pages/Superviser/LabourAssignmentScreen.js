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
  Image,
} from 'react-native';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';

const LaborerAssignmentScreen = () => {
  // React hooks and states
  const route = useRoute();
  const navigation = useNavigation();
  const complainID = route.params.complainID;
  const [availableLaborers, setAvailableLaborers] = useState([]);
  const [selectedLaborers, setSelectedLaborers] = useState([]);
  const [selectedLaborerDetails, setSelectedLaborerDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mobile_no, setMobileNo] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLaborerNames, setSelectedLaborerNames] = useState([]);

  // Fetch available laborers from the API endpoint on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}users/labours/list`)
      .then((response) => {
        const laborerNames = response.data.map((laborer) => [laborer.name, laborer._id]);
        setAvailableLaborers(laborerNames);
      })
      .catch((error) => {
        console.log('Error fetching laborers:', error);
      });
  }, []);

  // Dimensions and utility variables
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = 150;

  // Event handlers
  const handleAssignLaborer = (laborer) => {
    if (!selectedLaborers.includes(laborer)) {
      setSelectedLaborers((prevState) => [...prevState, laborer]);
    }
  };

  const handleRemoveLaborer = (laborer) => {
    setSelectedLaborers((prevState) => prevState.filter((selected) => selected !== laborer));
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
    const laborerIds = selectedLaborers.map((laborer) => laborer[1]);
    console.log('Laborer Ids: ', laborerIds);
    console.log('Complain ID: ', complainID);

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
      Alert.alert(
        'Please Select Laborers',
        'You need to select at least one laborer.'
      );
    } else {
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

  // Rendering functions
  const renderAvailableLaborerRow = ({ item }) => {
    const isSelected = selectedLaborers.includes(item);
    const isAssigned = isSelected && selectedLaborers.length > 0;

    return (
      <TouchableOpacity
        onPress={() => handleViewDetails(item)}
        style={styles.laborViewContainer}
      >
        <View style={styles.availableLaborerRow}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3588/3588614.png' }}
            style={styles.laborerImage}
          />
          <Text style={styles.availableLaborerName}>{item[0]}</Text>

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
      </TouchableOpacity>
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
              <Text style={styles.selectedLaborerNames}>
                {selectedLaborerNames.join(', ')}
              </Text>
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

      {/* Move the labor containers above the "Assign Laborers" button */}
      <View style={styles.laborContainers}>
        {/* Render selected laborer names or other laborer details here */}
      </View>

      <View style={styles.assignButtonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.assignButtonText}>Assign laborers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const ratio = windowWidth / 425;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 * ratio,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  laborerImage: {
    width: 35 * ratio,
    height: 35 * ratio,
    marginRight: 15 * ratio,
    marginLeft: -10 * ratio,
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
  },
  availableLaborerName: {
    fontSize: 20 * ratio,
    color: '#fff',
  },
  laborViewContainer: {
    flex: 1,
    marginTop: 15 * ratio,
    height: 60 * ratio,
    justifyContent: 'center',
    paddingVertical: 10 * ratio,
    paddingHorizontal: 20 * ratio,
    backgroundColor: '#01a9e1',
    borderRadius: 15 * ratio,
  },
  assignButton: {
    backgroundColor: 'gray',
    marginLeft: 'auto',
    width: 100 * ratio,
    height: 45 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20 * ratio,
    marginRight: -10 * ratio,
  },
  assignedButton: {
    backgroundColor: 'green',
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
  laborContainers: {
    // Add styles for labor containers if needed
  },
});

export default LaborerAssignmentScreen;
