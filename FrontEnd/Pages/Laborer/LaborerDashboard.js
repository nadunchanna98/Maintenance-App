import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("window")

const LaborerDashboard = () => {

  const navigation = useNavigation();

  return (
    <View>

      {/*  */}
      <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
        <Text style={styles.profile}>Profile</Text>
      </TouchableOpacity>
      {/*  */}

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

export default LaborerDashboard