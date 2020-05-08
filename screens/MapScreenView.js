import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Icon } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Maplocation from 'expo-location';
import env from '../vars/env';

const MapScreenview = (props) => {

    const markercoordinateswo = props.navigation.getParam('location')
    let markercoordinates = {
        latitude: props.navigation.getParam('lat'),
        longitude: props.navigation.getParam('lng')
    }

    /* if(markercoordinateswo){
        markercoordinates={
            latitude: markercoordinateswo.lat,
            longitude: markercoordinateswo.lng
        }
    } */
    
    const [userlocation, setuserlocation] = useState()

    useEffect(() => {
        async function locationset() {
            const usercurrentlocation = await Maplocation.getCurrentPositionAsync({timeout: 15000})
            console.log('userlocation')
            console.log(usercurrentlocation)  
/*             setuserlocationlat(usercurrentlocation.coords.latitude)
            setuserlocationlng(usercurrentlocation.coords.longitude)
 */         const lat = usercurrentlocation.coords.latitude
            const lng = usercurrentlocation.coords.longitude
            setuserlocation({
                latitude: lat,
                longitude: lng
            })
        }
        locationset()
    }, [])

    /* const userlocation = async () => {
        try {
            const location = await Maplocation.getCurrentPositionAsync({timeout: 10000})
            console.log(location)
       } catch(err) {
           console.log(err)
       } 
    }
 */
    const google_key = env.googleapiKeyworking

    const mapregion = {
        latitude: /* 37.78 */ props.navigation.getParam('lat'),
        longitude: /* -122.43 */ props.navigation.getParam('lng'),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421 
    }

    return (
        <View style={styles.map}>
            
            <MapView
            showsUserLocation={true}
            style={styles.map}
            region={mapregion}
            >
            {markercoordinates && ( 
             
            <MapView.Marker title={props.navigation.getParam('adrs')} coordinate={markercoordinates} >
            </MapView.Marker>
             )}
             <MapViewDirections
             origin={/* {latitude: 6.9565151, longitude: 79.9116888} */ userlocation}
             destination={/* {latitude: 6.0558904, longitude: 80.1769774} */ markercoordinates}
             apikey={google_key}
             strokeWidth={5}
             strokeColor='#6b03fc'>

             </MapViewDirections>
            
                 
                       
            </MapView>
            </View>
        
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreenview