import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../Components/context'

export default function HomeScreen({ navigation }) {

    const { signOut }= React.useContext(AuthContext)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                onPress={()=>{signOut()}}
                title="Sign Out"
                color="#841584"
            />
        </View>
    );
}