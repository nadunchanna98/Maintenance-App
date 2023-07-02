import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { AuthContext } from '../../src/Context/AuthContext';
import { UserContext } from '../../src/Context/UserContext';

// Validation schema using Yup
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),

    mobileNumber: yup
        .string()
        .required('Mobile Number is required')
        .matches(/^[0-9]{10}$/, 'Not a valid mobile number')
        .test(
            'Unique mobileNumber',
            'Mobile Number already in use',
            async (value) => {
                try {
                    const response = await axios.post(`${BASE_URL}users/user/checkMobileNo`, {
                        mobileNo: value,
                    });
                    return response.data.message === 'Mobile number is available';
                } catch (error) {
                    console.log(`Error checking mobile number: ${error}`);
                    return false;
                }
            }
        ),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUpScreen = () => {




    // const { signUp } = React.useContext(AuthContext);

    const navigation = useNavigation();
    const [selected1, setSelected1] = React.useState("");
    const [selected2, setSelected2] = React.useState("");

    const data_role = [
        { key: '1', value: 'complainer' },
        { key: '2', value: 'labour' },
        { key: '3', value: 'supervisor'},
        { key: '4', value: 'admin' },
    ]

    const complainer_type = [
        { key: '1', value: 'Student' },
        { key: '2', value: 'Staff' },
        { key: '3', value: 'Supervisor' },
        { key: '4', value: 'other' },
    ]

    const handleSignUp = (values) => {
        const { name, email, mobileNumber, password } = values;
      
        console.log(selected1);



        const requestData = {
          name,
          email,
          mobileNumber,
          password,
          role: selected1,
          // userType: selected2,
        };
      
        axios
          .post(`${BASE_URL}users/user/register`, requestData)
          .then((response) => {
            console.log(response.data);
            alert('User registered successfully!');
            navigation.navigate('Login');
          })
          .catch((error) => {
            console.log(error);
            alert('User registration failed!');
          });
      };
      

    return (
        <ScrollView style={styles.container}>
            <View style={styles.upperSection}>
                <></>
            </View>

            <View style={styles.lowerSection}>
                <Text style={styles.title}>Sign Up</Text>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        mobileNumber: '',
                        password: '',
                        confirmPassword: '',
                        role: '',
                        // userType: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignUp}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mobile Number"
                                    keyboardType="number-pad"
                                    onChangeText={handleChange('mobileNumber')}
                                    onBlur={handleBlur('mobileNumber')}
                                    value={values.mobileNumber}
                                />
                                {touched.mobileNumber && errors.mobileNumber && (
                                    <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
                                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    secureTextEntry
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <SelectList
                                    setSelected={(val) => setSelected1(val)}
                                    data={data_role}
                                    save="value"
                                    defaultOption={{ key: '1', value: 'complainer' }}
                                    search={false}
                                />
                            </View>

                            {/* <View style={styles.inputContainer}>
                                <SelectList
                                    setSelected={(val) => setSelected2(val)}
                                    data={complainer_type}
                                    save="value"
                                    defaultOption= {{ key:'1', value:'Student'}}
                                />
                            </View> */}


                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>
                </View>


            </View>






        </ScrollView>
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
        height: height * 0.3,
    },
    lowerSection: {
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
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        marginTop: height * 0.005,
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

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
    },
    footerText: {
        fontSize: height * 0.02,
        marginRight: width * 0.02,
    },
    footerLink: {
        fontSize: height * 0.02,
        color: '#01a9e1',
    },

});

export default SignUpScreen;
