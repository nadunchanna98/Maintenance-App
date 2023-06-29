import React, { useState, useContext, useCallback } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window")

const SuperviserDashboard = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); //after 2s refreshing will stop 
  }, []);

  const { logout, userInfo } = useContext(AuthContext);

  const navigation = useNavigation();

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
            <Text style={styles.title}>Supervisor Dashboard</Text>
          </View>
        </View>
        <View style={styles.dashboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: "89.5%" }} // 89.9%
          >
            <Text style={styles.dashboardText}>Dashboard Content</Text>

            {/* <View style={[]}>
              <Button title="Logout" onPress={() => logout()} />

              <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                <Text style={styles.profile}>Profile</Text>
              </TouchableOpacity>
            </View> */}

            <Text>Testing Text</Text>

          </ScrollView>
        </View>



      </View>

      {/* <View>
        <Text> SuperviserDashboard </Text>
        <Button title="Logout" onPress={() => logout()} />
        <Text> </Text>
        <Button title="Complain Form" onPress={() => navigation.navigate('ComplainForm')} />


        <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
          <Text style={styles.profile}>Profile</Text>
        </TouchableOpacity>


        <Text> User details </Text>
        <Text> {userInfo.name} </Text>
        <Text> {userInfo.email} </Text>
        <Text> {userInfo.role} </Text>
        <Text> {userInfo.mobile_no} </Text>
      </View> */}
    </SafeAreaView>
  );
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
});

export default SuperviserDashboard