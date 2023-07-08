import React, { useState, useContext, useCallback } from 'react'
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window")

const UserDashboard = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); //after 2s refreshing will stop 
  }, []);

  const navigation = useNavigation();

  const { logout, userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View>
        <View style={styles.dashboardHeader}>
          <View style={styles.firstRow}>
            <View style={styles.logout}>
              <TouchableOpacity onPress={() => { logout() }}>
                <Text style={styles.headerText}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                <View style={styles.userProfile}>
                  <Text style={styles.headerText}>{userInfo.name}</Text>
                  <View style={styles.profilePic}>
                    <Ionicons name="md-person" size={18} color="white" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.title}>Complainer Dashboard</Text>
            {/* User Dashboard */}
          </View>
        </View>
        <View style={styles.dashboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: "89.5%" }} // 89.9%
          >
            <View style={styles.cardContainer}>
              <TouchableOpacity onPress={() => { navigation.navigate("Supervisors") }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/4792511/pexels-photo-4792511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>New Complain</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("Supervisors") }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/5974053/pexels-photo-5974053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Complains</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("Supervisors") }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/5691511/pexels-photo-5691511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>Completed</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>



      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profile: {
    textDecorationLine: 'underline',
    color: '#01A9E1',
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
    padding: width * 0.04,
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

export default UserDashboard