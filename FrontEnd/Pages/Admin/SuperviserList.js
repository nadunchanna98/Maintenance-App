import React, { useState , useEffect , useContext } from 'react';
import { View, Text, StyleSheet, Image , ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL  from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation , useRoute  } from '@react-navigation/native';

const getSupervisorWorks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}supervisors/user/${userId}`);
    console.log(response.data[0]);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
}

const SuperviserList = ({ route }) => {
  const { complainID } = route.params;
  console.log("complainId",complainID);

    const { userInfo } = useContext(AuthContext);
    const { allusers } = useContext(UserContext);
    
    const navigation = useNavigation();

const [activeSections, setActiveSections] = useState([]);
const [data , setData] = useState([]);
const theme = useTheme();

  useEffect(() => {
    getSupervisorDetails();
  }, []);

  const getSupervisorDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}supervisors/list`);
      console.log(response.data[0]);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAssignButton =() =>{
    console.log("Supervisor Assigned");
    // logic to assign the supervisor
  }

  
  const renderHeader = (section, index, isActive) => {
    const renderAssignButton = complainID !== null;
  
    return (
      <List.Item
        title={section.description}
        description={section.status}
        style={isActive ? styles.activeHeader : styles.inactiveHeader}
        left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
        right={() => (
          <View style={styles.buttonContainer}>
            <Button
              icon="arrow-right"
              mode="outlined"
              onPress={() => navigation.navigate('SuperviserDetailView', { userId: section.userID,complainId:complainID })}
              borderColor="#01a9e1"
              color="#f08e25"
              labelStyle={{ color: "#01a9e1", fontSize: 15 }}
              style={[styles.button, { borderColor: theme.colors.primary }]}
            >
              View
            </Button>
            {renderAssignButton && (
              <Button
                icon="account"
                mode="outlined"
                onPress={() => handleAssignButton(section.complainID)}
                borderColor="#01a9e1"
                color="#f08e25"
                labelStyle={{ color: "#01a9e1", fontSize: 15 }}
                style={[styles.button, { borderColor: theme.colors.primary }]}
              >
                Assign
              </Button>
            )}
          </View>
        )}
      />
    );
  };
  

  const renderContent = (section, index, isActive) => (
    <View style={styles.content}>
      <Text style={styles.description}>name : {section.name}</Text>
      <Text style={styles.description}>Date: {section.data}</Text>
    </View>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <ScrollView> 
    <View>
      <List.Section>
        <List.Subheader>All supervisors</List.Subheader>  
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

export default SuperviserList;
