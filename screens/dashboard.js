import React, { Component } from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper';

const Dashboard = props => {

    const newbookingHandler = () => {
        props.navigation.navigate('Newbookings')
    }


    return (
        // <ImageBackground source={{uri: 'https://www.vtexperts.com/wp-content/uploads/2016/07/google-map-background-1900x1170.png'}} style={styles.imgbg}>
        
        // <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}} style={styles.imgbg}>

        
<ImageBackground source={{uri: 'https://images.unsplash.com/photo-1555498386-50deae36950a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80'}} style={styles.imgbg}>
        
        <View style={styles.main}>
            <View style={styles.btns}>
            <View style={styles.btn}>
            <Button color="#7bf037" >previous trips</Button>
            </View>
            <View style={styles.btn}>
            <Button color="#7bf037" onPress={newbookingHandler}>new bookings</Button>
            </View>
            <View style={styles.btn}>
            <Button color="#7bf037">help</Button>
            </View>
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
    },
    btn: {
        marginTop: 3,
        width: 160,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10

    }
})

export default Dashboard