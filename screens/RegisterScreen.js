import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'
import { Button, TextInput } from 'react-native-paper';


export default function RegisterScreen({ navigation }) {

  const { signUp } = React.useContext(AuthContext)

  const handleSubmit = (values) => {
    //console.log(values.mobile_no)
    signUp(values)
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.txtLogin}>Fill These Details</Text>
        <Formik
          initialValues={{ password: '', first_name: '', last_name: '', mobile_no: '', nic_no: '', nearest_eco_center: '', vehicle_color: '', vehicle_type: '', maximam_weight_can_carry: '', vehicle_plate_no: '' }}
          onSubmit={values => handleSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                style={styles.textInputTop}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                label="First Name"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                label="Last Name"
                mode="outlined"
              />
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
              {/* <TextInput
              style={styles.textInput}
              onChangeText={handleChange('password2')}
              onBlur={handleBlur('password2')}
              value={values.password2}
              label="ReEnter Password"
              secureTextEntry={true} 
              mode="outlined"
            /> */}
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('nic_no')}
                onBlur={handleBlur('nic_no')}
                value={values.nic_no}
                label="NIC NO"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('nearest_eco_center')}
                onBlur={handleBlur('nearest_eco_center')}
                value={values.nearest_eco_center}
                label="Nearest Eco Center"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_color')}
                onBlur={handleBlur('vehicle_color')}
                value={values.vehicle_color}
                label="Vehicle Color"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_type')}
                onBlur={handleBlur('vehicle_type')}
                value={values.vehicle_type}
                label="Vehicle Type"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('maximam_weight_can_carry')}
                onBlur={handleBlur('maximam_weight_can_carry')}
                value={values.maximam_weight_can_carry}
                label="Maximum Weight Can Carry"
                keyboardType="numeric"
                mode="outlined"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_plate_no')}
                onBlur={handleBlur('vehicle_plate_no')}
                value={values.vehicle_plate_no}
                label="Vehicle Plate No"
                mode="outlined"
              />
              {/* <Button style={styles.btn} onPress={handleSubmit} title="Submit" /> */}
              <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
                <Text style={{ color: "white" }}>Sign Up</Text>
              </Button>
            </View>
          )}
        </Formik>

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginTop: 6,
  },
  textInputTop: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    marginHorizontal: 80,
    paddingVertical: 6,
    marginBottom: 30,
    borderRadius: 30
  },
  txtLogin: {
    marginTop: 45,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4fc116',
    marginHorizontal: 15,
  },

});
