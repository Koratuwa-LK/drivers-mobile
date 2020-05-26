import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Icon } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Maplocation from 'expo-location';
import env from '../vars/env';
import { IconButton, Button } from 'react-native-paper';
import axios from '../axios-onlinelist';

const MapScreenview = (props) => {

  const markercoordinateswo = props.route.params.location
  let markercoordinates = {
    latitude: props.route.params.lat ? props.route.params.lat : 0,
    longitude: props.route.params.lng ? props.route.params.lng : 0
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
      const usercurrentlocation = await Maplocation.getCurrentPositionAsync({ timeout: 15000 })
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
    latitude: /* 37.78 */ props.route.params.lat,
    longitude: /* -122.43 */ props.route.params.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const confirmHandler = () => {
    axios.post('/confirmedbookings.json', { driver_name: 'tony', farmer_name: 'farmer_1', date: new Date, time: props.route.params('time'), status: 'Confirmed', userlocation: { lat: props.route.params.lat, lng: props.route.params.lng }, driverlocation: { lat: userlocation.latitude, lng: userlocation.longitude } })
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    deleteHandler()
  }

  const declineHandler = () => {
    axios.post('/declinedbookings.json', { driver_name: 'tony', farmer_name: 'farmer_1', date: new Date, time: props.route.params('time'), status: 'Confirmed' })
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    deleteHandler()
  }

  const deleteHandler = () => {
    axios.delete('/farmerbookings/' + props.route.params('keyid') + '/.json')
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
  }

  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  return (
    <View style={styles.map}>
      {/* <View style={styles.toggle}>
            <View style={styles.moon}>
            <IconButton
            icon="weather-night"
            size={19}
            ></IconButton>
            </View>
            <View style={styles.sun}>
            <IconButton 
            icon="white-balance-sunny"
            size={19}
            ></IconButton>
            </View>
            </View> */}
      <MapView
        showsUserLocation={true}
        style={styles.map}
        region={mapregion}
        customMapStyle={mapStyle}
      >
        {markercoordinates && (

          <MapView.Marker title={props.route.params.adrs} coordinate={markercoordinates} >
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
      <View style={styles.btns}>
        <View style={styles.btn}>
          <Button mode="contained" onPress={confirmHandler} color="#7bf037">confirm</Button>
        </View>
        <View style={styles.btn}>
          <Button mode="contained" onPress={declineHandler} color="#ed1b11">decline</Button>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  toggle: {
    flexDirection: 'row',

  },
  sun: {
    marginLeft: '80%'
  },
  btns: {
    flexDirection: 'row',

  },
  btn: {
    width: '50%'
  }
})

export default MapScreenview