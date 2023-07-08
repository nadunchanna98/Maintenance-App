import React, { useState , useEffect , useContext } from 'react';
import { View, Text, StyleSheet, Image , ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL  from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation , useRoute  } from '@react-navigation/native';

const PendingList = () => {

    const { userInfo } = useContext(AuthContext);
    const { allusers } = useContext(UserContext);
    
    const navigation = useNavigation();
    const route = useRoute();
    const PendingType = route.params.PendingType;
    console.log("PendingType",PendingType);

const [activeSections, setActiveSections] = useState([]);
const [data , setData] = useState([]);
const theme = useTheme();

  useEffect(() => {
    getListOfPending();
  }, []);

  const getListOfPending = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/pending/list`, {
        params: {
            PendingType : PendingType,
        }
      });
      setData(response.data);
      console.log(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  

  const renderHeader = (section, index, isActive) => (
    <List.Item
      title={section.user.name}
      description={section.pendingUser.work_type}
      style={isActive ? styles.activeHeader : styles.inactiveHeader}
      left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
      right={() => (
        <Button
          icon="arrow-right"
          mode="outlined"
          onPress={() => navigation.navigate('PendingUserDetailView', { userId: section.user._id}) }
          borderColor = '#01a9e1'
          color='#f08e25'
          labelStyle={{ color: "#01a9e1", fontSize: 15 }}
          style={[styles.button, { borderColor: theme.colors.primary }]} // Use theme colors for border color
        >
          View
        </Button>
      )}
    />
  );

  const renderContent = (section, index, isActive) => (
    <View style={styles.content}>
      <Text style={styles.description}>name : {section.user.name}</Text>
      <Text style={styles.description}>Work type: {section.pendingUser.work_type}</Text>
    </View>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <ScrollView> 
    <View>
      <List.Section>
        <List.Subheader>New users List</List.Subheader>  
        <Accordion
          sections={data}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          underlayColor="transparent"
        />
      </List.Section>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activeHeader: {
    backgroundColor: '#F5F5F5',
  },
  inactiveHeader: {
    backgroundColor: 'white',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});

export default PendingList;




// {
//     user: {
//       _id: new ObjectId("64a71a8bded55e1b353879a8"),
//       name: 'Thisaru Rathnayake',
//       email: 'thisaru@gmail.com',
//       mobile_no: '0999999998',
//       password: '$2b$10$Nd9GfVAMAiX69wYhvU.1ceu7Hl2aAOWMI4xiOJlV2Rdm4Zap8pqMK',
//       role: 'supervisor',
//       accepted: false,
//       complainer_type: 'other',
//       complains: [],
//       __v: 0
//     },
//     pendingUser: {
//       _id: new ObjectId("64a71a8bded55e1b353879a9"),
//       userID: new ObjectId("64a71a8bded55e1b353879a8"),
//       work_type: 'irigation',
//       _id: new ObjectId("64a71ad3fc2422d9f32e402e"),
//       userID: new ObjectId("64a71ad3fc2422d9f32e402d"),
//       work_type: 'irigation',
//       complains: [],
//       approved_date: 2023-07-06T19:49:39.956Z,
//       __v: 0
//     }
//   }