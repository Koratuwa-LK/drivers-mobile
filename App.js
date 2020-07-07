import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Deliverynav from './nav/Deliverynav';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/dashboard';
import Newbookings from './screens/newbookings';
import MapScreenview from './screens/MapScreenView';
import Confirmed from './screens/confirmedscreen';
import MapconfirmedScreenview from './screens/Mapconfirmedscreen';
import Journeyscreen from './screens/journeyscreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import * as firebase from 'firebase';
import AuthIntroScreen from './screens/AuthIntroScreen';
import { firebaseConfig } from './config';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import i18n from 'i18n-js';
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}







function App() {

  const [state, setstate] = useState({
    loggedIn: null
  })

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setstate({
          loggedIn: true
        })
      } else {
        setstate({
          loggedIn: false
        })
      }

    }

    )
  }, [])




  switch (state.loggedIn) {
    case false:
      return (
        <PaperProvider theme={theme}>
          <NavigationContainer>



            <AuthStack.Navigator screenOptions={{
              headerShown: false
            }}>
              <AuthStack.Screen name="Intro" component={AuthIntroScreen} />
              <AuthStack.Screen name="Login" component={LoginScreen} />
              <AuthStack.Screen name="Register" component={RegisterScreen} />
            </AuthStack.Navigator>



          </NavigationContainer>
        </PaperProvider>
      )
    case true:
      return (
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <HomeStack.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#4747d1',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
              <HomeStack.Screen name="Dashboard" component={Dashboard} />
              <HomeStack.Screen name="Newbookings" component={Newbookings} />
              <HomeStack.Screen name="Mapview" component={MapScreenview} />
              <HomeStack.Screen name="Confirmed" component={Confirmed} />
              <HomeStack.Screen name="Mapconfirmedview" component={MapconfirmedScreenview} />
              <HomeStack.Screen name="Mapjourneyview" component={Journeyscreen} />
            </HomeStack.Navigator>

          </NavigationContainer>
        </PaperProvider>
      )
    default:
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
  }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4fc116',
  },
};

export default App;
