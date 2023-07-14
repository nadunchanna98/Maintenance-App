
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

import moment from 'moment';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';

const CompletedComplainsListById = () => {

  const { userInfo } = useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();



  const data = route.params.data;
  // console.log("Status: ", data);

  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, index, isActive) => {
    const formattedDate = moment(section.assigned_date).format('MMMM DD, YYYY');

    return (
      <TouchableOpacity
        style={[
          styles.headerContainer,
        ]}
        onPress={() => navigation.navigate('ViewComplain', { complainId: section._id })}
      >
        <View style={styles.headerContent}>
          <Image
            source={{
              uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.title}>{section.description}</Text>
            <Text style={styles.description}>{section.status}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/backButton.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complains</Text>
      </View> */}
      <GestureScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <List.Section>
            <Accordion
              sections={data}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={() => null} // Render an empty content
              onChange={updateSections}
              underlayColor="transparent"
            />
          </List.Section>
        </View>
      </GestureScrollView>
    </View>

  );
};

const windowWidth = Dimensions.get('window').width;
const windowRatio = windowWidth / 425;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10 * windowRatio,
    height: 80 * windowRatio,
    backgroundColor: '#19AFE2',
  },
  backButton: {
    width: 24 * windowRatio,
    height: 24 * windowRatio,
    tintColor: 'white',
    left: 10 * windowRatio,
    marginRight: 10 * windowRatio,
  },
  headerTitle: {
    fontSize: 30 * windowRatio,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    marginLeft: windowRatio - 24 * windowRatio,
    marginRight: 10 * windowRatio,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    margin: 10 * windowRatio,
    borderRadius: 10 * windowRatio,
    backgroundColor: 'white',
  },
  headerContainer: {
    top: 10 * windowRatio,
    flex: 1,
    borderRadius: 10 * windowRatio,
    margin: 5 * windowRatio,
    padding: 15 * windowRatio,
    backgroundColor: '#19AFE2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2 * windowRatio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84 * windowRatio,
    elevation: 5 * windowRatio,
  },
  avatar: {
    width: 65 * windowRatio,
    height: 65 * windowRatio,
    borderRadius: 10 * windowRatio,
    marginRight: 10 * windowRatio,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18 * windowRatio,
    color: 'white',
    lineHeight: 26 * windowRatio,
    left: 10 * windowRatio,
  },
  description: {
    fontSize: 14 * windowRatio,
    color: 'black',
    top: 2 * windowRatio,
    left: 10 * windowRatio,
  },
  date: {
    fontSize: 15 * windowRatio,
    color: 'white',
    marginTop: 4 * windowRatio,
    left: 10 * windowRatio,
  },
});

export default CompletedComplainsListById;
