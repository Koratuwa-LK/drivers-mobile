import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function HomeScreen({ navigation }) {

   

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                
                title="Sign Out"
                color="#841584"
            />
        </View>
    );
}