import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'
import { Button, TextInput } from 'react-native-paper';
import * as yup from 'yup'; 

export default function LoginScreen({ navigation }) {

    const { signIn } = React.useContext(AuthContext)

    const handleSubmit = (values) => {
        signIn(values.mobile_no, values.password)
    }

    let loginSchema = yup.object({
        mobile_no:yup.string().required('Mobile No is Required').test('len','Must Need to have 10 digits',val=>(val!=undefined)?(val.length===10)?true:false:false),
        password:yup.string().required('Password is Required')
    })

    return (
        <View style={styles.container}>

            <View >
                <Text style={styles.txtLogin}>Login</Text>
                <Text style={styles.txtLoginHint}>Login with Mobile No and Password</Text>
                <Formik
                    initialValues={{ mobile_no: '', password: '' }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={loginSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values,errors,touched}) => (
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
                            <Text style={styles.errorMsg}>{touched.mobile_no && errors.mobile_no}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                label="Password"
                                secureTextEntry={true}
                                mode="outlined"
                            />
                            <Text style={styles.errorMsg}>{touched.password && errors.password}</Text>

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
    },
    errorMsg:{
        color:'red'
    }
});

