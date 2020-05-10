import React, { Component,  useState } from 'react'
import {View, Text, Alert, ImageBackground, StyleSheet} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';

import * as Maplocation from 'expo-location';
import * as Permissions from 'expo-permissions';

import axios from '../axios-onlinelist';

const Newbookings = props => {
    
    const [locationpicked, setlocationpicked] = useState()
    const [isfetching, setisfetching] = useState(null)

    const Permissionverify = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status != 'granted'){
            Alert.alert('permission need','need permissions to proceed',
            [{text: 'OK'}]
            )
            return false
        }
        return true
    } 

    const locationHandler = async () => {
        const haspermission = await Permissionverify()
        if(!haspermission) {
            return
        }

        setisfetching(true)

        try {
            const location = await Maplocation.getCurrentPositionAsync({timeout: 5000})
            console.log(location)
            setlocationpicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            props.onpickedlocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })

        } catch (err) {
            Alert.alert(
                'Couldn`t locate you',
                'Please try later or pick a location on the map',
                [{text: 'OK'}]
            )
        }setisfetching(false)
    }

    const routingHandler = (lat, lng) => {
        props.navigation.navigate('Mapview', {lat: lat, lng: lng})
    }

    const setlocation = () => {
        axios.post('drivers.json',{location: locationpicked})
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <ImageBackground style={styles.imgbg} source={{uri: 'https://images.unsplash.com/photo-1477951233099-d2c5fbd878ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}}>
        <View style={styles.main}>
            <View style={styles.locate}>
            <Button color="purple" onPress={locationHandler}>locate me</Button>
            </View>
            <View style={styles.locate}>
            <Button color="blue" onPress={setlocation}>set location</Button>
            </View>
            <View style={styles.btn} >
            <Button onPress={() => routingHandler(7.294544,80.5907618)}>Kandy</Button>
            </View>
            <View style={styles.btn}>
            <Button onPress={() => routingHandler(6.0558904,80.1769774)}>Galle</Button>
            </View>
        </View>

        
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imgbg: {
        flex: 1
    },
    btn: {
        marginTop: 3,
        width: 160,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10

    },
    main: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '40%',
        position: 'absolute',
        marginLeft: '30%',
        marginRight: '30%'
        
    },
})

export default Newbookings