import React, { Component,  useState, useEffect } from 'react'
import {View, Text, Alert, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';

import * as Maplocation from 'expo-location';
import * as Permissions from 'expo-permissions';

import axios from '../axios-onlinelist';

const Newbookings = props => {
    
    const [locationpicked, setlocationpicked] = useState()
    const [isfetching, setisfetching] = useState(null)
    const [booking, setbooking] = useState()

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

    useEffect(() => {
        driversHandler()
    },[booking])
    

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
                /* 'Couldn`t locate you',
                'Please try later or pick a location on the map',
                [{text: 'OK'}] */
                'Successfully located',
                'Your current location successfully saved',
                [{text: 'OK'}]
            )
        }
        setisfetching(false)
        driversHandler()

    }

    const routingHandler = (lat, lng) => {
        props.navigation.navigate('Mapview', {lat: lat, lng: lng})
    }

    const setlocation = () => {
        axios.patch('/drivers/tony/.json',{location: locationpicked})
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }


    /* const driversHandler = () => {
        axios.get('/drivers.json')
        .then((response) => {
       
            const hotel = []
            const obj = response.data
            for(let key in obj) {
               if(key == 'tony') {
              hotel.push({
                  id: key,
                  location: obj[key].location,
                  lat: obj[key].booking.lat,
                  lng: obj[key].booking.lng,
                  time: obj[key].booking.time
              })
            }
        }

            setbooking(hotel)
            console.log(hotel)

        })
        .catch(err => {
            console.log(err)
        })
    } */


    const driversHandler = () => {
        axios.get('/farmerbookings.json')
        .then((response) => {
       
            const hotel = []
            const obj = response.data
            for(let key in obj) {
               if(obj[key].drivername == 'john') {
              hotel.push({
                  id: key,
                  
                  lat: obj[key].lat,
                  lng: obj[key].lng,
                  time: obj[key].time,
                  farmername: obj[key].farmername,
                  farmernumber: obj[key].farmernumer
              })
            }
        }

            setbooking(hotel)
            console.log(hotel)

        })
        .catch(err => {
            console.log(err)
        })
    }




    return (
        <ImageBackground style={styles.imgbg} source={{uri: 'https://images.unsplash.com/photo-1477951233099-d2c5fbd878ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}}>
    
        <View style={styles.main}>
        {/* <ScrollView style={styles.view}> */}
            <View style={styles.locate}>
            {/* <Button color="purple" onPress={locationHandler}>locate me</Button> */}
            <View style={{alignItems: 'center', marginBottom: 10}}><TouchableOpacity onPress={locationHandler}><View style={{height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/marginalia-location-access.png')}></Image><Text style={{textAlign: 'center'}}>Set Location</Text></View></TouchableOpacity>
            </View>
            </View>
            {/* <View style={styles.locate}>
            <Button color="blue" onPress={setlocation}>set location</Button>
            </View>
            <View style={styles.btn} >
            <Button onPress={() => routingHandler(7.294544,80.5907618)}>Kandy</Button>
            </View>
            <View style={styles.btn}>
            <Button onPress={() => routingHandler(6.0558904,80.1769774)}>Galle</Button>
            </View> */}


<FlatList
        data={booking}
        renderItem={({ item }) => {return (
            <TouchableOpacity onPress={() => {props.navigation.navigate('Mapview', {lat: item.lat, lng: item.lng, time: item.time, keyid: item.id })}}><View style={styles.tile}><Text>{item.time}</Text><Text>Farm to Dambulla </Text></View></TouchableOpacity> 
        )}} 
        keyExtractor={item => item.id}
      />

{/* </ScrollView> */}
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
        marginTop: '15%',
       
        position: 'absolute',
        marginLeft: '30%',
        marginRight: '30%'
        
    },
    tile: {
        
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 150,
        backgroundColor: 'rgba(245, 227, 34, 0.5)'
    },
    view: {
        marginBottom: 100
    }
})

export default Newbookings