import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export default function AuthIntroScreen({ navigation }) {

    return (
        <ScrollView style={{backgroundColor: '#88b18b'}}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} resizeMode='cover' source={require('../assets/img/farmer2.png')} />
            </View>
            <View style={styles.container}>

                <Text style={styles.txt}>KrushiGanudenu.lk</Text>
                <Text style={styles.txtDescription}>Please Sign Up or Log In to continue to the driver's dashboard</Text>
                <View style={styles.btnContainer}>
                    <Button style={styles.btnSignUp} mode="contained" color="#6b8e23"  onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: "white" }}>Sign Up</Text>
                </Button>
                    <Button style={styles.btnLogin} mode="contained" color="#6b8e23" onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: "white" }}>Login</Text>
                    </Button>
                </View>
            </View>

        </ScrollView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#88b18b',
        height: 300
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnSignUp: {
        borderRadius: 30,
        // borderColor: '#4fc116',
        marginHorizontal: 15,
        paddingHorizontal: 25,
        // color: 'white'
    },
    btnLogin: {
        borderRadius: 30,
        marginHorizontal: 15,
        paddingHorizontal: 25,
    },
    txt: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        // color: '#4fc116',
        color: 'white'
    },
    txtDescription: {
        marginBottom: 20,
        color: '#737373',
        textAlign: 'center',
        padding: 10
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    img: {
        width: 380,
        height: 300
    }
});


