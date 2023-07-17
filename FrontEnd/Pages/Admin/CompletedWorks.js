import React, { useState, useContext, useCallback } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../../src/Context/AuthContext";

const { height, width } = Dimensions.get("window");

const CompletedWorks = () => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const { userInfo, logout } = useContext(AuthContext);

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                {/* <View style={styles.dashboardHeader}>
                    <View style={styles.firstRow}>
                        <View style={styles.logout}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Feather name="chevron-left" size={18} color="white" style={styles.backIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { logout() }}>
                                <Text style={styles.headerText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                                <View style={styles.userProfile}>
                                    <Text style={styles.headerText}>{userInfo.name}</Text>
                                    <View style={styles.profilePic}>
                                        <Ionicons name="md-person" size={18} color="white" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.secondRow}>
                        <Text style={styles.title}>Completed Works</Text>
                    </View>
                </View> */}
                <Text>All Completed Works!</Text>

                <View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        <Text>Completed Works</Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profile: {
        color: '#01A9E1',
        fontSize: height * 0.025,
        textAlign: "center",
        paddingVertical: 30,
    },
    dashboardHeader: {
        backgroundColor: "#19AFE2",
        minHeight: width * 0.16,
        padding: width * 0.04,
        alignItems: "center",
    },
    firstRow: {
        // backgroundColor: "#003D14", // Green color
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        // backgroundColor: "#707070",
        marginRight: width * 0.02,
    },
    headerText: {
        color: "#ffffff",
        fontSize: width * 0.045,
        marginRight: width * 0.02,
    },
    userProfile: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        backgroundColor: "#707070", // #8A8A8A #707070 #595959
        width: width * 0.07,
        height: width * 0.07,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 500,
    },
    title: {
        color: "#ffffff",
        fontSize: width * 0.06,
        fontWeight: "bold",
        paddingTop: 5,
    },
});

export default CompletedWorks;