import { Text, View, Button, StyleSheet, Dimensions, } from 'react-native'
import React, { Component } from 'react'
const { height, width } = Dimensions.get("window")

const AboutApp = () => {
    return (
        <SafeAreaViewx >
            {/* <View style={styles.dashboardHeader}>
            <Text style={styles.headerText}>Instructionsssss</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View> */}
            <Text>About App Content</Text>
        </SafeAreaViewx>
    );
};

const styles = StyleSheet.create({
    headerText: {
        color: "#ffffff",
        fontSize: width * 0.045,
        marginRight: width * 0.02,
    },
    dashboardHeader: {
        backgroundColor: "#19AFE2",
        minHeight: width * 0.16,
        padding: width * 0.04,
        alignItems: "center",
    },

});

export default AboutApp