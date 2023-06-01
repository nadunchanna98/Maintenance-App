import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const BASE_URL = '../../Common/BaseURL'; // Replace with the actual base URL

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();

  const handleFormSubmit = (values) => {
    axios
      .post(`${BASE_URL}login/`, values)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForgotPassword = () => {
   navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </View>

      <Formik
        initialValues={{ phoneNumber: '', password: '' }}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.lowerSection}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>Don't have an account yet?  </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.15,
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
  button: {
    backgroundColor: '#01a9e1',
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
    paddingLeft: width * 0.6,
  },
  forgotPasswordText: {
    color: '#565656',
    fontSize: height * 0.018,
    textDecorationLine: 'underline',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height * 0.06,
  },
  signUpText: {
    color: 'black',
    fontSize: height * 0.018,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: '#01a9e1',
    fontSize: height * 0.018,
  },
  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },
});

export default LoginScreen;
