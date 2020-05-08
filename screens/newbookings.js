import React, { Component,  useState } from 'react'
import {View, Text, Alert} from 'react-native';
import {Button} from 'react-native-paper';

import * as Maplocation from 'expo-location';
import * as Permissions from 'expo-permissions';

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


    return (
        <View>
            <Button color="purple" onPress={locationHandler}>locate me</Button>
            <Button onPress={() => routingHandler(7.294544,80.5907618)}>Kandy</Button>
        </View>
    )
}

export default Newbookings