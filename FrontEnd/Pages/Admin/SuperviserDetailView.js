import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Platform,Linking ,TouchableOpacity} from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SuperviserDetailView = () => {

    const navigation = useNavigation();
    const route = useRoute();
    [mobile_no,setMobileNo]=useState();
    const userId = route.params.userId;
    const complainId=route.params.complainId;
    const { userInfo } = useContext(AuthContext);

    console.log("userId", userId);
  
    const [pendingUser, setPendingUser] = useState([]);
    const makeCall=()=>{
     
      console.log({mobile_no});
      if(Platform.OS=='android'){
        
        Linking.openURL("tel: "+String({mobile_no}));
      }
      else{
        
        Linking.openURL("telprompt: "+{mobile_no});
      }
    }
  
    useEffect(() => {
      getUserDetail();
    }, []);
    const visible = complainId !== null;
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
  
    if (pendingUser.length === 0) {
      return <Text>Loading...</Text>;
    }
  
    return (
        <View style={styles.container}>
        
          
          <View style={styles.circleContainer}>
          <View style={styles.circle}></View>
          </View>
          
            <View>
              <Text style={styles.nameText}>{pendingUser.user.name}</Text>
              <Text style={styles.joinDate}>Signed on {pendingUser.Data.approved_date}</Text>
            </View>
            <Text style={styles.info}>Informations</Text>



            <View style={styles.DetailsContainer}>
              <View style={styles.detail}>
                  <Ionicons name="person-circle-outline" size={28} color="#A9B5AA" />
                  <Text style={styles.detailText}>{pendingUser.user.name}</Text>
              </View>
              <View style={styles.detail}>
                  <Ionicons name="mail-unread-outline" size={28} color="#A9B5AA" />
                  <Text style={styles.detailText}>{pendingUser.user.email}</Text>
              </View>
              <View style={styles.detail}>
                  <Ionicons name="call-outline" size={28} color="#A9B5AA" />
                  <Text style={styles.detailText}>{pendingUser.user.mobile_no}</Text>
              </View>
              <View style={styles.detail}>
                  <Ionicons name="settings-outline" size={28} color="#A9B5AA" />
                  <Text style={styles.detailText}>{pendingUser.user.role}</Text>
              </View>
              </View>
          <View style={styles.buttonContainer}>
          {visible&&(<TouchableOpacity style={styles.button} onPress={makeCall}>
            <Text style={styles.buttonText}>Assign</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={styles.editButton} onPress={makeCall}>
            <Text style={styles.editButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
       <Text style={styles.info}>In Progress Works</Text>
       

        

        </View>
        
    )
}

const styles = StyleSheet.create({
    
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: windowWidth*0.05,
        },
        topbar: {
          backgroundColor: "#19AFE2",
          width: "100%",
          height: 67,
        },
        text: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginTop:15,
        },
        circleContainer: {
          alignItems: 'center',
        },
        circle: {
          width: windowWidth * 0.25, 
          height: windowWidth * 0.25,
          backgroundColor: '#D9D9D9',
          borderRadius: (windowWidth * 0.25) / 2, 
          marginTop: windowHeight * 0.01, 
          marginBottom: windowHeight * 0.02,
        },
        info: {
          fontSize: 20,
          fontWeight: 'bold',
          paddingTop: windowHeight * 0.02,
          paddingBottom: windowHeight * 0.02,
        },
        
        nameText: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: windowHeight * 0.004,
    
        },
        joinDate: {
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'regular',
          
        },

   
    detailsContainer: {},
    detail: {
      flexDirection: 'row',
      paddingBottom: windowHeight * 0.02,
      paddingLeft: windowWidth * 0.05,

    },
    detailText: {
      fontSize: 16,
      paddingHorizontal: windowWidth * 0.05,
    },

    label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: windowWidth * 0.01,
    marginTop: windowHeight * 0.003, // Adjust the margin as needed
    },
    value: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    },
    image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: windowHeight * 0.02,
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
    button: {
    backgroundColor: '#19AFE2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex:1,
    marginRight: 5,
    },
    buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    },
    editButton: {
    backgroundColor: '#19AFE2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: windowWidth * 0.005,
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