
import React, { useState,useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';

import BASE_URL from '../../src/Common/BaseURL';
import axios from 'axios';
import { Badge } from 'react-native-paper';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get("window")

const SuperviserDashboard = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [assignedSData, setAssignedSData] = useState([]);
  const [assignedLData, setAssignedLData] = useState([]);
  const [completedSData, setCompletedSData] = useState([]);

  const [pendingLabourersData, setPendingLabourersData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getAssignedSComplains();
      getAssignedLComplains();
      getCompletedSComplains();
      getListOfPendingLabourers();
      // console.log("useFocusEffect")
    }, [userInfo]) // Add userInfo as a dependency
  );

  useEffect(() => {
    getAssignedSComplains();
    getAssignedLComplains();
    getCompletedSComplains();
    getListOfPendingLabourers();
  }, []);

  const statusAssignedS = 'AssignedS';
  const statusAssignedL = 'AssignedL';
  const statusCompletedS = 'CompletedS';

  const pendingType = 'labour';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAssignedSComplains();
    getAssignedLComplains();
    getCompletedSComplains();
    getListOfPendingLabourers();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); //after 2s refreshing will stop 
  }, []);

  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
 
// console.log(userInfo);

  const getListOfPendingLabourers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}users/pending/list`, {
        params: {
          PendingType: pendingType,
        }
      });
      setPendingLabourersData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignedSComplains = async () => {
    try {
      const response = await axios.get(`${BASE_URL}complains/list`, {
        params: {
          id: userInfo.userId,
          status: statusAssignedS,
          role: userInfo.role,
        }
      });
      setAssignedSData(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const getAssignedLComplains = async () => {
    try {
      const response = await axios.get(`${BASE_URL}complains/list`, {
        params: {
          id: userInfo.userId,
          status: statusAssignedL,
          role: userInfo.role,
        }
      });
      setAssignedLData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCompletedSComplains = async () => {
    try {
      const response = await axios.get(`${BASE_URL}complains/list`, {
        params: {
          id: userInfo.userId,
          status: statusCompletedS,
          role: userInfo.role,
        }
      });
      setCompletedSData(response.data);

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const noOfAssignedSComplains = assignedSData.length;
  const noOfAssignedLComplains = assignedLData.length;
  const noOfCompletedSComplains = completedSData.length;

  const noOfPendingLabourers = pendingLabourersData.length;
  console.log(noOfPendingLabourers);


  return (
    <SafeAreaView>
      <View>
        <View style={styles.dashboardHeader}>
          <View style={styles.secondRow}>
            <Text style={styles.title}>Supervisor Dashboard</Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: "91.5%" }} // 89.9%
          >

            <View style={styles.cardContainer}>

              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus", { data: assignedSData }) }}>
                <View style={{ zIndex: 2 }}><Badge size={25} style={{ top: 12, left: 8 }}>{noOfAssignedSComplains}</Badge></View>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Newly Assigned Works</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("omplainsListByIdAndStatus", { data: assignedLData }) }}>
                <View style={{ zIndex: 2 }}><Badge size={25} style={{ top: 12, left: 8 }}>{noOfAssignedLComplains}</Badge></View>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>In Progress Works</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("PendingList", { pendingData: pendingLabourersData }) }}>
                <View style={{ zIndex: 2 }}><Badge size={25} style={{ top: 12, left: 8 }}>{noOfPendingLabourers}</Badge></View>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Pending Labourers</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("LaborerList") }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/6474343/pexels-photo-6474343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Registered Labourers</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus", { data: completedSData }) }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Completed Works</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    textDecorationLine: 'underline',
    color: '#19AFE2',
    fontSize: height * 0.025,
    textAlign: "center",
    paddingVertical: 30,
  },
  dashboardHeader: {
    backgroundColor: "#19AFE2",
    minHeight: width * 0.16,
    padding: width * 0.04,
    alignItems: "center",
  },
  firstRow: {
    // backgroundColor: "#003D14", // Green color
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: width * 0.045,
    marginRight: width * 0.02,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    backgroundColor: "#707070", // #8A8A8A #707070 #595959
    width: width * 0.07,
    height: width * 0.07,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
  title: {
    color: "#ffffff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    paddingTop: 5,
  },
  dashboardText: {
    fontSize: width * 0.07,
    backgroundColor: "#8F8F8F",
  },
  dashboard: {
    // padding: width * 0.04,
  },
  cardContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.05,
    paddingTop: width * 0.02,
  },
  card: {
    backgroundColor: "#B3B3B3",
    width: "100%",
    height: width * 0.4,
    borderRadius: width * 0.04,
    overflow: "hidden",
    marginBottom: width * 0.05,
  },
  imageSection: {
    backgroundColor: "#98E2FB", // Light blue: "#98E2FB"   Dark blue: "#19AFE2"
    width: "100%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textSection: {
    backgroundColor: "#19AFE2",
    width: "100%",
    height: "25%",
    justifyContent: "center",
  },
  cardText: {
    // backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
    textAlign: "right",
    paddingHorizontal: width * 0.04,
  },
});

export default SuperviserDashboard;