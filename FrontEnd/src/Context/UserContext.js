import React, { createContext, useState , useEffect , useContext ,useCallback  } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

  BASE_URL = "https://maintenance-app-m996.onrender.com/api/v1/"

  const [userRole, setUserRole] = useState('');
  const [ allusers , setAllusers ] = useState([]);

  const getAllUsers = () => {

      console.log(`getAllUsers called`);

    axios.get(`${BASE_URL}users/complainers`)
      .then((res) => {
        console.log(res.data);
        setAllusers(res.data);
      })
      .catch((err) => {
        console.log(`get users error : ${err}`);
      });

    }

   



  return (
    <UserContext.Provider value={{
      
      allusers,
      getAllUsers
      
      }}>
      {children}
    </UserContext.Provider>
  );
};
