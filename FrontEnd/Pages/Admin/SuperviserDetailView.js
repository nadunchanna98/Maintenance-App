import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Platform,Linking ,TouchableOpacity} from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const SuperviserDetailView = () => {

    const navigation = useNavigation();
    const route = useRoute();
    [mobile_no,setMobileNo]=useState();
    const userId = route.params.userId;
    const complainId=route.params.complainId;
    const { userInfo } = useContext(AuthContext);

    console.log("userId", userId);
    const visible = complainId !== null;
    const [pendingUser, setPendingUser] = useState([]);
    const[assignedWorks,setAssignedWorks]=useState([]);
    const makeCall=()=>{
     
      console.log({mobile_no});
      if(Platform.OS=='android'){
        
        Linking.openURL(`tel:${mobile_no}`);
      }
      else{
        
        Linking.openURL(`telprompt:${mobile_no}`);
      }
    }
  
    useEffect(() => {
      getUserDetail();
      getAssignedLComplains();
    }, []);
   
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
        try {
          const response = await axios.get(`${BASE_URL}complains/list`, {
            params: {
              id: userInfo.userId,
              status: statusAssignedS,
              role: userInfo.role,
            }
          });
          setAssignedWorks(response.data);
          console.log("Data: ", response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
    
  
    if (pendingUser.length === 0) {
      return <Text>Loading...</Text>;
    }
  
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Supervisor Details</Text>
        </View>
        <View style={styles.dataContainer}>
            <Text style={styles.label}>Supervisor Name:</Text>
            <Text style={styles.value}>{pendingUser.user.name}</Text>
        </View>
        <View style={styles.dataContainer}>
            <Text style={styles.label}> Email:</Text>
            <Text style={styles.value}>{pendingUser.user.email}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}> Mobile No:</Text>
            <Text style={styles.value}>{pendingUser.user.mobile_no}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Work Type:</Text>
            <Text style={styles.value}>{pendingUser.Data.work_type}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Approved Date:</Text>
            <Text style={styles.value}>{pendingUser.Data.approved_date}</Text>
          </View>
         
        <View style={visible ?[styles.buttonContainer,  {justifyContent:'space-evenly'} ] : [styles.buttonContainer,{alignSelf:'center'}]} >
          {visible && (<Button icon={"account-hard-hat"} onPress={makeCall} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Assign
          </Button>)}
         <Button icon={"phone"} onPress={makeCall} buttonColor='#01a9e1' textColor='white' mode='contained' style={styles.button}>Call</Button>
        
        </View>

        

        </View>
        
    )
}

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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    dataContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    
    },
    label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
    marginTop: 3, // Adjust the margin as needed
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
    marginBottom: 20,
    },
    buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,

    
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