import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native';
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
import HomeScreen from './screens/HomeScreen';
import AuthIntroScreen from './screens/AuthIntroScreen';
import { AuthContext } from './Components/context';
import { AsyncStorage } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

//const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: async (mobile_no, password) => {

      let userToken;
      userToken = null;

      const sendCred = (mobile_no, password) => new Promise((resolve, reject) => {

        fetch('https://agrolanka-backend.herokuapp.com/driver/signin', {
          method: 'POST',
          body: JSON.stringify({
            mobile_no: mobile_no,
            password: password,
          }),
          headers: {
            "Content-type": "application/json"
          }
        }).then((response) => response.json())
          .then((json) => {
            resolve(json);
          }).catch((e) => {
            reject(e)
          })
      })

      async function storeToken() {
        const tokenData = await sendCred(mobile_no, password);
        console.log(tokenData)
        console.log(tokenData.token)
        if (tokenData.token != undefined) {
          userToken = tokenData.token;
          try {
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e)
          }
        }
        console.log('user token:', userToken)
        dispatch({ type: 'LOGIN', id: mobile_no, token: userToken })
      }

      storeToken();

    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: async (values) => {
      let userToken;
      userToken = null;

      const sendUserDetails = (values) => new Promise((resolve, reject) => {
        console.log(values)
        fetch('https://agrolanka-backend.herokuapp.com/driver/register', {
          method: 'POST',
          body: JSON.stringify({
            ...values
          }),
          headers: {
            "Content-type": "application/json"
          }
        }).then((response) => response.json())
          .then((json) => {
            resolve(json);
          }).catch((e) => {
            reject(e)
          })
      })

      async function storeToken() {
        const tokenData = await sendUserDetails(values);
        console.log(tokenData)
        console.log(tokenData.token)
        if (tokenData.token != undefined) {
          userToken = tokenData.token;
          try {
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e)
          }
        }
        console.log('user token:', userToken)
        dispatch({ type: 'LOGIN', id: values.mobile_no, token: userToken })
      }

      storeToken();
    }
  }))

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      // console.log('user token:',userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {loginState.userToken != null ? (
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
          ) :
            <AuthStack.Navigator screenOptions={{
              headerShown: false
            }}>
              <AuthStack.Screen name="Intro" component={AuthIntroScreen} />
              <AuthStack.Screen name="Login" component={LoginScreen} />
              <AuthStack.Screen name="Register" component={RegisterScreen} />
            </AuthStack.Navigator>
          }


        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
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
