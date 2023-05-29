import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text,ScrollView, Dimensions,Image,Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';





const MyForm = ({ route }) => {
    const { name } = route.params;
  
    // Use the user's name in the component
  
    return (
      <View>
        <Text>name:{name}</Text>
      </View>
    );
  };
export default MyForm;