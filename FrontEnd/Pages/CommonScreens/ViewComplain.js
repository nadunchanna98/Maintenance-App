import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, List, useTheme } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { UserContext } from '../../src/Context/UserContext';
import { AuthContext } from '../../src/Context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';


const ViewComplain = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const complainId = route.params.complainId;

    const [complain, setComplain] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}complains/complainbyid/${complainId}`)
            .then((response) => {
                // console.log("response",response.data);
                setComplain(response.data);
            })
            .catch((error) => {
                console.log("error", error);
            })
    }, []);


    const { userInfo } = useContext(AuthContext);
    const { allusers } = useContext(UserContext);

    return (
        <View>
            <Text>View detail of Complain</Text>
            <Text>{complain.description}</Text>
            <Text>{complain.status}</Text>
            <Text>{complain.complainType}</Text>
        </View>
    )
}

export default ViewComplain