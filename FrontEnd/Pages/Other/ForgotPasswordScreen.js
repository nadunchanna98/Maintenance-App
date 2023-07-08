import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const { width, height } = Dimensions.get('window');

// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordScreen = ({ navigation }) => {
  const handleSendCode = (values) => {
    console.log('Send Code clicked!');
    console.log('Email:', values.email);
    // Add your logic to send the code here

    // Navigate to the next screen and share the email address
    navigation.navigate('CodeEnterScreen', { email: values.email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <></>
      </View>

      <View style={styles.lowerSection}>
        <Text style={styles.title}>Forgot Password</Text>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSendCode}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Code</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.05,
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
  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },
});

export default ForgotPasswordScreen;
