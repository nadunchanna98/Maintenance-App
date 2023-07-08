import React from 'react'
import { View, TextInput, Button, TouchableOpacity, Text, Dimensions } from 'react-native';

const UserDashboard = () => {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.dashboardHeader}>
          <View style={styles.secondRow}>
            {/* <Text style={styles.title}>Hello {userInfo.name}</Text> */}
           <Text style={styles.title}>User Dashboard</Text> 
          </View>
        </View>
        <View style={styles.dashboard}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ height: "89.5%" }} // 89.9%
          >

            <View style={styles.cardContainer}>

              <TouchableOpacity onPress={() => { navigation.navigate("NewRequests") }}>
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
                    <Text style={styles.cardText}>Send new complain</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus" , { Status:'Pending' } )  }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>30 minutes waitning Complaines</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus" , { Status:'AssignedA' } )  }}>
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

              <TouchableOpacity onPress={() => { navigation.navigate("ComplainsListByIdAndStatus" , { Status:'Completed' } )  }}>
                <View style={styles.card}>
                  <View style={styles.imageSection}>
                    {/* <Text>Image</Text> */}
                    <Image
                      source={{ uri: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardText}>My Completed complaines</Text>
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

export default UserDashboard