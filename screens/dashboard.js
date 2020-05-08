import React, { Component } from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper';

const Dashboard = props => {

    const newbookingHandler = () => {
        props.navigation.navigate('Newbookings')
    }


    return (
        <ImageBackground source={{uri: 'https://www.vtexperts.com/wp-content/uploads/2016/07/google-map-background-1900x1170.png'}} style={styles.imgbg}>
        <View style={styles.main}>
            <View style={styles.btns}>
            <Button >previous trips</Button>
            <Button onPress={newbookingHandler}>new bookings</Button>
            <Button >help</Button>
            </View>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '40%',
        position: 'absolute',
        marginLeft: '30%',
        marginRight: '30%'
        
    },
    topic: {
        textAlign: 'center',
    },
    imgbg: {
        flex: 1
    }
})

export default Dashboard