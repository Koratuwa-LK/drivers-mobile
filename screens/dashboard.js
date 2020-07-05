import React, { Component, useState } from 'react'
import {View, Text, StyleSheet, ImageBackground, Alert,TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-paper';
import axios from '../axios-onlinelist';
import { AuthContext } from '../Components/context'
import * as firebase from 'firebase';
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

    const confirmedHandler = () => {
        props.navigation.navigate('Confirmed')
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

    let vectors;

    if(isonline) {
        vectors = <View style={{alignItems: 'center'}}><TouchableOpacity onPress={newbookingHandler}><View style={{alignItems: 'center'}}><View style={{height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/cherry-delivery.png')}></Image><Text style={{textAlign: 'center'}}>New Bookings</Text></View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmedHandler}>
        <View style={{marginTop: 10,height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/eastwood-delivery.png')}></Image><Text style={{textAlign: 'center'}}>Confirmed Bookings</Text></View>
     
        </TouchableOpacity>
        </View>

    } else {
        vectors = <View style={{alignItems: 'center'}}><View style={{height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/cherry-delivery.png')}></Image><Text style={{textAlign: 'center'}}>New Bookings</Text></View>
        <View style={{marginTop: 10,height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(0,0,0, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/eastwood-delivery.png')}></Image><Text style={{textAlign: 'center'}}>Confirmed Bookings</Text></View>
        </View>
    }

    let onlinebtn;

    if(isonline) {
        onlinebtn = <View><Button mode="contained" color="#7bf037" onPress={newbookingHandler}>new bookings</Button><Button mode="contained" style={{marginTop: 10}} color="#fcba03" onPress={newbookingHandler}>confirmed</Button></View>

    } else {
        onlinebtn = <View><Button mode="contained" color="#7bf037" disabled onPress={newbookingHandler}>new bookings</Button><Button mode="contained" style={{marginTop: 10}} color="#fcba03" disabled onPress={newbookingHandler}>confirmed</Button></View>
    }

    let showonline;

    if(isonline) {
        showonline = <View style={styles.online}><Text style={styles.text}>ONLINE</Text></View>
    }else{
        showonline = <View style={styles.offline}><Text style={styles.text}>OFFLINE</Text></View>
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
            {/* {onlinebtn} */}
            {vectors}
            </View>

            <View style={styles.triggers}>
                <View>
                    <Button mode="contained" color="#221fde" style={styles.btntrig} onPress={setonline} >Online</Button>
                </View>
                <View>
                    <Button mode="contained" color="#db1d33" style={styles.btntrig} onPress={setoffline}>offline</Button>
                </View>

                <View>
                    <Button mode="contained" color="#841584" style={styles.btntrig} onPress={()=>{firebase.auth().signOut()}}>Sign Out</Button>
                </View>
            </View>
            {/* <View style={styles.btn}>
            <Button mode="contained" color="grey">help</Button>
            </View> */}
           
            <View style={{alignItems: 'center', marginTop: 10}}><View style={{height: 150, width: 150, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}><Image style={{height:100, width: 100}} source={require('../assets/marginalia-unsubscribed.png')}></Image><Text style={{textAlign: 'center'}}>Help</Text></View>
            </View>
            </View>
            <View>
            {showonline}
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
        marginTop: '20%',
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
    },
    online: {
        marginTop: 30,
        backgroundColor: '#7bf037',
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 10
    },
    offline: {
        marginTop: 30,
        backgroundColor: 'orange',
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 10
    },
    text: {
        color: 'white'
    }
})

export default Dashboard