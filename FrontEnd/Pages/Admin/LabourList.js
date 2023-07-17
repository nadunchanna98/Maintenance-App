import React, { useState , useEffect , useContext } from 'react';
import { View, Text, StyleSheet, Image , ScrollView , Alert } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const LabourList = ({ route }) => {

    const { complainID } = route.params;

    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation();

  const [activeSections, setActiveSections] = useState([]);
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getLabourDetails();
  }, []);

  const getLabourDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}labours/list`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = (section, index, isActive) => {

    const renderAssignButton = complainID !== null;

    return (
      <List.Item
        title={section.userDetails.name}
        description={section.userDetails.role}
        style={isActive ? styles.activeHeader : styles.inactiveHeader}
        left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
        right={() => (
          <View style={styles.buttonContainer}>
            <Button
              icon="arrow-right"
              mode="outlined"
              onPress={() => navigation.navigate('LabourDetailView', { userId: section.userID, complainId: complainID })}
              borderColor="#01a9e1"
              color="#f08e25"
              labelStyle={{ color: "#01a9e1", fontSize: 15 }}
              style={[styles.button, { borderColor: theme.colors.primary }]}
            >
              View
            </Button>
          </View>
        )}
      />
    );
  };


  const renderContent = (section, index, isActive) => (
    <View style={styles.content}>
      <Text style={styles.description}>Mobile: {section.userDetails.mobile_no}</Text>
      <Text style={styles.description}>Date: {section.userDetails.email}</Text>
    </View>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <ScrollView>
      <View>
        <List.Section>
          {/* <List.Subheader>All supervisors</List.Subheader>   */}
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

export default LabourList;




// {
//   "_id": "64a8e22368e52dc5de603130",
//   "userID": "64a8e22368e52dc5de60312f",
//   "work_type": "construction",
//   "complains": [],
//   "approved_date": "2023-07-08T04:12:19.666Z",
//   "__v": 0,
//   "userDetails": {
//       "_id": "64a8e22368e52dc5de60312f",
//       "name": "akila dimath",
//       "email": "akiladimath@gmail.com",
//       "mobile_no": "222222222",
//       "password": "$2b$10$soURZgPsfkdURpTCnIZBEuNYolEEahdblanK/JwjHvfD9KJgDboZK",
//       "role": "supervisor",
//       "accepted": false,
//       "complainer_type": "other",
//       "complains": [],
//       "__v": 0
//   }
// },