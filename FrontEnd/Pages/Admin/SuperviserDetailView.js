import React, { useState, useEffect, useContext } from 'react';

import { View, Text, StyleSheet, Alert, ScrollView, Platform, Linking,Dimensions} from 'react-native';
import { Button, List } from 'react-native-paper';
import { Ionicons,AntDesign,Fontisto  } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';

import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SuperviserDetailView = () => {

  const navigation = useNavigation();
  const route = useRoute();
  [mobile_no, setMobileNo] = useState();
  const userId = route.params.userId;
  const complainId = route.params.complainId;
  const { userInfo } = useContext(AuthContext);

  // console.log("userId1", userId);

  const visible = complainId !== null;
  const [pendingUser, setPendingUser] = useState([]);
  const [assignedWorks, setAssignedWorks] = useState([]);

  const makeCall = () => {

    console.log({ mobile_no });
    if (Platform.OS == 'android') {

      Linking.openURL(`tel:${mobile_no}`);
    }
    else {

      Linking.openURL(`telprompt:${mobile_no}`);
    }
  }

  useEffect(() => {
    getUserDetail();
    getAssignedLComplains();
  }, []);

  const handleAssignButton =(userID,complainID) =>{

    //console.log("Complain ID: ",complainID);
   // console.log("User ID:",userID);
  
    axios.put(`${BASE_URL}complains/update/${complainID}/${userID}`)
    .then((response) => {
      //console.log(response.data);
      Alert.alert("Complain Assigned Successfully");
      navigation.navigate('AdminDashboard');
    }
    )
    .catch((error) => {
      console.log(error);
    }
    )
    
  }

  const getUserDetail = () => {
    axios
      .get(`${BASE_URL}supervisors/user/${userId}`)
      .then((response) => {
        setPendingUser(response.data);
        setMobileNo(response.data.user.mobile_no)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  const getAssignedLComplains = async () => {

    axios.get(`${BASE_URL}complains/supervisorcomplains/${userId}`)
      .then((response) => {
        setAssignedWorks(response.data.complains);
        // console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

  };



  if (pendingUser.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.profileContainer}>
            <Ionicons name="person" size={windowWidth * 0.18} color="black" />
        </View>

        <View style={styles.dataContainer}>
        <Text style={styles.heading}>{pendingUser.user.name}</Text>
        </View>

        <View style={styles.detail}>
              <Ionicons name="mail-outline" size={24} color="black" />
              <Text style={styles.detailText}>{pendingUser.user.email}</Text>
        </View>

        <View style={styles.detail}>
              <Ionicons name="phone-portrait-outline" size={24} color="black" />
              <Text style={styles.detailText}>{pendingUser.user.mobile_no}</Text>
        </View>

        <View style={styles.detail}>
        <Ionicons name="ios-construct-outline" size={24} color="black" />
              <Text style={styles.detailText}>Work Type: </Text>
              <Text style={styles.detailText}>{pendingUser.Data.work_type}</Text>
              
        </View>
        <View style={styles.detail}>
              <Fontisto name="date" size={24} color="black" />
              <Text style={styles.detailText}>Approved Date: </Text>
              <Text style={styles.detailText}>{moment(pendingUser.Data.approved_date).format('MMMM DD, YYYY')}</Text>
              
        </View>

        
      

      <View style={visible ? [styles.dataContainer, { justifyContent: 'space-evenly' }] : [styles.dataContainer, { alignSelf: 'center' }]} >
        {visible && 
        (
        <Button icon={"account-hard-hat"} 
        onPress={ () => handleAssignButton(userId,complainId)}
        buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Assign</Button>)}
        <Button icon={"phone"} onPress={makeCall} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Call</Button>
 
      </View>

      <View style={styles.assignworktitle}>
        <Text style={styles.assignworktitle}>Assigned Works</Text>

        {assignedWorks.length === 0 ? (
          <Text>No complete complaints</Text>
        ) : (
          <>
            <Text style={styles.assignworktitle}>In Progress:</Text>
            {assignedWorks.map((item) => {
              if (item.status === 'AssignedS' || item.status === 'AssignedL') {
                return (
                  <List.Item
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    left={(props) => <List.Icon {...props} icon="folder" />}
                    onPress={() => navigation.navigate('ViewComplain', { complainId: item._id })}
                  />
                );
              }
            })}

            <Text style={styles.assignworktitle}>Completed:</Text>
            {assignedWorks.map((item) => {
              if (item.status === 'CompletedS' || item.status === 'DeclinedS' || item.status === 'CompletedA' || item.status === 'DeclinedA' || item.status === 'Completed') {
                return (
                  <List.Item
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    left={(props) => <List.Icon {...props} icon="folder" />}
                    onPress={() => navigation.navigate('ViewComplain', { complainId: item._id })}
                  />
                );
              }
            })}
          </>
        )}
      </View>


    </ScrollView>

  )
}

const styles = StyleSheet.create({

  profileContainer: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    backgroundColor: "#FFFFFF",
    borderRadius: 500,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
heading: {
  flex: 1,
  fontWeight: "bold",
  textAlign: 'center', // Aligns the first item to the left
  flexWrap: 'wrap',
  fontSize: 20,
},

container: {
  flexGrow: 1,
  padding: 20,
},
header: {
  backgroundColor: '#01a9e1',
  paddingVertical: 40,
  alignItems: 'center',
  marginBottom: 40,

},
detail: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 15,
  paddingLeft: windowWidth * 0.05,
  borderColor: "#19AFE2",
  borderBottomWidth: 1,
},
subDetail: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  paddingBottom:0.5,
  paddingLeft: windowWidth * 0.05,
  borderColor: "#19AFE2",
  
},
detailText: {
  fontSize: windowWidth * 0.042,
  paddingLeft: windowWidth * 0.06,
},
subDetailText: {
  fontSize: windowWidth * 0.035,
  paddingLeft: windowWidth * 0.03,
  color: 'gray',
},
subDetailTextX: {
  fontSize: windowWidth * 0.035,
  paddingLeft: windowWidth * 0.0005,
  color: 'gray',
},
dataContainer: {
  flexDirection: 'row',
  marginBottom: 10,
  marginTop: 15,

},
  
  button: {
    width: '40%',

  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
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
    fontSize: 20,
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

  assignworktitle:
  {
    flex: 1, marginTop: 10 , marginBottom: 20 ,fontSize: 20
  },



});

export default SuperviserDetailView;



//   user: {
//     _id: new ObjectId("64a719f39206d83b6ac5575a"),
//     name: 'Thisaru Rathnayake',
//     email: 'thisaru@gmail.com',
//     mobile_no: '0999999999',
//     password: '$2b$10$u07oLFAN4ffP4kNYnuws..CRYHA1nToZhkYwfbnaU4QXN6qs9ofKS',
//     role: 'supervisor',
//     accepted: false,
//     complainer_type: 'other',
//     complains: [],
//     __v: 0
//   },
//   pendingData: {
//     _id: new ObjectId("64a719f39206d83b6ac5575b"),
//     userID: new ObjectId("64a719f39206d83b6ac5575a"),
//     work_type: 'irigation',
//     complains: [],
//     approved_date: 2023-07-06T19:45:55.797Z,
//     __v: 0
//   }
// }