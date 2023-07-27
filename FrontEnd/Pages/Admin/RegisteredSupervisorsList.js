import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Platform, Linking, RefreshControl } from 'react-native';
import { Button, List, Surface } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';
import BASE_URL from '../../src/Common/BaseURL';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const RegisteredSupervisersList = () => {

    const route = useRoute();
    const complainId = route.params.complainId;
    // console.log("complainId", complainId);

    const navigation = useNavigation();

    const [activeSections, setActiveSections] = useState([]);
    const [data, setData] = useState([]);
    const [activeSupervisor, setActiveSupervisor] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500); //after 1.5s refreshing will stop 
    }, []);

    useEffect(() => {
        getSupervisorDetails();
    }, []);

   // this will set the active request
    useEffect(() => {
        if (activeSections.length != 0) {
            setActiveSupervisor(data[activeSections[0]])
        }
    }, [activeSections])

    const getSupervisorDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}supervisors/list`);
            console.log(response.data[0]);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAssignButton = () => {
        console.log("Supervisor Assigned");
        // logic to assign the supervisor
    }

    // open dial pad with the user mobile number dialed when click call button
    const dialCall = () => {
        phoneNum = activeSupervisor.userDetails.mobile_no;
        if (Platform.OS === 'android') {
            phoneNum = `tel:${phoneNum}`;
        } else {
            phoneNum = `telprompt:${phoneNum}`;
        }
        Linking.openURL(phoneNum);
    }

    const renderHeader = (section, index, isActive) => {

        const renderAssignButton = complainId !== null;

        return (
            <Surface style={[isActive ? styles.activeSurface : styles.inactiveSurface, styles.surface]} elevation={2}>

                <List.Item
                    title={section.userDetails.name}
                    titleStyle={{}}
                    description={section.work_type}
                    descriptionStyle={{}}
                    style={[isActive ? styles.activeHeader : styles.inactiveHeader, { borderRadius: 8 }]}
                    left={() => <Image source={{ uri: 'https://tconglobal.com/wp-content/uploads/2019/10/ewp_blog_header.jpg' }} style={[styles.avatar, { alignSelf: "center" }]} />}
                    right={() => (
                        <View>
                            <Button
                                icon="arrow-right"
                                mode="outlined"
                                onPress={() => navigation.navigate('SuperviserDetailView', { userId: section.userID, complainId: complainId })}
                                borderColor='#01a9e1'
                                labelStyle={{ color: "#01a9e1", fontSize: 14 }}
                                style={[styles.button, { borderColor: "#01a9e1" }]}
                            >
                                View
                            </Button>

                        </View>
                    )}
                />
            </Surface>
        );
    };


    const renderContent = (section, index, isActive) => {
        const formattedDate = moment(section.assigned_date).format('MMMM DD, YYYY');
        return (<Surface style={[styles.surface, styles.contentSurface]} elevation={2}>
            <View style={styles.content}>
                <Text style={styles.description}>Name : {section.userDetails.name}</Text>
                <Text style={styles.description}>Mobile No. : {section.userDetails.mobile_no}</Text>
                <Text style={styles.description}>Date Joined: {formattedDate}</Text>
                <View style={styles.buttons}>
                    <Button icon={"phone"} mode='contained' buttonColor={"#19AFE2"} style={styles.callButton} onPress={dialCall}>Call</Button>
                    {complainId && <Button icon={"account-hard-hat"} mode='outlined' textColor={"#19AFE2"} style={styles.assignButton} onPress={handleAssignButton}>Assign</Button>}
                </View>
            </View>
        </Surface>);
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {!data[0] && <Text style={styles.noSupervisors}>There are no registered supervisors at this moment!</Text>}
            <View style={styles.requestList}>
                <List.Section>
                    <Accordion
                        sections={data}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        onChange={updateSections}
                        underlayColor="transparent"
                    />
                </List.Section>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    requestList: {
        marginTop: 8,
    },
    activeHeader: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inactiveHeader: {
        backgroundColor: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        resizeMode: 'cover',
        marginLeft: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 1,
        borderColor: "#c7c7c7",
    },
    description: {
        fontSize: 14,
        color: 'gray',
        paddingVertical: width * 0.005,
    },
    surface: {
        marginHorizontal: 15,
        borderRadius: 8,
    },
    contentSurface: {
        marginBottom: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    activeSurface: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inactiveSurface: {
        marginBottom: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    callButton: {
        width: width * 0.4,
        marginVertical: width * 0.02,
    },
    assignButton: {
        borderColor: '#19AFE2',
        width: width * 0.4,
    },
    noSupervisors: {
        fontWeight: 'bold',
        fontSize: width * 0.045,
        textAlign: 'center',
        marginVertical: width * 0.04,
    },
});

export default RegisteredSupervisersList;