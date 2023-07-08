import React, { useState, useContext, useEffect, useCallback } from 'react';
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
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window")

const AdminDashboard = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); //after 2s refreshing will stop 
  }, []);

  const navigation = useNavigation();

  const { logout, userInfo } = useContext(AuthContext);
  const { allusers } = useContext(UserContext);

  useEffect(() => {

  }, []);

  return (
    <SafeAreaView>
      <View>
        <View style={styles.dashboardHeader}>
          <View style={styles.secondRow}>
            <Text style={styles.title}>Admin Dashboard</Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: "91.5%" }} // 89.9%
          >

            <View style={styles.cardContainer}>

              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus", { Status: 'AssignedA' }) }}>
                <View style={styles.count}><Text style={styles.countText}>2</Text></View>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>New Requests</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus", { Status: 'AssignedS' }) }}>
                <View style={styles.count}><Text style={styles.countText}>3</Text></View>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>In Progress</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus", { Status: 'CompletedA' }) }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Completed</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("SuperviserList") }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Supervisors</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("PendingList", { PendingType: 'supervisor' }) }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/3769135/pexels-photo-3769135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Pending Supervisors</Text>
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
  count: {
    backgroundColor: "#95A695",
    width: width * 0.07,
    height: width * 0.07,
    alignItems: "center",
    justifyContent: "center",
    bottom: -width * 0.035,
    left: width * 0.86,
    //right: -350, // width * 0.025 // -350  // -width * 0.945
    zIndex: 2,
    borderRadius: 100,
  },
  countText: {},
});

export default AdminDashboard;