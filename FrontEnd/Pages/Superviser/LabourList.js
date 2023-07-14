import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const LabourList = () => {

  const { userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);

  const navigation = useNavigation();

  const [activeSections, setActiveSections] = useState([]);
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getSupervisorDetails();
  }, []);

  const getSupervisorDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/labours/list`);
      console.log(response.data[0]);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const renderHeader = (section, index, isActive) => (
    <List.Item
      title={section.name}
      description={section.mobile_no}
      style={isActive ? styles.activeHeader : styles.inactiveHeader}
      left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={styles.avatar} />}
      right={() => (
        <Button
          icon="arrow-right"
          mode="outlined"
          onPress={() => navigation.navigate('LaborerDetailView', { userId: section._id })}
          borderColor='#01a9e1'
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
          {/* <List.Subheader>All Laborers</List.Subheader>   */}
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
