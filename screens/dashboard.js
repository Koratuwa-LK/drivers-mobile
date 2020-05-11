import React, { Component, useState } from 'react'
import {View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '../axios-onlinelist';

const Dashboard = props => {

    const[isonline, setisonline] = useState(true)
    const[setisoffline, isoffline] = useState()
    


    const newbookingHandler = () => {
        if(isonline) {
        props.navigation.navigate('Newbookings')
        } else {
            Alert.alert(
                /* 'Couldn`t locate you',
                'Please try later or pick a location on the map',
                [{text: 'OK'}] */
                'Must be Online',
                'You must go online before checking new bookings',
                [{text: 'OK'}]
            )
        }
    }

    



    /* const setonline = () => {
        axios.post('/drivers/tony/.json', {name: 'tony', status: 'Online'})
        .then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    } */

    const setonline = () => {
        setisonline(true)
        axios.patch('/drivers/tony/.json', {name: 'tony',status: 'Online'})
        .then(response => {
            
            console.log(response)
        }).catch(err => {
            console.log(err)
        })/* ,
        () => setisonline(true)
         */
    }

/*     const setoffline = () => {
        axios.post('/drivers.json', {name: 'gaethje', status: 'Offline'})
        .then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
 */ 
    const isonlineshow = () => {
        setisonline(true)
    }

    const setoffline = () => {
        setisonline(false)
        axios.patch('/drivers/tony/.json', {name: 'tony', status: 'Offline'})
        .then(response => {
            
            console.log(response)
        }).catch(err => {
            console.log(err)
        })/* ,
        () => setisonline(false) */
    }

    let onlinebtn;

    if(isonline) {
        onlinebtn = <Button mode="contained" color="#7bf037" onPress={newbookingHandler}>new bookings</Button>
    } else {
        onlinebtn = <Button mode="contained" color="#7bf037" disabled onPress={newbookingHandler}>new bookings</Button>
    }

    return (
        // <ImageBackground source={{uri: 'https://www.vtexperts.com/wp-content/uploads/2016/07/google-map-background-1900x1170.png'}} style={styles.imgbg}>
        
        // <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}} style={styles.imgbg}>
        
        
<ImageBackground source={{uri: 'https://images.unsplash.com/photo-1555498386-50deae36950a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80'}} style={styles.imgbg}>
        
        <View style={styles.main}>
            <View style={styles.btns}>
            {/* <View style={styles.btn}>
            <Button color="#7bf037" >previous trips</Button>
            </View> */}
            <View style={styles.btn}>
            {/* <Button mode="contained"  color="#7bf037" onPress={newbookingHandler}>new bookings</Button> */}
            {onlinebtn}
            </View>

            <View style={styles.triggers}>
                <View>
                    <Button mode="contained" color="#221fde" style={styles.btntrig} onPress={setonline} >Online</Button>
                </View>
                <View>
                    <Button mode="contained" color="#db1d33" style={styles.btntrig} onPress={setoffline}>offline</Button>
                </View>
            </View>
            <View style={styles.btn}>
            <Button mode="contained" color="#7bf037">help</Button>
            </View>
            </View>
            <View>
            <Text>{isonline}</Text>
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
    /* btn: {
        marginTop: 3,
        width: 160,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        padding: 30,
    }, */
    triggers: {
        flexDirection: 'row'
    },
    btntrig: {
        marginTop: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
    },
    btn: {
        marginTop: 10
    }
})

export default Dashboard