import React, { useState, useContext } from 'react'
import { Text, View, Button, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("window")

const UserDashboard = () => {

  const navigation = useNavigation();

  const { logout, userInfo, } = useContext(AuthContext);

  return (
    <View>

      <Text> UserDashboard  </Text>
      <Button title="Logout" onPress={() => logout()} />
      <Text> </Text>
      <Button title="Complain Form" onPress={() => navigation.navigate('ComplainForm')} />

      {/*  */}
      <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
        <Text style={styles.profile}>Profile</Text>
      </TouchableOpacity>
      {/*  */}

      <Text> User details </Text>
      <Text> {userInfo.name} </Text>
      <Text> {userInfo.email} </Text>
      <Text> {userInfo.role} </Text>
      <Text> {userInfo.mobile_no} </Text>


    </View>
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
});

export default UserDashboard