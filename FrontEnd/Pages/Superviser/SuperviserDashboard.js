import React , { useState , useContext } from 'react'
import { Text , View , Button } from 'react-native'
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SuperviserDashboard = () => {

    const { logout , userInfo, } = useContext(AuthContext);


  return (
    <View>
        <Text> SuperviserDashboard </Text>
        <Button title="Logout" onPress={() => logout()} />
     <Text> </Text>
      <Button title="Complain Form" onPress={() => navigation.navigate('ComplainForm')} />
      <Text> User details </Text>
      <Text> {userInfo.name} </Text>
      <Text> {userInfo.email} </Text>
      <Text> {userInfo.role} </Text>
      <Text> {userInfo.mobile_no} </Text>
    </View>
  )
}

export default SuperviserDashboard