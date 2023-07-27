import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { AuthContext } from '../../src/Context/AuthContext';
import { UserContext } from '../../src/Context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../src/Common/config';

// Validation schema using Yup
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: yup
        .string()
        .required('Mobile Number is required')
        .matches(/^0[0-9]{9}$/, 'Not a valid mobile number')
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
    
    const navigation = useNavigation();
    const [selected1, setSelected1] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageNewUrl, setImageNewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleChooseImage = async () => {

         setOpen(false);

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const selectedAsset = result.assets[0];
                setSelectedImage(selectedAsset);
                console.log(selectedAsset);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const uploadImage = async (uri) => {
        setProgress(0);

        if (!uri) {
            setUploading(false);
            return;
        }

        setUploading(true);

        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename).put(blob);

            ref.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await ref;
                    const url = await ref.snapshot.ref.getDownloadURL();
                    console.log("new url--", url);
                    setImageNewUrl(url);
                    setUploading(false);
                    setIsImageSelected(true);
                    setOpen(true);
                }
            );
        } catch (e) {
            console.log(e);
            setUploading(false);
        } finally {
            setProgress(0);
        }


    };

    const data_role = [
        { key: '1', value: 'complainer' },
        { key: '2', value: 'labour' },
        { key: '3', value: 'supervisor' },
        { key: '4', value: 'admin' },
    ];

    const handleReSelectImage = () => {
        setSelectedImage(null);
        setIsImageSelected(false);
    };

    const handleSignUp = (values) => {
        const { name, email, mobileNumber, password, work_type } = values;

        let Role = '';

        if (selected1 === "1" || selected1 === "complainer") {
            Role = 'complainer';
        } else if (selected1 === "2" || selected1 === "labour") {
            Role = 'labour';
        } else if (selected1 === "3" || selected1 === "supervisor") {
            Role = 'supervisor';
        } else if (selected1 === "4" || selected1 === "admin") {
            Role = 'admin';
        }

        console.log("imageNewUrl", imageNewUrl);


        const requestData = {
            name,
            email,
            mobileNumber,
            password,
            role: Role,
            work_type,
            profileImage: imageNewUrl,
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
                <Text style={styles.title}>Sign Up Form</Text>

                <View style={styles.imageContainer}>
                    {selectedImage ? (
                        <>
                            <TouchableOpacity onPress={handleChooseImage}>
                                <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.reSelectButton} onPress={handleReSelectImage}>
                                <Text style={styles.reSelectButtonText}>Change Image</Text>
                            </TouchableOpacity>
                            {selectedImage && !open && (
                                <TouchableOpacity style={styles.saveButton} onPress={() => uploadImage(selectedImage.uri)}>
                                    <Text style={styles.saveButtonText}>Save the Image</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <>

                            <TouchableOpacity onPress={handleChooseImage}>
                                <MaterialCommunityIcons name="account-circle" size={150} color="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.selectButton} onPress={handleChooseImage}>
                                <Text style={styles.selectButtonText}>Select Image</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {open && (
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            mobileNumber: '',
                            password: '',
                            confirmPassword: '',
                            role: '',
                            work_type: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignUp}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, !isImageSelected && styles.disabledInput]}
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
                                        setSelected={(data) => setSelected1(data)}
                                        data={data_role}
                                        save="value"
                                        defaultOption={{ key: '1', value: 'complainer' }}
                                        search={false}
                                    />
                                </View>

                                {
                                    selected1 === "3" | selected1 === "supervisor" ?
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Work type"
                                                onChangeText={handleChange('work_type')}
                                                onBlur={handleBlur('work_type')}
                                                value={values.work_type}

                                            />
                                            {touched.work_type && errors.work_type && <Text style={styles.errorText}>{errors.work_type}</Text>}
                                        </View>
                                        : null

                                }

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



                )}

                {uploading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#01a9e1" />
                        <Text style={styles.loadingText}>Uploading image...</Text>
                    </View>
                )}

                {open && (
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        minHeight: height * 0.8,
        borderBottomRightRadius: width * 0.15,
        borderBottomLeftRadius: width * 0.15,

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
    imageContainer: {
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: height * 0.02,
        // Add any other styles for the image display, such as borders, shadows, etc.
    },
    selectButton: {
        padding: 10,
        backgroundColor: '#01a9e1',
        borderRadius: 5,
        marginTop: height * 0.02,

    },
    selectButtonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    reSelectButton: {
        padding: 10,
        backgroundColor: '#ff6347',
        borderRadius: 5,
        marginTop: height * 0.01,
        width: Dimensions.get('window').width * 0.4,
    },
    reSelectButtonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        padding: 10,
        backgroundColor: '#01a9e1',
        borderRadius: 5,
        marginTop: height * 0.02,
        width: Dimensions.get('window').width * 0.4,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    loadingText: {
        fontSize: height * 0.02,
        marginTop: height * 0.01,
    },

});

export default SignUpScreen;
