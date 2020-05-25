import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'
import { Button, TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {

    const { signIn } = React.useContext(AuthContext)

    const handleSubmit = (values) => {
        //console.log(values.mobile_no)
        signIn(values.mobile_no, values.password)
    }

    return (
        <View style={styles.container}>

            <View >
                <Text style={styles.txtLogin}>Login</Text>
                <Text style={styles.txtLoginHint}>Login with Mobile No and Password</Text>
                <Formik
                    initialValues={{ mobile_no: '', password: '' }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('mobile_no')}
                                onBlur={handleBlur('mobile_no')}
                                value={values.mobile_no}
                                label="Mobile No"
                                keyboardType="phone-pad"
                                mode="outlined"
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                label="Password"
                                secureTextEntry={true}
                                mode="outlined"
                            />

                            <Button style={styles.btnSignIn} mode="contained" onPress={handleSubmit}>
                                <Text style={{ color: "white" }}>Sign In</Text>
                            </Button>
                        </View>
                    )}
                </Formik>

            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    txtLogin: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4fc116'
    },
    txtLoginHint: {
        color: '#737373',
        marginBottom: 5

    },
    textInput: {
        marginTop: 6,
    },
    btnSignIn: {
        marginHorizontal: 40,
        paddingVertical: 4,
        marginTop: 20,
        marginVertical: 5,
        borderRadius: 30
    },
    btnRegister: {
        marginHorizontal: 65,
        paddingVertical: 6,
        marginVertical: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 15
    }
});

