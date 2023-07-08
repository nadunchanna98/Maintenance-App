import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const PasswordChangeScreen = ({ navigation }) => {
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
      
        const response = await axios.post('your_api_endpoint', values);
        console.log('API response:', response.data);

        if (response.data.success) {
 
          navigation.navigate('Login');
        } else {
   
          Alert.alert('Error', 'Failed to change password. Please try again.');
        }
      } catch (error) {
        console.error('API error:', error);

        // Alert.alert('Error', 'An error occurred. Please try again later.');
        navigation.navigate('Login');
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <></>
      </View>

      <View style={styles.lowerSection}>
        <Text style={styles.title}>Password Change Screen</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            onChangeText={formik.handleChange('oldPassword')}
            onBlur={formik.handleBlur('oldPassword')}
            value={formik.values.oldPassword}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <Text style={styles.errorText}>{formik.errors.oldPassword}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01a9e1',
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    marginTop: -height * 0.2,
  },
  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: height * 0.02,
  },
  errorText: {
    fontSize: height * 0.02,
    color: 'red',
  },
  button: {
    backgroundColor: '#01a9e1',
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
    marginTop: height * 0.05,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PasswordChangeScreen;
