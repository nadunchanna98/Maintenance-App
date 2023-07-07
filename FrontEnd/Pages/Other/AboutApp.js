import { Text, View , Button } from 'react-native'
import React, { Component } from 'react'


const AboutApp = () => {
    return (
        <View>
            <Text>Instruction</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default AboutApp