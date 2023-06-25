import React, { useState , useContext , useEffect } from 'react';
import { View, Text,Button, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation   } from '@react-navigation/native';

const AdminDashboard = () => {

    const navigation = useNavigation();
    
    const { logout , userInfo } = useContext(AuthContext);
    const { allusers , getAllUsers } = useContext(UserContext);
    


    useEffect(() => {
        getAllUsers();
      }, []);

  return (

    <View>
        <Text>Admin Dashboard</Text>
        <Button title="Logout" onPress={() => logout()} />
        <Text> </Text>

        <Text> User details </Text>
      <Text> {userInfo.name} </Text>
      <Text> {userInfo.email} </Text>
      <Text> {userInfo.role} </Text>
      <Text> {userInfo.mobile_no} </Text>

        <Text> </Text>
        <Text> All Users </Text>
        {allusers.map((user) => (
            <Text key={user._id}>{user.name}</Text>

        ))}
    </View>
    
  )
}

export default AdminDashboard