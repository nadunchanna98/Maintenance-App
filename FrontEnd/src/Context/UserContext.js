import React, { createContext, useState , useEffect } from 'react';
import  BASE_URL  from '../Common/BaseURL';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

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
      
      userRole, 
      setUserRole,
      allusers,
      getAllUsers
      
      }}>
      {children}
    </UserContext.Provider>
  );
};
