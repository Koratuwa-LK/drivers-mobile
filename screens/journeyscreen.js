import React, { Component } from 'react';
import getDirections from 'react-native-google-maps-directions'
import { View, Button, StyleSheet } from 'react-native';
export default class Journeyscreen extends Component {
 
  handleGetDirections = () => {
    const data = {
       /* source: {
        latitude: 6.7572025,
        longitude: 79.907201
      }, */
      destination: {
        latitude: /* 6.0558904 */ this.props.navigation.getParam('lat'),
        longitude: /* 80.1769774 */ this.props.navigation.getParam('lng')
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],
      waypoints: [
        /* {
          latitude: -33.8600025,
          longitude: 18.697452
        },
        {
          latitude: -33.8600026,
          longitude: 18.697453
        },
           {
          latitude: -33.8600036,
          longitude: 18.697493
        } */
      ]
    }
 
    getDirections(data)
  }
 
  render() {
    return (
      <View style={styles.main}>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})