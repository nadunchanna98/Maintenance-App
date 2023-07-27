import React, { createContext, useState , useEffect  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

// Create a new context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {

  BASE_URL = "https://maintenance-app-m996.onrender.com/api/v1/"


  const [data, setData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const getUserInfo = async (id) => {

  axios.get(`${BASE_URL}users/user/${id}`)
    .then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
    })
    .catch((err) => {
      console.log(`get users error : ${err}`);
    });

  }



  // Define any other functions or state variables you need
  const login  = (mobile_no , password) => {

    // setUserToken('fgkj');
    // setIsLoading(false);

    console.log(`login called with ${mobile_no} and ${password}`);

    let values = {
      mobile_no: mobile_no,
      password: password
    };

    setIsLoading(true);

    axios.post(`${BASE_URL}users/login`,values)
      .then((res) => {
        // console.log(res.data);

        let userInfo = res.data.user;
        setUserInfo(userInfo);
        setUserToken(res.data.token);
        console.log(userInfo.role);
        setUserRole(userInfo.role);

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', res.data.token);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`login error : ${err}`);
        Alert.alert(
          "Login Failed",
          "Phone number or Password is incorrect. Please try again.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"

              
            }
          ]
        );


        setIsLoading(false);
      });


    AsyncStorage.setItem('userToken', 'fgkj');
    setIsLoading(false);

  };

  const logout = () => {

    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {

    try {

      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    }
    catch (e) {
      console.log(`isLogged in error: ${e}`);
    }

  };

  useEffect(() => {
    isLoggedIn();
  }, []);



  // Wrap the children components with the context provider
  return (
    <AuthContext.Provider
      value={{

        data,
        setData,
        login,
        logout,
        isLoading,
        setIsLoading,
        userToken,
        setUserToken,
        userInfo,
       getUserInfo,
       BASE_URL
        
        
        // Pass any other functions or state variables to the value object
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
